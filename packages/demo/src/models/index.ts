import { ModelType } from 'logicflow-useapi';
import bpmnModel from './bpmn/model';
import nodeRedModel from './node-red/model';

export default <ModelType[]>[
  bpmnModel,
  // TODO 增加 状态机 模型
  nodeRedModel
]
