<script setup lang="ts">
import {Article54} from "@/article54/index.js";
import {defineAsyncComponent} from "vue";

let Article = defineAsyncComponent({
  // @ts-ignore
  loader: () => import("@/mdx/main.mdx")
});
</script>

<template>
  <main>
    <Article54 class="article">
      <Article/>
    </Article54>
  </main>
</template>

<style scoped>
.article {
  margin: 0 auto;
  max-width: 1200px;
}
</style>