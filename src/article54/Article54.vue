<script setup lang="ts">
import {MDXProvider} from "@mdx-js/vue";
import "katex/dist/katex.min.css";
</script>

<template>
  <MDXProvider><slot/></MDXProvider>
</template>

<style scoped>

</style>