<template>
  <div @click="onClick" style="cursor: grab">
    <img class="w-[20px]" :src="'/src/assets/icon/gear.png'" />
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
    type: Object as PropType<FlexGrid>,
    required: true,
  },
  picker: {
    type: Object as PropType<ListBox>,
    required: true,
  },
});

let isPop = false;

const onClick = (e: Event) => {
  const { grid, picker } = props;
  if (!(grid instanceof FlexGrid) || !(picker instanceof ListBox)) return;
  const ref = document.getElementsByClassName('wj-topleft')[0];
  const host = picker.hostElement;
  if (!isPop) {
    if (!(host instanceof HTMLElement)) return;
    showPopup(host, ref, false, true, true);
  } else {
    hidePopup(host, false, true);
  }
  isPop = !isPop;
  e.preventDefault();
};
</script>
