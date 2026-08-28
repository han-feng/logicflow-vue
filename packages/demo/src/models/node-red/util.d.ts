declare module './util' {
  export function h(type: string, props?: any, children?: any[]): any;
  export function formatText(text: string, width: number, rowHeight: number): string;
}
