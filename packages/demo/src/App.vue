<template>
  <a-row :gutter="16" style="background-color: #f0f2f5; padding: 16px">
    <a-col>
      <a-card hoverable style="width: 320px">
        <template #cover>
          <img alt="bpmn" src="/img/bpmn.png" />
        </template>
        <template #actions>
          <a-button type="link" href="./viewer.html">
            查看
            <template #icon>
              <read-outlined />
            </template>
          </a-button>
          <a-button type="link" href="./modeler.html">
            编辑
            <template #icon>
              <edit-outlined />
            </template>
          </a-button>
        </template>
        <a-card-meta title="BPMN" description="BPMN 2.0 模型的简化版本">
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col>
      <a-card hoverable style="width: 320px">
        <template #cover>
          <img alt="Node-RED" src="/img/nodeRed.png" />
        </template>
        <template #actions>
          <a-button type="link" href="./viewer.html?modelType=nodeRed">
            查看
            <template #icon>
              <read-outlined />
            </template>
          </a-button>
          <a-button type="link" href="./modeler.html?modelType=nodeRed">
            编辑
            <template #icon>
              <edit-outlined />
            </template>
          </a-button>
        </template>
        <a-card-meta title="Node-RED">
          <template #description>
            类似 <a href="https://nodered.org/" target="_blank">Node-RED</a> 的流程模型
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>
