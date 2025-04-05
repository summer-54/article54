<script lang="ts">
import {Tab, TabList, Tabs} from "primevue";
import type {PropType} from "vue";

export default {
  name: "TabsComponent",
  components: {Tabs, TabList, Tab},
  props: {
    tabs: {
      type: Object as PropType<Array<string>>,
      required: true,
    }
  }
}
</script>

<template>
  <Tabs :value="0" style="--p-tabs-tablist-background: transparent">
    <TabList>
      <template v-for="(tab, index) in tabs">
        <Tab :value="index">{{tab}}</Tab>
      </template>
    </TabList>
    <TabPanels>
      <slot/>
    </TabPanels>
  </Tabs>
</template>