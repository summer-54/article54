<script lang="ts" setup>
import {Image} from "primevue";
import {onMounted, ref, watch, inject} from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String
  }
});

const src = ref("");

const attachmentsResolver = inject<(file: string) => Promise<string> | string>("attachmentsResolver", file => file);

async function getImage() {
  src.value = await attachmentsResolver(props.src);
}

onMounted(() => getImage());
watch(props, () => getImage(), {deep: true});
</script>

<template>
  <div class="container">
    <Image v-if="src" :src="src" :alt="props.alt" preview :class="$style.img"/>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
</style>

<style module>
.img > * {
  max-width: 100%;
  border-radius: 50px;
}
</style>