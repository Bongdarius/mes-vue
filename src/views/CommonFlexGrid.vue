<template>
  <div class="flex justify-center mt-[20px]">
    <div>
      <div class="flex gap-[5px] justify-center">
        <Button label="추가" @click="addDatas"></Button>
        <Button label="저장" @click="saveDatas"></Button>
        <Button label="삭제" @click="deleteDatas"></Button>
      </div>
      <GridUpper v-if="grid" :grid="grid" />
      <wj-flex-grid :itemsSource="view" :initialized="gridInit" :selectionMode="'MultiRange'">
        <wj-flex-grid-cell-template cellType="TopLeft">
          <div class="text-center">No</div>
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="RowHeader" v-slot="cell">
          <div class="text-center">{{ cell.row.index + 1 }}</div>
        </wj-flex-grid-cell-template>
        <wj-flex-grid-column binding="name" header="Name" />
        <wj-flex-grid-column binding="age" header="Age" />
      </wj-flex-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as wijmoCore from '@mescius/wijmo';
import * as wijmoGrid from '@mescius/wijmo.grid';
import { Selector } from '@mescius/wijmo.grid.selector';
import { FlexGridFilter } from '@mescius/wijmo.grid.filter';
import { onMounted, ref, type Ref } from 'vue';
import GridUpper from '@/components/wijmogrid/GridUpper.vue';

/* Interface */
interface Person {
  name: string;
  age: number;
}

/* Global variable */
const grid = ref<wijmoGrid.FlexGrid>() as Ref<wijmoGrid.FlexGrid>;
const view = new wijmoCore.CollectionView<Person>([], {
  trackChanges: true,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let selector: Selector;

/* User Define Function */
const getData = () => {
  const data: Person[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      name: `name${i}`,
      age: i,
    });
  }
  return data;
};

/* Event */
onMounted(() => {
  view.sourceCollection = getData();
  view.refresh();
});

const gridInit = (gridInstance: wijmoGrid.FlexGrid) => {
  grid.value = gridInstance;
  new FlexGridFilter(gridInstance);

  selector = new Selector(gridInstance);
  grid.value.rowHeaders.columns.push(new wijmoGrid.Column());

  grid.value.selectionMode = 6;
};

const addDatas = (e: Event) => {
  view.addNew({});
};
const saveDatas = (e: Event) => {
  console.log(view.itemsAdded);
};
const deleteDatas = (e: Event) => {};
</script>

<style>
.wj-flexgrid {
  margin-top: 0px;
}

.wj-flexgrid:not(.changed) {
  height: 300px;
}

.wj-flexgrid.changed {
  font-size: 90%;
  background-color: #f0f0f0;
}

.wj-flexgrid.edited {
  color: orange;
}

.wj-flexgrid.added {
  color: green;
}

.wj-flexgrid.removed {
  color: red;
}
</style>
