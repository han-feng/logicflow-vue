<template>
  <a-row type="flex" justify="space-between">
    <a-space>
      <a-select @change="changedModelType" :dropdownMatchSelectWidth="false" v-model:value="modelType"
        :options="modelTypeOptions">
      </a-select>
      <a-space :size="0">
        <a-button @click="zoomOut">
          <template #icon>
            <zoom-out-outlined />
          </template>
        </a-button>
        <a-button @click="zoomIn">
          <template #icon>
            <zoom-in-outlined />
          </template>
        </a-button>
        <a-tooltip title="恢复原始大小和位置">
          <a-button @click="resetZoom">
            <template #icon>
              <icon>
                <template #component>
                  <svg class="icon" viewBox="100 100 810 810" width="1em" height="1em">
                    <path
                      d="M316 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8zM512 622c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39zM512 482c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39z">
                    </path>
                    <path
                      d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z">
                    </path>
                    <path d="M648 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8z">
                    </path>
                  </svg>
                </template>
              </icon>
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip title="自适应大小">
          <a-button @click="fitView(100)">
            <template #icon>
              <icon>
                <template #component>
                  <svg class="icon" viewBox="0 0 1024 1024" width="1em" height="1em">
                    <path
                      d="M144 112h232a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H221.255l216.716 216.716a8 8 0 0 1 0 11.313l-33.942 33.942a8 8 0 0 1-11.313 0L176 221.255V376a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8V144c0-17.673 14.327-32 32-32z m-32 536v232c0 17.673 14.327 32 32 32h232a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H221.884l215.901-215.901a8 8 0 0 0 0-11.314l-33.941-33.941a8 8 0 0 0-11.314 0L176 803.374V648a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8z m690.744 200L586.529 631.785a7.999 7.999 0 0 1 0-11.314l33.941-33.941a8 8 0 0 1 11.314 0L848 802.747V648a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v232c0 17.673-14.327 32-32 32H648a8 8 0 0 1-8-8v-48a8 8 0 0 1 8-8h154.744zM912 376V144c0-17.673-14.327-32-32-32H648a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h155.373l-217.03 217.029a8 8 0 0 0 0 11.314l33.941 33.941a8 8 0 0 0 11.314 0L848 221.882V376a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8z">
                    </path>
                  </svg>
                </template>
              </icon>
            </template>
          </a-button>
        </a-tooltip>
      </a-space>
      <a-space :size="0">
        <a-tooltip title="显示/隐藏 缩略图导航">
          <a-button @click="toggleMiniMap()" :type="showMiniMap ? 'primary' : 'default'">
            <template #icon>
              <fund-view-outlined />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip title="查看代码">
          <a-button @click="codeDrawerVisible = true" :type="codeDrawerVisible ? 'primary' : 'default'">
            <template #icon>
              <icon>
                <template #component>
                  <svg class="icon" viewBox="100 100 820 820" width="1em" height="1em">
                    <path
                      d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z">
                    </path>
                  </svg>
                </template>
              </icon>
            </template>
          </a-button>
        </a-tooltip>
      </a-space>
    </a-space>
  </a-row>
</template>

<script setup lang="ts">
import Icon from '@ant-design/icons-vue';
import { inject } from 'vue';

const {
  showMiniMap, toggleMiniMap, zoomOut, zoomIn, resetZoom, fitView,
  modelTypeOptions, modelType, changedModelType, codeDrawerVisible
} = inject<any>('viewer_context')
</script>
