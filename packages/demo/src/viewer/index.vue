<template>
  <a-layout style="height: 100%; width: 100%; margin: 0; overflow: hidden">
    <a-layout-header style="background: #fff; height: 42px;line-height: 32px; padding: 5px 10px">
      <toolbar />
    </a-layout-header>
    <a-layout-content>
      <div ref="container"
        style="height: 100%; width: 100%;padding: 4px;box-shadow: 0 0 4px rgb(0 0 0 / 30%) inset; background: #fff">
      </div>
    </a-layout-content>
  </a-layout>
  <a-drawer v-model:visible="codeDrawerVisible" title="代码" placement="right" size="large" :bodyStyle="{ padding: 0 }"
    @after-visible-change="setCode">
    <template #extra>
      <a-form-item v-if="existAdapterOut" label="原始代码" style="margin: 0">
        <a-switch v-model:checked="rawCode" @change="setCode" />
      </a-form-item>
    </template>
    <highlight autodetect :code="code" />
  </a-drawer>
</template>

<style>
.ant-layout-sider-children {
  padding: 10px;
}

.lf-mini-map {
  padding-top: 0;
  right: 5px;
  bottom: 5px;
  height: 120px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
  background-color: rgba(255, 255, 255, 0.8);
}

.lf-mini-map-header,
.lf-mini-map-close {
  visibility: hidden;
}

.lf-mini-map .lf-graph {
  background: none;
}

pre,
pre code.hljs {
  overflow: visible;
  margin: 0;
  background-color: transparent;
}
</style>

<script setup lang="ts">
import highlightjs from "@highlightjs/vue-plugin"
import { Definition } from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { MiniMap } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/stackoverflow-light.css'
import { useViewer } from 'logicflow-useapi'
import { onMounted, provide, ref } from 'vue'
import models from '../models'
import Toolbar from './toolbar.vue'

// Model Config
const urlParams = new URLSearchParams(location.search)
const _mt = urlParams.has('modelType') ? urlParams.get('modelType') : 'bpmn'
const modelType = ref(_mt)
const model = models.find(m => m.name === modelType.value) || models[0]

// Viewer
const viewer = useViewer(model)

// codeViewer
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
const highlight = highlightjs.component
const codeDrawerVisible = ref(false)
const code = ref('')
const rawCode = ref(false)
const existAdapterOut = ref(false)
const setCode = () => {
  let c
  if (rawCode.value) {
    c = viewer.lf?.getGraphRawData()
  } else {
    c = viewer.lf?.getGraphData()
  }
  if (typeof c == 'object') c = JSON.stringify(c, null, 2)
  code.value = c
}

// provide context
provide('viewer_context', Object.assign(viewer, { codeDrawerVisible }))

// init
const container = ref<HTMLElement>()
onMounted(() => {
  if (!container.value) {
    console.log('error container is null')
    return
  }
  const _logicflow_options: Definition = {
    container: container.value,
    isSilentMode: true,
    plugins: [
      MiniMap
    ]
  }
  viewer.initLogicFlow(_logicflow_options)

  existAdapterOut.value = !!viewer.lf?.adapterOut
})
</script>
