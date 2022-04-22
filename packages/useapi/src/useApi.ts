import type { PointTuple } from '@logicflow/core';
import LogicFlow from '@logicflow/core';
import { DefineComponent, inject, nextTick, onActivated, onDeactivated, provide, reactive, ref, shallowReactive, shallowRef, watch } from 'vue';
import { selectIcon } from './icons';
import type { ModelType, PropertiesPanelConfig, PropertiesPanelContext } from './types';

/**
 * 使用看图工具
 * 注意：对该函数返回值中的 lf 属性，请不要解构后使用
 */
export function useViewer(model: ModelType): Record<string, any> {

  const viewer = { lf: null as LogicFlow | null }

  // miniMap
  const showMiniMap = ref(false)
  const toggleMiniMap = () => {
    const miniMap = viewer.lf?.extension.miniMap
    showMiniMap.value = !showMiniMap.value
    showMiniMap.value ? miniMap.show() : miniMap.hide()
  }
  // zoom
  const getCenter = (): PointTuple => {
    const gm = viewer.lf?.graphModel
    const x = gm ? gm.width / 2 : 0
    const y = gm ? gm.height / 2 : 0
    return [x, y]
  }
  const zoomOut = () => {
    viewer.lf?.zoom(false, getCenter());
  }
  const zoomIn = () => {
    viewer.lf?.zoom(true, getCenter());
  }
  const resetZoom = () => {
    viewer.lf?.resetZoom();
    viewer.lf?.resetTranslate();
  }
  const fitView = () => {
    viewer.lf?.fitView(100);
  }
  // logicflow
  const initLogicFlow = (logicflowOptions: any) => {
    // TODO 默认插件
    // const plugins = [
    //   DndPanel, InsertNodeInPolyline, Menu, MiniMap, SelectionSelect, Snapshot
    // ]
    if (model.plugins) {
      if (!logicflowOptions.plugins) logicflowOptions.plugins = []
      logicflowOptions.plugins.push(...model.plugins)
    }

    viewer.lf = new LogicFlow(logicflowOptions)

    if (model.theme) viewer.lf?.setTheme(model.theme)

    model.nodeTypes.forEach(node => {
      viewer.lf?.register(node)
    })
    model.edgeTypes?.forEach(edge => {
      viewer.lf?.register(edge)
    })
    viewer.lf?.setDefaultEdgeType(model.defaultEdgeType)
    viewer.lf?.setZoomMaxSize(5)

    if (model.init) model.init(viewer.lf)

    viewer.lf?.renderRawData(model.newData)
  }

  return Object.assign(viewer, {
    showMiniMap, toggleMiniMap,
    zoomOut, zoomIn, resetZoom, fitView, initLogicFlow
  })
}

/**
 * 使用建模工具
 * 注意：对该函数返回值中的 lf 属性，请不要解构后使用
 */
