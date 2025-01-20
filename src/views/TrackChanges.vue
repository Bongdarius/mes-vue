<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-6">
        <wj-flex-grid :itemsSource="view" :allowAddNew="true" :allowDelete="true"> </wj-flex-grid>
      </div>
      <div class="col-xs-6">
        <h4>Edited Items:</h4>
        <wj-flex-grid class="changed edited" :itemsSource="view.itemsEdited" :isReadOnly="true">
        </wj-flex-grid>

        <h4>Added Items:</h4>
        <wj-flex-grid class="changed added" :itemsSource="view.itemsAdded" :isReadOnly="true">
        </wj-flex-grid>

        <h4>Removed Items:</h4>
        <wj-flex-grid class="changed removed" :itemsSource="view.itemsRemoved" :isReadOnly="true">
        </wj-flex-grid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as wijmo from '@mescius/wijmo';

interface Data {
  country: string;
  downloads: number;
  sales: number;
  expenses: number;
}

const getData = () => {
  const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy'];
  const data: Data[] = [];

  for (let i = 0; i < countries.length; i++) {
    data.push({
      country: countries[i],
      downloads: Math.round(Math.random() * 20000),
      sales: Math.random() * 10000,
      expenses: Math.random() * 5000,
    });
  }
  return data;
};

const view = new wijmo.CollectionView(getData(), {
  sortDescriptions: ['country'],
  trackChanges: true,
});
</script>

<style>
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
