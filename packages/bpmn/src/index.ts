import StartEvent from '@logicflow/extension/es/bpmn/events/StartEvent'
import SequenceFlow from '@logicflow/extension/es/bpmn/flow/SequenceFlow'
import type { GraphData, ModelType } from 'logicflow-useapi'
import { adapterXmlIn, adapterXmlOut } from './adapter'
import { endIcon, exclusiveGatewayIcon, inclusiveGatewayIcon, parallelGatewayIcon, ruleTaskIcon, serviceTaskIcon, startIcon, userTaskIcon } from './icons'
import newData from './newdata.json'
import EndEvent from './nodes/EndEvent'
import ExclusiveGateway from './nodes/ExclusiveGateway'
import InclusiveGateway from './nodes/InclusiveGateway'
import ParallelGateway from './nodes/ParallelGateway'
import ServiceTask from './nodes/ServiceTask'
import UserTask from './nodes/UserTask'
import RuleTask from './nodes/RuleTask'
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
      ...RuleTask,
      label: '规则执行',
      icon: ruleTaskIcon,
    },
    {
      ...ServiceTask,
      label: '服务调用',
      icon: serviceTaskIcon,
    },
    {
      ...ParallelGateway,
      type: 'bpmn:parallelGateway',
      label: '并行网关',
      icon: parallelGatewayIcon,
    },
    {
      ...ExclusiveGateway,
      type: 'bpmn:exclusiveGateway',
      label: '排它网关',
      icon: exclusiveGatewayIcon,
    },
    {
      ...InclusiveGateway,
      type: 'bpmn:inclusiveGateway',
      label: '包含网关',
      icon: inclusiveGatewayIcon,
    },
  ],
  edgeTypes: [
    SequenceFlow,
  ],
  newData,
}
