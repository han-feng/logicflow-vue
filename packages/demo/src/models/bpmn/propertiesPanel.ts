import type { PropertiesPanelConfig } from 'logicflow-useapi'
import defaultPanel from './panel/default.vue'
import topPanel from './panel/top.vue'
import userTaskPanel from './panel/userTask.vue'
import gateway from './panel/gateway.vue'
import sequenceFlow from './panel/sequenceFlow.vue'
import startEvent from './panel/startEvent.vue'
import endEvent from './panel/endEvent.vue'
import serviceTask from './panel/serviceTask.vue'
export default <PropertiesPanelConfig>{
  'default': defaultPanel,
  'top': topPanel,
  'bpmn:userTask': userTaskPanel,
  'bpmn:parallelGateway': gateway,
  'bpmn:sequenceFlow': sequenceFlow,
  'bpmn:serviceTask': serviceTask,
  'bpmn:startEvent': startEvent,
  'bpmn:endEvent': endEvent,
}
