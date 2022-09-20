import type { Component, ComputedOptions, MethodOptions } from 'vue'
import { createApp } from 'vue'
import { message } from 'ant-design-vue'

message.config({
  duration: 5,
})

function errorHandler(err: any) {
  console.error('app.config.errorHandler', err)
  message.error(err.message || '未知错误，请重试')
}

export default function (rootComponent: Component<any, any, any, ComputedOptions, MethodOptions>): void {
  const app = createApp(rootComponent)
  app.config.errorHandler = errorHandler
  app.mount('#app')
}
