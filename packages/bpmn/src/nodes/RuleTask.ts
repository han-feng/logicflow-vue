import { h } from '@logicflow/core'
import { BaseTaskModel, BaseTaskView } from './BaseTask'

class RuleTaskModel extends BaseTaskModel {
  static extendKey = 'RuleTaskModel'
}

class RuleTaskView extends BaseTaskView {
  static extendKey = 'RuleTaskNode'
  getLabelShape(): h.JSX.Element | undefined {
    const { model } = this.props
    const { x, y, width, height } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - width / 2 + 4,
        y: y - height / 2 + 4,
        width: 24,
        height: 24,
        viewBox: '0 0 1024 1024',
      },
      h('path', {
        fill: style.stroke,
        d:
          'M91.19 196.096v631.808h841.62V196.096H91.19zm35.84 214.016h162.25v176.351H127.03V410.112zm198.09 0h571.85v176.351H325.12V410.112zM127.03 622.303h162.25v169.761H127.03v-169.76zm198.09 0h571.85v169.761H325.12v-169.76z',
      }),
    )
  }
}

const RuleTask = {
  type: 'bpmn:businessRuleTask',
  view: RuleTaskView,
  model: RuleTaskModel,
}

export { RuleTaskView, RuleTaskModel }
export default RuleTask
