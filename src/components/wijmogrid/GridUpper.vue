<template>
  <div class="flex gap-[5px] justify-end mr-[5px]">
    <RowCounter></RowCounter>
    <ColumPicker v-if="grid_ && picker_" :grid="grid_" :picker="picker_"></ColumPicker>
    <div style="display: none">
      <wj-list-box
        class="column-picker"
        :itemsSource="grid.columns"
        :initialized="pickerInit"
        :displayMemberPath="'header'"
        :checkedMemberPath="'visible'"
      ></wj-list-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType, type Ref } from 'vue';
import ColumPicker from './ColumPicker.vue';
import RowCounter from './RowCounter.vue';
import * as wijmoInput from '@mescius/wijmo.input';
import * as wijmoGrid from '@mescius/wijmo.grid';

// Props
const props = defineProps({
  grid: {
    type: Object as PropType<wijmoGrid.FlexGrid>,
    required: true,
  },
});

// Global variable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const picker_ = ref<wijmoInput.ListBox>() as Ref<wijmoInput.ListBox>;
const grid_ = ref<wijmoGrid.FlexGrid>(props.grid) as Ref<wijmoGrid.FlexGrid>;

// Event
onMounted(() => {
  // console.log(props.grid);
});

const pickerInit = (pickerInstance: wijmoInput.ListBox) => {
  picker_.value = pickerInstance;
};
</script>
