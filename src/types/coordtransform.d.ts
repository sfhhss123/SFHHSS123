// `declare` 关键字在 TypeScript 里用于声明一个类型或模块，告诉编译器某个变量、函数、类、模块等的类型信息，
// 但不会生成实际的 JavaScript 代码。这里 `declare module 'coordtransform'` 表示声明一个名为 'coordtransform' 的模块，
// 后续可以在这个模块里定义其导出的类型和函数等。
declare module 'coordtransform' {
  export function wgs84togcj02(lng: number, lat: number): [number, number];
  export function gcj02towgs84(lng: number, lat: number): [number, number];
  export function wgs84tobd09(lng: number, lat: number): [number, number];
  export function bd09towgs84(lng: number, lat: number): [number, number];
  // 添加其他需要使用的函数声明...
}