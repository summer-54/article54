<script lang="ts">
import {Panel} from "primevue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ColoredComponent",
  components: {Panel},
  props: {
    color: {
      type: String,
      default: "green"
    }
  }
})
</script>

<template>
<!--  <glm-content-area class="content-area" :bg="(attributes ?? {}).color" :clear="nested">-->
<!--&lt;!&ndash;    <article-renderer0 :data="elements"/>&ndash;&gt;-->
<!--    <slot/>-->
<!--  </glm-content-area>-->
  <Panel :style="{'--p-panel-background': color}" class="colored">
    <slot/>
  </Panel>
</template>

<style>
.colored .p-panel-header {
  display: none;
}

.colored .p-panel-content {
  padding: 10px;
}
</style>