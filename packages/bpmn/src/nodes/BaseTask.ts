import type { GraphModel, NodeConfig } from '@logicflow/core'
import { RectNode, RectNodeModel, h } from '@logicflow/core'
import { getBpmnId } from '@logicflow/extension/es/bpmn/getBpmnId'

class BaseTaskModel extends RectNodeModel {
  constructor(data: NodeConfig, graphModel: GraphModel) {
    if (!data.id)
      data.id = `Activity_${getBpmnId()}`

    super(data, graphModel)
  }
}

class BaseTaskView extends RectNode {
  getLabelShape(): h.JSX.Element | undefined {
    return undefined
  }

  getShape(): h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
    // TODO: 将basic-shape对外暴露，在这里可以直接用。现在纯手写有点麻烦。
    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
        ...style,
      }),
      this.getLabelShape(),
    ])
  }
}

export { BaseTaskView, BaseTaskModel }
