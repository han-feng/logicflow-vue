import type { BaseEdgeModel, BaseNodeModel, GraphConfigData, LogicFlow } from '@logicflow/core'
import type { DefineComponent, Ref, ShallowReactive } from 'vue'

export type category = {
  id: string
  items: string[]
  subCategories: category[]
  label?: string
  icon?: string
  className?: string
  properties?: Record<string, any>
}

export type NodeType = {
  type: string
  view: any
  model: any
  category?: string
  text?: string
  icon?: string
  label?: string
  className?: string
  properties?: Record<string, any>
  callback?: (lf: LogicFlow, container: HTMLElement) => void
}

export type EdgeType = {
  type: string
  view: any
  model: any
  category?: string
  icon?: string
  label?: string
  className?: string
}

export type Adapter = {
  label: string
  extension: string // 文件扩展名
  in(src: string): GraphData
  out(data?: GraphData): string
}

export type ModelType = {
  name: string
  label: string
  defaultEdgeType: string
  topCategory: category
  elementTypes: (NodeType | EdgeType) []
  theme?: any
  newData?: GraphData
  adapters?: Record<string, Adapter>
  plugins?: any[]
  init?: (lf: LogicFlow) => void // 初始化
}

export type PropertiesPanelConfig = {
  /**
   * 顶层元素属性面板
   */
  top: DefineComponent<{}, {}, any>
  /**
   * 默认元素属性面板：没有对应元素类型的面板时，使用该面板
   */
  default?: DefineComponent<{}, {}, any>
  /**
   * 属性面板：key为元素类型，value为元素属性面板组件
   */
  [key: string]: DefineComponent<{}, {}, any> | null | undefined
}

export type PropertiesPanelView = {
  component?: DefineComponent<{}, {}, any>
  collapsed: boolean
  disabled: boolean
  toggleCollapsed(): void
}

export type PropertiesPanelContext = {
  modeler: ViewerContext | ModelerContext
  lf?: LogicFlow
  selectedModel?: BaseNodeModel | BaseEdgeModel
}

export type PropertiesPanelData = {
  id: string
  type: string
  text: string
  properties: Record<string, any>
}

export type GraphModelData = {
  id: string
  // type: string
  text: string
  properties: Record<string, any>
}

export type GraphData = GraphConfigData & GraphModelData

export type ViewerContext = {
  lf?: LogicFlow
  // initLogicFlow(logicflowOptions: Definition): void

  modelType: ModelType

  // graphData: GraphModelData

  setDataObject(graphData: GraphData): void
  setData(graphData: string, adapterKey?: string): void
  getDataObject(): GraphData | undefined
  getData(adapterKey?: string): string
  exportData(filename: string, adapterKey?: string): void
  exportPng(filename: string, backgroundColor?: string): void

  showMiniMap: Ref<boolean>
  toggleMiniMap(): void

  scale: {
    value: number
    percentage: string
  }
  zoomOut(): void
  zoomIn(): void
  resetZoom(): void
  fitView(offset: number): void

  [key: string]: any
}

export type ModelerContext = ViewerContext & {
  propertiesPanel: ShallowReactive<PropertiesPanelView>
  modified: Ref<boolean>
  undoDisable: Ref<boolean>
  redoDisable: Ref<boolean>
  undo(): void
  redo(): void
}
