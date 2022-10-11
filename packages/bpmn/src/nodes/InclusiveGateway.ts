import { h } from '@logicflow/core'
import { GatewayModel, GatewayView } from './Gateway'

class InclusiveGatewayModel extends GatewayModel {
  static extendKey = 'InclusiveGatewayModel'
}

class InclusiveGatewayView extends GatewayView {
  static extendKey = 'InclusiveGatewayNode'
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
          'm 127.99695,68.479759 c -32.844759,0 -59.533482,26.688893 -59.533482,59.531261 0,32.84238 26.688723,59.53016 59.533482,59.53016 32.84477,0 59.53349,-26.68778 59.53349,-59.53016 0,-32.842506 -26.68872,-59.531261 -59.53349,-59.531261 z m 0,6.602309 c 29.26944,0 52.93262,23.661439 52.93262,52.928952 0,29.26738 -23.66318,52.93062 -52.93262,52.93062 -29.269289,0 -52.932466,-23.66324 -52.932466,-52.93062 0,-29.267513 23.663177,-52.929089 52.932466,-52.929089 z',
      }),
    )
  }
}

const InclusiveGateway = {
  type: 'bpmn:InclusiveGateway',
  view: InclusiveGatewayView,
  model: InclusiveGatewayModel,
}

export { InclusiveGatewayView, InclusiveGatewayModel }
export default InclusiveGateway
