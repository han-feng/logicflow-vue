<template>
  <a-row v-for="(data,index) in properties">
    <a-input-group compact>
      <a-select mode="SECRET_COMBOBOX_MODE_DO_NOT_USE" :dropdownMatchSelectWidth="false" size="small"
        v-model:value="data[0]" :options="options" style="width:calc(50% - 12px)"></a-select>
      <a-input v-model:value="data[1]" size="small" style="width:calc(50% - 12px)" />
      <a-button type="text" size="small" @click="delProp(index)">
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
</template>

<script lang="ts">
type addLog = {
  // index: number 暂不考虑新增记录位置，全部添加到最后
  key: string
  value: string
}

type updateLog = {
  key: string
  value: string
}

type ChangeSet = {
  adds: addLog[]
  updates: Record<string, updateLog>
}

</script>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps<{
  value: Record<string, string>
}>()

const options = [
  { label: '属性1（key1）', value: 'key1' },
  { label: '属性2（key2）', value: 'key2' },
  { label: '属性3（key3）', value: 'key3' },
]

const changeset = reactive<ChangeSet>({
  adds: [],
  updates: {}
})

const properties = computed(() => {
  const datas = <[string, string, number, addLog | updateLog | null][]>([])
  const value = props.value
  let log: updateLog | null
  let type: number
  Object.keys(value).forEach((key) => {
    log = changeset.updates[key] || null
    type = log ? 2 : 0
    datas.push([key, value[key], type, log])
  })
  changeset.adds.forEach((addlog) => {
    datas.push([addlog.key, addlog.value, 1, addlog])
  })
  return datas
})

function addProp() {
  changeset.adds.push({
    // index: properties.value.length,
    key: '',
    value: ''
  })
}

function delProp(index: number) {
  const key = properties.value[index][0]
  const type = properties.value[index][2]
  const log = properties.value[index][3]
  switch (type) {
    case 2: // 待更新数据，先删除变更记录，然后删源
      delete changeset.updates[key]
    case 0: // 原始数据，直接删源
      delete props.value[key]
      break
    case 1: // 待新增数据，删除新增
      if (log) changeset.adds.splice(changeset.adds.indexOf(log), 1)
      break
    default:
  }
}

</script>
