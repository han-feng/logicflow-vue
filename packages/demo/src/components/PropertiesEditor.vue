<template>
  <div :id="id" v-bind="$attrs">
    <a-row v-for="(data, key) in properties" :key="key">
      <a-input-group compact>
        <a-auto-complete :dropdownMatchSelectWidth="false" size="small" v-model:value="data.newKey" :options="options"
          @blur="changeKey(data)" style="width:calc(50% - 12px)">
        </a-auto-complete>
        <a-input v-model:value="data.newValue" @blur="changeValue(data)" size="small" style="width:calc(50% - 12px)" />
        <a-button type="text" size="small" @click="delProp(data.key)">
          <template #icon>
            <close-outlined />
          </template>
        </a-button>
      </a-input-group>
    </a-row>
    <a-button type="dashed" size="small" style="width:calc(100% - 24px)" @click="addProp">
      <template #icon>
        <plus-outlined />
      </template>
    </a-button>
  </div>
</template>

<script lang="ts">
import { Form } from 'ant-design-vue';
import Ids from 'ids';
import { reactive, watch } from 'vue';

type Property = {
  key: string
  newKey: string
  value: string
  newValue: string
  [key: string]: string | boolean
}

const ids = new Ids([32, 32, 1]);
function getTempId() {
  return '__' + ids.next();
}

const copy = (source: Record<string, string>, target: Property[]) => {
  target.forEach(item => item.del = true)
  Object.keys(source).forEach((key) => {
    const p = target.find(item => item.key === key)
    if (p) {
      p.value = source[key]
      p.del = false
    } else {
      target.push({
        key,
        newKey: key.startsWith('__') ? '' : key,
        value: source[key],
        newValue: source[key],
        del: false
      })
    }
  })
  // 删除多余的元素
  let len = target.length
  for (let i = 0; i < len; i++) {
    if (target[i].del) target.splice(i, 1), i--, len--
  }
  return target
}
</script>

<script setup lang="ts">
const props = defineProps<{
  value: Record<string, string>
}>()

const { id } = Form.useInjectFormItemContext()

const options: { label: string, value: string }[] = [
  // { label: '属性1（key1）', value: 'key1' },
  // { label: '属性2（key2）', value: 'key2' },
  // { label: '属性3（key3）', value: 'key3' },
]

const properties = reactive<Property[]>(copy(props.value, []))

watch(
  () => props.value,
  (newVal, oldVal) => {
    // console.log(newVal, '->', oldVal)
    copy(newVal, properties)
  },
  { deep: true }
)

function addProp() {
  props.value[getTempId()] = ''
}

function delProp(key: string) {
  properties.splice(properties.findIndex(item => item.key === key), 1)
  delete props.value[key]
}

function changeKey(data: Property) {
  if (data.key === data.newKey) return
  // Key 校验
  // TODO: 使用 Form 校验规则及错误提示
  const newKey = data.newKey
  if (newKey.startsWith('__')) {
    console.log('key 不能以 __ 开头')
    return
  }
  if (properties.find(item => item.key === newKey)) {
    console.log('存在重复的 key')
    return
  }
  // console.log('changeKey', data)
  const oldKey = data.key
  data.key = newKey
  props.value[newKey] = data.value
  delete props.value[oldKey]
}

function changeValue(data: Property) {
  if (data.value === data.newValue) return
  // console.log('changeValue', data)
  // data.value = data.newValue // 不用修改，会触发 watch 自动更新
  props.value[data.key] = data.newValue
}
</script>
