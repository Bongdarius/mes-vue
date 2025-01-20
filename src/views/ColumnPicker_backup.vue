<template>
  <div class="container-fluid">
    <wj-flex-grid :itemsSource="data" :initialized="initializedGrid">
      <wj-flex-grid-cell-template cellType="TopLeft">
        <div @click="topLeftClick" style="cursor: grab">*</div>
      </wj-flex-grid-cell-template>
      <wj-flex-grid-column binding="name" header="Name" width="*" />
      <wj-flex-grid-column binding="age" header="Age" width="*" />
    </wj-flex-grid>
    <div style="display: none">
      <wj-list-box :initialized="initializedPicker"></wj-list-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as wijmoCore from '@mescius/wijmo';
import * as wijmoInput from '@mescius/wijmo.input';
import * as wijmoGrid from '@mescius/wijmo.grid';
import { onMounted } from 'vue';

interface Person {
  name: string;
  age: number;
}

const data = new wijmoCore.CollectionView<Person>([], {
  trackChanges: true,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let flexGrid: wijmoGrid.FlexGrid | null = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let columnPicker: wijmoInput.ListBox | null = null;

onMounted(() => {
  for (let i = 0; i < 100; i++) {
    data.sourceCollection.push({
      name: 'jeong' + i,
      age: i,
    });
  }
  data.refresh();
});

const initializedGrid = (gridInstance: wijmoGrid.FlexGrid) => {
  flexGrid = gridInstance;
};

const initializedPicker = (pickerInstance: wijmoInput.ListBox) => {
  columnPicker = pickerInstance;
};

const topLeftClick = (e: Event) => {
  e.preventDefault();
};
</script>
<style>
/* 스타일은 동일 */
</style>
