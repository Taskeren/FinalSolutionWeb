<script setup lang="ts">

import type {VersionUsageCount} from "~/server/utils/finalsolution";

useHead({
  title: "Final Solution",
  meta: [
    {name: "description", content: "Final Solution, the NetLimiter wrapper designed for Destiny 2."}
  ]
})

let {data: rawData} = await useFetch<VersionUsageCount[]>("/api/all")

// convert null to undefined
let data = rawData.value === null ? undefined : rawData.value

const columns = [
  {
    key: "key",
    label: "Version",
  },
  {
    key: "count",
    label: "Count",
  }
]

</script>

<template>
  <div class="container">
    <div class="max-w-lg mx-auto">
      <UTable :columns="columns" :rows="data"></UTable>
    </div>
  </div>
</template>

<style scoped>
</style>