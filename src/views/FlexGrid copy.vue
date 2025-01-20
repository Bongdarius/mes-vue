<template>
  <div>
    <wj-flex-grid
      :itemsSource="dataList"
      :keyActionTab="'Cycle'"
      style="height: 70vh"
      :initialized="gridInit"
      :allowAddNew="true"
      :allowDelete="true"
      :newRowAtTop="true"
    >
      <wj-flex-grid-cell-template cellType="TopLeft">
        <!-- <span class="wj-glyph-down-right"></span> -->
        <input type="checkbox" @change="checked" />
      </wj-flex-grid-cell-template>
      <wj-flex-grid-cell-template cellType="RowHeader" v-slot="cell">
        <div>
          {{ cell.row.index + 1 }}
          <!-- <input type="checkbox" v-model="cell.row.dataItem.selected" /> -->
        </div>
      </wj-flex-grid-cell-template>
      <wj-flex-grid-cell-template cellType="RowHeaderEdit"> * </wj-flex-grid-cell-template>
      <wj-flex-grid-column binding="name" header="Name" width="*" />
      <wj-flex-grid-column binding="age" header="Age" width="*" />
      <wj-flex-grid-column binding="isMale" header="Is Male" width="*" />
    </wj-flex-grid>
    <button @click="getSelectedRows">선택된 행 가져오기</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as wijmoGrid from '@mescius/wijmo.grid';

interface Person {
  name: string;
  age: number;
  isMale: boolean;
  selected: boolean; // 선택 여부 필드 추가
}

const dataList = ref<Person[]>();
let flexGrid: wijmoGrid.FlexGrid | null = null;

onMounted(() => {
  const people: Person[] = [];

  for (let i = 0; i < 100; i++) {
    people.push({
      name: `정태영${i}`,
      age: i,
      isMale: i % 2 === 0,
      selected: false, // 초기 선택 값
    });
  }

  dataList.value = people;
});

const gridInit = (gridInstance: wijmoGrid.FlexGrid) => {
  flexGrid = gridInstance;
};

// 선택된 행 가져오기 함수
const getSelectedRows = () => {
  if (!dataList.value) return;

  const selectedRows = dataList.value.filter((row) => row.selected);
  console.log('선택된 행:', selectedRows);
};

const checked = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const isChecked = target.checked;
  const newDataList = dataList.value;
  newDataList?.forEach((each) => {
    each.selected = isChecked;
  });
  dataList.value = newDataList;
};
</script>

<style scoped></style>
