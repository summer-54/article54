<script setup lang="ts">
import {Article54} from "@/article54/index.js";
import {defineAsyncComponent} from "vue";

let Article = defineAsyncComponent({
  loader: () => import("@/mdx/main.mdx")
});
</script>

<template>
  <main>
    <Article54>
      <Article/>
    </Article54>
  </main>
</template>