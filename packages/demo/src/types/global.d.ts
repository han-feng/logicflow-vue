// Node-RED modules
declare module './models/node-red/icons' {
  export const StartIcon: string;
  export const FetchIcon: string;
  export const FunctionIcon: string;
  export const DelayIcon: string;
  export const SwitchIcon: string;
  export const SwapIcon: string;
  export const VueIcon: string;
  export const VueHtmlIcon: string;
}

declare module './models/node-red/style.css' {
  const style: string;
  export default style;
}

declare module './models/node-red/util' {
  export function h(type: string, props?: any, children?: any[]): any;
  export function formatText(text: string, width: number, rowHeight: number): string;
}

declare module './models/node-red/edges/FlowLink' {
  import { h } from '@logicflow/core';
  export default function FlowLink(props: any): any;
}

// Script modules
declare module './script/img2b64' {
  const img2b64: any;
  export default img2b64;
}

// Vite config modules
declare module '@vitejs/plugin-vue' {
  const plugin: any;
  export default plugin;
}
