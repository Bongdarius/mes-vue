<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { default as HelloWorld } from './components/HelloWorld.vue'; /* PartiallyEnd: #3632/scriptSetup.vue */
</script>

<template>
  <div>
    <div class="router">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/flexGrid">FlexGrid</RouterLink> |
      <RouterLink to="/trackChanges">변경내역추적</RouterLink> |
      <RouterLink to="/columnPicker">열선택기</RouterLink> |
      <RouterLink to="/customerMngPage">거래처관리</RouterLink> |
      <RouterLink to="/commonFlexGrid">그리드공통</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
