<template>
  <div style="width:480px;padding:10px;border:1px solid blue">
    <a-form layout="vertical" :model="data" name="ppform">
      <a-form-item label="扩展属性">
        <properties-editor :value="data.properties" />
      </a-form-item>
    </a-form>
    <highlight autodetect :code="JSON.stringify(data.properties, null, 2)" />
  </div>
</template>

<script setup lang="ts">
import highlightjs from "@highlightjs/vue-plugin";
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/stackoverflow-light.css';
import { reactive } from 'vue';

hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
const highlight = highlightjs.component

const data = reactive<{
  properties: Record<string, string>
}>({
  properties: {
    'key.test1': 'value.test1',
    'key.test2': 'value.test2',
    'key.test3': 'value.test3',
    'key1': 'value1'
  }
})
</script>
