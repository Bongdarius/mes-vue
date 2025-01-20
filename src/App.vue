<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div>
    <div class="router flex justify-center text-green-700">
      <RouterLink to="/">그리드공통</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
