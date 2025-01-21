<script setup lang="ts">
import RenderMarkdown from './components/RenderMarkdown.vue';
import policy from "./assets/privacy-policy.md?raw";
</script>

<template>
    <div id="container">
      <RenderMarkdown :source="policy"/>
    </div>
</template>

<style scoped>
  #container {
    text-align: start;
  }
</style>
