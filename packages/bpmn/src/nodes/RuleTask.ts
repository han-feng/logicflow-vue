import type { GraphModel, NodeConfig } from '@logicflow/core'
import { RectNode, RectNodeModel, h } from '@logicflow/core'
import { getBpmnId } from '@logicflow/extension/es/bpmn/getBpmnId'

class RuleTaskModel extends RectNodeModel {
  static extendKey = 'RuleTaskModel'
  constructor(data: NodeConfig, graphModel: GraphModel) {
    if (!data.id)
      data.id = `Activity_${getBpmnId()}`

    super(data, graphModel)
  }
}

class RuleTaskView extends RectNode {
  static extendKey = 'RuleTaskNode'
  getLabelShape(): any {
    const { model } = this.props
    const { x, y, width, height } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - width / 2 + 2,
        y: y - height / 2 + 2,
        width: 28,
        height: 28,
        viewBox: '0 0 1024 1024',
      },
      h('path', {
        fill: style.stroke,
        d:
          'M91.19 196.096v631.808h841.62V196.096H91.19zm35.84 214.016h162.25v176.351H127.03V410.112zm198.09 0h571.85v176.351H325.12V410.112zM127.03 622.303h162.25v169.761H127.03v-169.76zm198.09 0h571.85v169.761H325.12v-169.76z',
      }),
    )
  }

  getShape(): any {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
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

const RuleTask = {
  type: 'bpmn:businessRuleTask',
  view: RuleTaskView,
  model: RuleTaskModel,
}

export { RuleTaskView, RuleTaskModel }
export default RuleTask
