import type { GraphModel, NodeConfig } from '@logicflow/core'
import { PolygonNode, PolygonNodeModel, h } from '@logicflow/core'
import { getBpmnId } from '@logicflow/extension/es/bpmn/getBpmnId'

class GatewayModel extends PolygonNodeModel {
  static extendKey = 'GatewayModel'
  constructor(data: NodeConfig, graphModel: GraphModel) {
    if (!data.id)
      data.id = `Gateway_${getBpmnId()}`

    if (!data.text)
      data.text = ''

    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 40,
      }
    }
    super(data, graphModel)
    this.points = [
      [25, 0],
      [50, 25],
      [25, 50],
      [0, 25],
    ]
  }

  getNodeStyle() {
    const style = super.getNodeStyle()
    const properties = this.properties

    let color
    if (properties.state === 4)
      color = 'green'

    else if (properties.state === 3)
      color = 'orange'

    else if (properties.state === 2)
      color = 'red'

    else if (properties.state === 1)
      color = 'green'

    if (color) {
      style.stroke = color
      style.fill = color
      style.fillOpacity = 0.2

      if (this.isHovered || this.isSelected) {
        // TODO 显示信息面板
      }
      else {
        if (this.incoming.edges[0].style.stroke !== color)
          this.incoming.edges[0].style.stroke = color
      }
    }
    return style
  }
}

class GatewayView extends PolygonNode {
  static extendKey = 'GatewayNode'
  getIcon(): h.JSX.Element | undefined {
    return undefined
  }

  getShape(): h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height, points } = model
    const style = model.getNodeStyle()
    return h('g',
      {
        transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`,
      },
      [
        h('polygon', {
          ...style,
          x,
          y,
          points,
        }),
        this.getIcon(),
      ])
  }
}

const Gateway = {
  type: 'bpmn:Gateway',
  view: GatewayView,
  model: GatewayModel,
}

export { GatewayView, GatewayModel }
export default Gateway
