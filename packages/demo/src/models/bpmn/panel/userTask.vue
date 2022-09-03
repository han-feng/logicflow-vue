<template>
  <div>
    <h1>
      <img :src="userTaskIcon">
      用户任务
    </h1>
    <a-tabs>
      <a-tab-pane key="general" tab="常规">
      <a-form layout="vertical" class="properties-panel-form" :model="data" name="ppform">
          <a-form-item label="编号">
            <a-input v-model:value="data.id" />
          </a-form-item>
          <a-form-item label="名称" name="text">
            <a-textarea v-model:value="data.text" auto-size />
          </a-form-item>
          <a-form-item label="描述" name="description">
            <a-textarea v-model:value="data.properties.discription" auto-size />
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="userTaskInfo" tab="参与者">
        <business-assignee :value="data.properties" />
      </a-tab-pane>
      <a-tab-pane key="taskAssignment" tab="工作台" force-render>
        <business-work-space :value="data.properties" displayType="userTask" />
      </a-tab-pane>
      <a-tab-pane key="BusinessOper" tab="操作" force-render>
        <business-oper :value="data.properties" displayType="userTask" />
      </a-tab-pane>
      <a-tab-pane key="listener" tab="监听" force-render>
        <business-listener :value="data.properties" displayType="userTask" />
      </a-tab-pane>
      <a-tab-pane key="extensions" tab="扩展">
        <a-form layout="vertical" class="properties-panel-form" :model="data" name="propsform">
          <a-form-item label="扩展属性" name="properties">
            <properties-editor :value="data.properties" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { usePropertiesPanelData } from 'logicflow-useapi'
import { userTaskIcon } from '../icons'
import './style.css'
const data = usePropertiesPanelData()
</script>
