<template>
  <h1>{{ title }}</h1>
  <a-form layout="vertical" class="properties-panel-form" :model="data" name="ppform">
    <a-form-item label="编号" extra="用户任务的唯一标识">
      <a-input v-model:value="data.id" />
    </a-form-item>
    <a-form-item label="文本" name="text">
      <a-textarea v-model:value="data.text" auto-size />
    </a-form-item>
    <a-form-item label="扩展属性" name="properties">
      <properties-editor :value="data.properties" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { usePropertiesPanelData } from 'logicflow-useapi';
import { ref } from 'vue';
import './style.css';

const data = usePropertiesPanelData()
const title = ref('User Task Properties Panel')
</script>
