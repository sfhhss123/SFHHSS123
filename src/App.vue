<template>
  <div class="container">
    <div class="input-panel w-1500" >
      <textarea 
        v-model="inputText"
        placeholder="输入内容..."
        class="text-editor"
      ></textarea>
    </div>
    <button class="w-100px h-30px " @click="doit">转换</button>
    <div class="output-panel">
      <textarea 
        v-model="convertedText"
        readonly
        placeholder="转换结果将在此显示..."
        class="text-editor"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { wgs84togcj02 } from 'coordtransform'

const inputText = ref<string>('')
const convertedText = ref<string>('') // 显式声明string类型
/**字段转化 */
const doit =() => {
  const arr = JSON.parse(inputText.value)
  const result = arr.map((item:any) => {
    return {
      name: item.properties.name,
      value: convertData(item.geometry.coordinates)
    }
  })
  console.log(result,'TTTTTTTTTTTT')
  type ResultItem = {
    name: string;
    value: string;
  }

  let arrAfter = JSON.stringify(result.map((item: ResultItem) => {
    return {
      [item.name]: item.value
    }
  }));

  // 将对象转换为字符串后再赋值
  convertedText.value = JSON.stringify(JSON.parse(arrAfter).reduce((acc, curr) => ({ ...acc, ...curr }), {}), null, 2);
}
// 定义转换方法
const convertData = (val:number[][]) => {
  try {
    console.log(val)
    const inputArray = val
    // const inputArray = JSON.parse(inputText.value)
    // 将坐标转换为高德格式
    const amapCoords = inputArray.map((item: [number, number]) => {
      // const [lng, lat] = [item[0], item[1]]
      const [lng, lat] = wgs84togcj02(item[0], item[1])
      return [lng, lat]
    })
    // 转换数组元素并拼接成字符串
    const result = amapCoords.map((item: [number, number]) => `${item[0]}:${item[1]}`).join(',')
    return result
    // convertedText.value = result
  } catch (error) {
    console.error('转换失败:', error)
    convertedText.value = '输入格式错误，请检查输入内容。'
  }
}
// // 定义转换方法
// const convertData = () => {
//   try {
//     // 解析输入的字符串为数组
//     const inputArray = JSON.parse(inputText.value)
//     // 将坐标转换为高德格式
//     const amapCoords = inputArray.map((item: [number, number]) => {
//       // const [lng, lat] = [item[0], item[1]]
//       const [lng, lat] = wgs84togcj02(item[0], item[1])
//       return [lng, lat]
//     })
//     // 转换数组元素并拼接成字符串
//     const result = amapCoords.map((item: [number, number]) => `${item[0]}:${item[1]}`).join(',')
//     convertedText.value = result
//   } catch (error) {
//     console.error('转换失败:', error)
//     convertedText.value = '输入格式错误，请检查输入内容。'
//   }
// }
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.container {
  display: flex;
  height: 100vh;
  gap: 20px;
  padding: 20px;
}

.input-panel,
.output-panel {
  flex: 1;
  background: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
}

.text-editor {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  resize: none;
  color: #fff;
  font-size: 16px;
}

.content-display {
  color: #fff;
  white-space: pre-wrap;
  line-height: 1.5;
}
</style>
