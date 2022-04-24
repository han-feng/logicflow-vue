<template>
  <h1>{{ title }}</h1>
  <a-form layout="vertical" :model="element" name="ppform">
    <a-form-item label="编号">
      <a-input v-model:value="element.id" />
    </a-form-item>
    <a-form-item label="文本" name="text">
      <a-textarea v-model:value="element.text" auto-size />
    </a-form-item>
    <a-form-item label="扩展属性1" :name="['properties', 'test1']">
      <a-input v-model:value="element.properties.test1" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { usePropertiesPanelContext } from 'logicflow-useapi';
import { ref } from 'vue';

const element = usePropertiesPanelContext()
const title = ref('Default Properties Panel')
</script>
