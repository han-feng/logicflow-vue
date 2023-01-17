import { h } from '@logicflow/core'
import { GatewayModel, GatewayView } from './Gateway'

class ParallelGatewayModel extends GatewayModel {
  static extendKey = 'ParallelGatewayModel'
}

class ParallelGatewayView extends GatewayView {
  static extendKey = 'ParallelGatewayNode'
  getIcon(): h.JSX.Element | undefined {
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
          'M124.972 63.111l-1.338.254-1.095.737-.762 1.125-.258 1.34v54.941H66.55l-.009-.01-1.332.294-1.096.737.001-.015-.761 1.126-.259 1.34v6.017s.256 1.355.265 1.364l.759 1.098 1.102.737a708.6 708.6 0 001.337.295h54.962v54.931l-.01-.008.266 1.364.758 1.098 1.102.737s1.328.281 1.338.295l6.017-.001 1.364-.282 1.096-.736.758-1.099.262-1.36v-54.934h54.948c.002.001 1.363-.28 1.364-.28l1.095-.738.759-1.098.261-1.36v-6.016c0-.001-.26-1.327-.26-1.34 0 0-.754-1.125-.763-1.125l-1.102-.736s-1.36-.295-1.36-.282H134.47v-54.94s-.26-1.325-.26-1.339l-.755-1.125-1.101-.737-1.364-.268z',
      }),
    )
  }
}

const ParallelGateway = {
  type: 'bpmn:parallelGateway',
  view: ParallelGatewayView,
  model: ParallelGatewayModel,
}

export { ParallelGatewayView, ParallelGatewayModel }
export default ParallelGateway
