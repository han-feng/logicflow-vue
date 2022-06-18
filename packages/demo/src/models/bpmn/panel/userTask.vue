<template>
  <h1>
    <img :src="userTaskIcon" />
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
          <a-textarea v-model:value="data.properties.description" auto-size />
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="userTaskInfo" tab="参与者">
      <a-form layout="vertical" class="properties-panel-form" name="pppform" :model="data.properties">
        <a-form-item label="分配策略">
          <a-select placeholder="抢任务/会签" v-model:value="data.properties.fpcl">
            <a-select-option value="single">抢任务</a-select-option>
            <a-select-option value="complexus">会签</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="参与者类型">
          <a-select placeholder="人员/角色/表达式" v-model:value="data.properties.zxrlx">
            <a-select-option value="users">人员</a-select-option>
            <a-select-option value="roles">角色</a-select-option>
            <a-select-option value="expression">表达式</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="表达式" name="text">
          <a-textarea auto-size v-model:value="data.properties.zxr" />
        </a-form-item>
        <a-form-item label="描述" name="text">
          <a-textarea auto-size v-model:value="data.properties.ms" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="formConfig" tab="表单">
      <a-form layout="vertical" class="properties-panel-form" name="fcform">
        <a-form-item label="表单模式" extra="单表单/工作台">
          <a-select placeholder="单表单/工作台加" v-model:value="data.properties.formtype">
            <a-select-option value="single">单表单</a-select-option>
            <a-select-option value="complexus">复合表单</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="表单">
          <a-input placeholder="请输入表单组件名称或者url" v-model:value="data.properties.formurl" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="advanced" tab="高级">
      <a-form layout="vertical" class="properties-panel-form" :model="data" name="advform">
        <a-form-item label="属性" name="properties">
          <properties-editor :value="data.properties" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { usePropertiesPanelData } from 'logicflow-useapi';
import { userTaskIcon } from '../icons';
import './style.css';

const data = usePropertiesPanelData()
</script>
