<template>
  <div @click="topLeftClick" style="cursor: grab">
    <img :src="'/src/assets/icon/gear.png'" :width="20" />
  </div>
</template>

<script setup lang="ts">
import {
  showPopup,
  hidePopup,
  // hasClass,
  // contains,
  // closest,
  // createElement,
  // removeChild,
  // getElement,
  // CollectionView,
} from '@mescius/wijmo';
import type { PropType } from 'vue';
import { ListBox } from '@mescius/wijmo.input';
import { FlexGrid } from '@mescius/wijmo.grid';

const props = defineProps({
  grid: {
    type: Object as PropType<FlexGrid | null>,
    required: true,
  },
  picker: {
    type: Object as PropType<ListBox | null>,
    required: true,
  },
});

let isPop = false;

const topLeftClick = (e: Event) => {
  const { grid, picker } = props;
  if (!(grid instanceof FlexGrid) || !(picker instanceof ListBox)) return;
  const ref = grid.hostElement;
  const host = picker.hostElement;
  if (!isPop) {
    if (!(host instanceof HTMLElement)) return;
    showPopup(host, ref, true, true, true);
  } else {
    hidePopup(host, false, true);
  }
  isPop = !isPop;
  e.preventDefault();
};
</script>
