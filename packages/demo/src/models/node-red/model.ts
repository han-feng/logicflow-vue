import { ModelType } from 'logicflow-useapi';
import FlowLink from "./edges/FlowLink";
import DelayNode from "./nodes/DelayNode";
import FetchNode from "./nodes/FetchNode";
import FunctionNode from "./nodes/FunctionNode";
import StartNode from "./nodes/StartNode";
import SwapNode from "./nodes/SwapNode";
import SwitchNode from "./nodes/SwitchNode";
import "./style.css";

export default <ModelType>{
  name: 'nodeRed',
  label: 'NodeRed 模型',
  defaultEdgeType: FlowLink.type,
  nodeTypes: [
    StartNode,
    FunctionNode,
    SwitchNode,
    SwapNode,
    FetchNode,
    DelayNode,
    // VueHtmlNode
  ],
  edgeTypes: [
    FlowLink
  ],
  newData: {
    nodes: [
      {
        id: 'node_1',
        type: 'start-node',
        x: 220,
        y: 200,
        text: 'start'
      },
      {
        id: 'node_2',
        type: 'fetch-node',
        x: 420,
        y: 200,
        text: 'fetch data'
      },
      {
        id: 'node_3',
        type: 'function-node',
        x: 620,
        y: 200,
        text: 'function'
      },
      {
        id: 'node_4',
        type: 'delay-node',
        x: 420,
        y: 300,
        text: 'delay'
      },
      {
        id: 'node_5',
        type: 'switch-node',
        x: 820,
        y: 200,
        text: 'switch'
      },
      {
        id: 'node_6',
        type: 'function-node',
        x: 1020,
        y: 200,
        text: 'function'
      },
      {
        id: 'node_7',
        type: 'function-node',
        x: 1020,
        y: 300,
        text: 'function'
      }
    ],
    edges: [
      {
        type: 'flow-link',
        sourceNodeId: 'node_1',
        targetNodeId: 'node_2'
      },
      {
        type: 'flow-link',
        sourceNodeId: 'node_2',
        targetNodeId: 'node_3'
      },
      {
        type: 'flow-link',
        sourceNodeId: 'node_3',
        startPoint: {
          x: 680,
          y: 200
        },
        targetNodeId: 'node_4'
      },
      {
        type: 'flow-link',
        sourceNodeId: 'node_4',
        startPoint: {
          x: 370,
          y: 300
        },
        targetNodeId: 'node_2'
      },
      {
        type: 'flow-link',
        sourceNodeId: 'node_3',
        targetNodeId: 'node_5'
      },
      {
        type: 'flow-link',
        sourceNodeId: 'node_5',
        targetNodeId: 'node_6'
      },
      {
        type: 'flow-link',
        sourceNodeId: 'node_5',
        targetNodeId: 'node_7'
      }
    ]
  },
  init(lf) {
    lf.on('node-red:start', () => {
      // TODO: 让流程跑起来
      console.log('我要开始执行流程了')
    })
    lf.on('vue-node:click', (data: { id: string; val: number; }) => {
      lf.setProperties(data.id, {
        t: ++data.val
      })
    })
  }
}