export function useModeler(model: ModelType, propertiesPanelConfig: PropertiesPanelConfig)
  : Record<string, any> {
  const modeler = useViewer(model)
  modeler.propertiesPanel = shallowRef<DefineComponent<{}, {}, any> | null>(null)

  const _ctx = shallowReactive<PropertiesPanelContext>({
    lf: null,
    selectedModel: null
  })
  provide('properties_panel_context', _ctx) // 提供属性面板上下文

  // modified
  const modified = ref(false)
  const setModified = (val: boolean) => {
    modified.value = val
  }
  // undo, redo
  const undoDisable = ref(true)
  const redoDisable = ref(true)
  const setUndoState = ({ undoAble, redoAble }: { undoAble: boolean, redoAble: boolean }) => {
    undoDisable.value = !undoAble
    redoDisable.value = !redoAble
  }
  const undo = () => {
    modeler.lf.undo()
  }
  const redo = () => {
    modeler.lf.redo()
  }
  // propertiesPanel
  const propertiesPanel = shallowReactive({
    component: null,
    collapsed: !propertiesPanelConfig,
    disabled: !propertiesPanelConfig,
    toggleCollapsed: () => {
      propertiesPanel.collapsed = !propertiesPanel.collapsed
    }
  })

  const _initModeler = () => {
    _ctx.lf = modeler.lf
    modeler.lf.setPatternItems([
      {
        label: '框选',
        icon: selectIcon,
        callback: () => {
          modeler.lf.extension.selectionSelect.openSelectionSelect();
          modeler.lf.once('selection:selected', () => {
            modeler.lf.extension.selectionSelect.closeSelectionSelect();
          });
        }
      },
      ...model.nodeTypes
    ])

    modeler.lf.on('history:change', ({ data }: any) => {
      setUndoState(data)
      setModified(true)
    })
    if (propertiesPanelConfig) {
      modeler.lf.on('node:click,edge:click,blank:click',
        async ({ data }: any) => {
          // console.log('click', data)
          if (data) {
            if (_ctx.selectedModel?.id == data.id) return
            modeler.propertiesPanel.component = propertiesPanelConfig[data.type] || propertiesPanelConfig.default
            await nextTick()  // 为了确保先激活 Panel 再改变数据，此处 nextTick() 的位置不要随便调整
            _ctx.selectedModel = modeler.lf.getModelById(data.id)
          } else {
            modeler.propertiesPanel.component = propertiesPanelConfig.top || propertiesPanelConfig.default
            await nextTick()  // 为了确保先激活 Panel 再改变数据，此处 nextTick() 的位置不要随便调整
            _ctx.selectedModel = null
          }
        })
      modeler.propertiesPanel.component = propertiesPanelConfig.top || propertiesPanelConfig.default
    }
  }

  const _oldInit = modeler.initLogicFlow
  modeler.initLogicFlow = (logicflowOptions: any) => {
    _oldInit(logicflowOptions)
    _initModeler()
  }

  return Object.assign(modeler, {
    modified, undoDisable, redoDisable, undo, redo, propertiesPanel
  })
}

/*
 * 使用属性面板上下文，用于扩展实现属性面板组件
 * 注意：该函数返回响应式对象，请不要解构后使用
 */
export function usePropertiesPanelContext(): Record<string, any> {
  const ctx = inject<PropertiesPanelContext>('properties_panel_context') // 注入属性面板上下文
  const activated = ref(false)
  const element = reactive({
    id: '',
    type: '',
    text: '',
    properties: {},
  })

  const _stopHandles: any[] = []
  let _subscribedTextEvent = false
  const _textUpdateCallback = (data: { id: string; }) => {
    if (!activated.value) return
    if (data?.id == element.id) {
      console.log('update text', data, ctx?.selectedModel?.text?.value)
      element.text = ctx?.selectedModel?.text?.value || ''
    }
  }
  function loadData() {
    if (_subscribedTextEvent) ctx?.lf?.off('text:update', _textUpdateCallback)

    _stopHandles.forEach(h => h())
    _stopHandles.length = 0

    if (ctx?.selectedModel) {
      element.id = ctx.selectedModel.id
      element.type = ctx.selectedModel.type
      element.text = ctx.selectedModel.text?.value
      element.properties = ctx.selectedModel.properties
      ctx?.lf?.on('text:update', _textUpdateCallback), _subscribedTextEvent = true
    } else {
      element.id = ''
      element.type = ''
      element.text = ''
      element.properties = {}
    }
    _stopHandles.push(
      // Vue3 当前版本 watch 方法 oldVal 传值不正确
      watch(
        () => element.id,
        (newVal, oldVal) => {
          console.log('id changed:', oldVal, '->', newVal)
        }),
      watch(
        () => element.text,
        (newVal, oldVal) => {
          // console.log('text changed:', oldVal, '->', newVal)
          ctx?.selectedModel?.updateText(newVal);
        })
    )
  }

  watch(() => ctx?.selectedModel, (newVal, oldVal) => {
    if (!activated.value) return
    console.log('selectedModel:', oldVal?.id, '->', newVal?.id)
    loadData()
  })

  onActivated(() => {
    activated.value = true
  })

  onDeactivated(() => {
    activated.value = false
  })

  return element
}
