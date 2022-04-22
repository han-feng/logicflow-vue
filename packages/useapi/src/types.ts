import { BaseEdgeModel, BaseNodeModel, LogicFlow } from '@logicflow/core';
import { DefineComponent } from 'vue';

export type NodeType = {
  type: string
  view: any
  model: any
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
}

export type ModelType = {
  name: string
  label: string
  defaultEdgeType: string
  nodeTypes: NodeType[]
  edgeTypes?: EdgeType[]
  theme?: any
  newData?: {}
  plugins?: any[]
  init?: (lf: LogicFlow) => void  // 初始化
}

export type PropertiesPanelConfig = {
  /**
   * 顶层元素属性面板
   */
  top?: DefineComponent<{}, {}, any>
  /**
   * 默认元素属性面板：没有对应元素类型的面板时，使用该面板
   */
  default?: DefineComponent<{}, {}, any>
  /**
   * 属性面板：key为元素类型，value为元素属性面板组件
   */
  [key: string]: DefineComponent<{}, {}, any> | undefined
}

export type PropertiesPanelContext = {
  lf: LogicFlow | null
  selectedModel: BaseNodeModel | BaseEdgeModel | null
}
