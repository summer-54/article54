<script lang="ts">
import {Button, Panel} from "primevue";
import arrowSvg from "./assets/arrowDown.svg";
import {defineComponent} from "vue";

export default defineComponent({
  name: "SpoilerComponent",
  components: {Panel, Button},
  props: {
    title: {
      type: String
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      active: true,
      arrowSvg
    }
  }
})
</script>

<template>
<!--  <glm-content-area class="content-area" :clear="nested">-->
<!--    <glm-content-area class="title" clear @click="active = !active" :style="{marginBottom: active ? '10px' : '0'}">-->
<!--      <ion-icon name="caret-down-circle" class="icon"/>-->
<!--      <span @click="active = !active">{{(attributes ?? {}).title ?? ""}}</span>-->
<!--    </glm-content-area>-->
<!--    <slot v-if="active"/>-->
<!--  </glm-content-area>-->
  <Panel :collapsed="active" :style="{...(color ? {'--p-panel-background': color} : {}), '--p-panel-content-padding': '0 10px 10px 10px'}">
    <template #header>
      <Button @click="active = !active"><img :src="arrowSvg" alt="open/close">{{title ?? ""}}</Button>
    </template>
    <slot/>
  </Panel>
</template>