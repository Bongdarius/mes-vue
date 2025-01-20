<template>
  <div>
    <div class="text-center bg-blue-500 text-white p-4 rounded-lg">
      <h1 class="text-3xl font-bold">Hello, Tailwind CSS!</h1>
      <p>Start building your Vue.js app with Tailwind CSS.</p>
    </div>

    <!-- Wijmo FlexGrid에 CollectionView를 바인딩 -->
    <wj-flex-grid
      :itemsSource="collectionView"
      style="height: 300px; width: 100%"
      :allowAddNew="true"
      :allowDelete="true"
    >
      <wj-flex-grid-cell-template cellType="TopLeft">
        <div @click="topLeftClick" style="cursor: grab">*</div>
      </wj-flex-grid-cell-template>
      <wj-flex-grid-column binding="name" header="Name" />
      <wj-flex-grid-column binding="age" header="Age" />
      <wj-flex-grid-column binding="isMale" header="Is Male" />
    </wj-flex-grid>

    <!-- 버튼으로 데이터 조작 -->
    <div>
      <button @click="addItem">데이터 추가</button>
      <button @click="removeItem">데이터 제거</button>
      <button @click="getInsertedRows">추가된 행 가져오기</button>
      <button @click="getUpdatedRows">수정된 행 가져오기</button>
      <button @click="getDeletedRows">삭제된 행 가져오기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CollectionView } from '@mescius/wijmo';

// CollectionView 타입 지정
interface Person {
  name: string;
  age: number;
  isMale: boolean;
}

const collectionView = ref<CollectionView<Person> | null>(null);

onMounted(() => {
  // 초기 데이터 설정
  const data: Person[] = [
    { name: 'John Doe', age: 30, isMale: true },
    { name: 'Jane Smith', age: 25, isMale: false },
    { name: 'Alice Johnson', age: 35, isMale: false },
  ];

  // CollectionView 생성 및 데이터 바인딩
  collectionView.value = new CollectionView(data, {
    trackChanges: true,
  });
});

const topLeftClick = (e: Event) => {
  e.preventDefault();
};

// 데이터 추가 함수
const addItem = () => {
  if (collectionView.value) {
    collectionView.value.sourceCollection.push({
      name: 'New Person',
      age: Math.floor(Math.random() * 50) + 20,
      isMale: Math.random() > 0.5,
    });
    collectionView.value.refresh(); // UI 갱신
  }
};

// 데이터 제거 함수
const removeItem = () => {
  if (collectionView.value) {
    const source = collectionView.value.sourceCollection;
    if (source.length > 0) {
      source.pop(); // 마지막 데이터 제거
      collectionView.value.refresh(); // UI 갱신
    }
  }
};

const getInsertedRows = () => {
  console.log('추가된 행', collectionView.value);
};

const getUpdatedRows = () => {
  console.log('수정된 행', collectionView.value?.itemsEdited);
};

const getDeletedRows = () => {
  console.log('삭제된 행', collectionView.value?.itemsRemoved);
};
</script>
