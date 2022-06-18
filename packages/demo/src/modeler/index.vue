<template>
  <a-layout style="height: 100%; width: 100%; margin: 0; overflow: hidden">
    <a-layout-header style="background: #fff; height: 42px;line-height: 32px; padding: 5px 10px">
      <toolbar />
    </a-layout-header>
    <a-layout-content>
      <splitpanes class="default-theme" @resized="onResize" :dbl-click-splitter="false" :push-other-panes="false">
        <pane :size="propertiesPanel.collapsed ? 100 - paneSize / 100 : 100 - paneSize">
          <div ref="container"
            style="height: 100%; width: 100%;padding: 4px;box-shadow: 0 0 4px rgb(0 0 0 / 30%) inset; background: #fff">
          </div>
        </pane>
        <pane :size="propertiesPanel.collapsed ? paneSize / 100 : paneSize" v-show="!propertiesPanel.collapsed"
          style="padding: 10px;background-color: #f8f8f8;overflow: hidden auto">
          <keep-alive>
            <component :is="propertiesPanel.component" />
          </keep-alive>
        </pane>
      </splitpanes>
    </a-layout-content>
  </a-layout>
  <a-drawer v-model:visible="codeDrawerVisible" title="代码" placement="right" size="large" :bodyStyle="{ padding: 0 }"
    @after-visible-change="setCode">
    <template #extra>
      <a-form-item v-if="existAdapterOut" label="原始代码" style="margin: 0">
        <a-switch v-model:checked="rawCode" @change="setCode" />
      </a-form-item>
    </template>
    <highlight autodetect :code="code" />
  </a-drawer>
</template>

<style>
.lf-mini-map {
  padding-top: 0;
  right: 5px;
  bottom: 5px;
  height: 120px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
  background-color: rgba(255, 255, 255, 0.8);
}

.lf-mini-map-header,
.lf-mini-map-close {
  visibility: hidden;
}

.lf-mini-map .lf-graph {
  background: none;
}

pre,
pre code.hljs {
  overflow: visible;
  margin: 0;
  background-color: transparent;
}
</style>

<script setup lang="ts">
import highlightjs from "@highlightjs/vue-plugin"
import { Definition } from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { DndPanel, InsertNodeInPolyline, Menu, MiniMap, SelectionSelect, Snapshot } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/stackoverflow-light.css'
import { PropertiesPanelConfig, useModeler } from 'logicflow-useapi'
import { addListener } from 'resize-detector'
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { nextTick, onMounted, provide, ref } from 'vue'
import models from '../models'
import propertiesPanelConfigs from '../models/propertiesPanel'
import Toolbar from './toolbar.vue'

const container = ref<HTMLElement>()
const paneSize = ref(30)
// Model Config
const urlParams = new URLSearchParams(location.search)
const _mt = urlParams.has('modelType') ? urlParams.get('modelType') : 'bpmn'
const modelType = ref(_mt)
const model = models.find(m => m.name === modelType.value) || models[0]
const propertiesPanelConfig: PropertiesPanelConfig = propertiesPanelConfigs[model.name]

// Modeler
const modeler = useModeler(model, propertiesPanelConfig)
const { propertiesPanel } = modeler

// codeViewer
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
const highlight = highlightjs.component
const codeDrawerVisible = ref(false)
const code = ref('')
const rawCode = ref(false)
const existAdapterOut = ref(false)
const setCode = () => {
  let c
  if (rawCode.value) {
    c = modeler.lf?.getGraphRawData()
  } else {
    c = modeler.lf?.getGraphData()
  }
  if (typeof c == 'object') c = JSON.stringify(c, null, 2)
  code.value = c
}

function containerResize() {
  if (container.value && modeler.lf) {
    const { width, height } = container.value.getBoundingClientRect()
    modeler.lf.resize(width - 8, height - 8)
  }
}

async function onResize(e: any) {
  if (!container.value || !modeler.lf) return
  console.log('onResize', e, modeler.lf.graphModel.width)
  if (e[1] && e[1].size) {
    const size = e[1].size
    propertiesPanel.collapsed = (size < 5)
    paneSize.value = size
  }
}

// provide context
provide('modeler_context', Object.assign(modeler, {
  modelType,
  codeDrawerVisible
}))

// init
onMounted(() => {
  if (!container.value) {
    console.log('error container is null')
    return
  }
  const _logicflow_options: Definition = {
    container: container.value,
    adjustEdgeStartAndEnd: true,
    // nodeTextDraggable: true,
    edgeTextDraggable: true,
    keyboard: {
      enabled: true,
    },
    plugins: [
      DndPanel, InsertNodeInPolyline, Menu, MiniMap, SelectionSelect, Snapshot
    ]
  }
  modeler.initLogicFlow(_logicflow_options)

  existAdapterOut.value = !!modeler.lf?.adapterOut

  // 探测 container 大小改变
  let _listenerRunning = false
  addListener(container.value, () => {
    if (_listenerRunning) return
    _listenerRunning = true
    // 减少短时间重复调用
    setTimeout(async () => {
      _listenerRunning = false
      await nextTick()
      containerResize()
    }, 500)
  })
})
</script>
