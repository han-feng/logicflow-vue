import StartEvent from '@logicflow/extension/es/bpmn/events/StartEvent'
import SequenceFlow from '@logicflow/extension/es/bpmn/flow/SequenceFlow'
import Gateway from '@logicflow/extension/es/bpmn/gateways/ExclusiveGateway'
import type { GraphData, ModelType } from 'logicflow-useapi'
import { adapterXmlIn, adapterXmlOut } from './adapter'
import { endIcon, gatewayIcon, serviceTaskIcon, startIcon, userTaskIcon } from './icons'
import newData from './newdata.json'
import EndEvent from './nodes/EndEvent'
import ServiceTask from './nodes/ServiceTask'
import UserTask from './nodes/UserTask'
import { theme } from './theme'

const key = 'bpmn'

export default <ModelType>{
  name: key,
  label: 'BPMN 模型',
  defaultEdgeType: SequenceFlow.type,
  theme,
  adapters: {
    default: {
      label: 'BPMN',
      extension: 'xml',
      in(src: string): GraphData {
        return {
          ...adapterXmlIn(src),
        }
      },
      out(data) {
        return adapterXmlOut(data)
      },
    },
  },
  nodeTypes: [
    {
      ...StartEvent,
      label: '开始',
      icon: startIcon,
    },
    {
      ...EndEvent,
      label: '结束',
      icon: endIcon,
    },
    {
      ...UserTask,
      label: '用户任务',
      icon: userTaskIcon,
    },
    {
      ...ServiceTask,
      label: '系统任务',
      icon: serviceTaskIcon,
    },
    {
      ...Gateway,
      type: 'bpmn:parallelGateway',
      label: '路由',
      icon: gatewayIcon,
    },
  ],
  edgeTypes: [
    SequenceFlow,
  ],
  newData,
}
