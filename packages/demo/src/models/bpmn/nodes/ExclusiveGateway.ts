import { h } from '@logicflow/core'
import { GatewayModel, GatewayView } from './Gateway'

class ExclusiveGatewayModel extends GatewayModel {
  static extendKey = 'ExclusiveGatewayModel'
}

class ExclusiveGatewayView extends GatewayView {
  static extendKey = 'ExclusiveGatewayNode'
  getIcon(): any {
    const { model } = this.props
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        width: 50,
        height: 50,
        viewBox: '0 0 256 256',
      },
      h('path', {
        fill: style.stroke,
        d:
          'M86.695 78.972l-1.332.254-1.128.764-4.255 4.255s-.776 1.139-.777 1.152l-.24 1.313.259 1.299.74 1.152 38.863 38.86-38.845 38.844v-.012l-.777 1.151-.24 1.313.259 1.3s.739 1.138.74 1.151l4.255 4.254 1.165.764 1.295.255 1.314-.241 1.147-.778 38.845-38.844 38.855 38.853 1.165.763 1.295.255 1.314-.242 1.146-.776 4.255-4.255c.001 0 .758-1.125.76-1.125 0 0 .258-1.326.258-1.34l-.26-1.298-.758-1.166L137.163 128l38.85-38.848c.002 0 .758-1.125.76-1.125l.258-1.326-.259-1.299-.777-1.152-4.255-4.256-1.128-.763-1.295-.255-1.332.255-1.129.763-38.85 38.85-38.869-38.868v-.012l-1.147-.737-1.294-.254z',
      }),
    )
  }
}

const ExclusiveGateway = {
  type: 'bpmn:ExclusiveGateway',
  view: ExclusiveGatewayView,
  model: ExclusiveGatewayModel,
}

export { ExclusiveGatewayView, ExclusiveGatewayModel }
export default ExclusiveGateway
