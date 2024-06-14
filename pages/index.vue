<script setup lang="ts">

useHead({
  title: "Final Solution",
  meta: [
    {name: "description", content: "Final Solution, the NetLimiter wrapper designed for Destiny 2."}
  ]
})

let showVideo = ref(false)

const now = ref(Date.now())

type LimitKeys =
    | "3074D"
    | "3074U"
    | "..."

type LimitEntry = {
  enabled: boolean,
  started?: number
}

let fs = reactive<({ [K in LimitKeys]: LimitEntry })>({
  '3074D': {
    enabled: false,
    started: undefined,
  },
  '3074U': {
    enabled: false,
    started: undefined,
  },
  '...': {
    enabled: false,
    started: undefined,
  },
})

onMounted(() => {
  setInterval(() => {
    now.value = Date.now()
  }, 50)

  window.addEventListener('keydown', (e) => {
    if(e.key == "Control" || e.key == "Alt" || e.key == "Shift") return

    console.log(e.key, e.ctrlKey)

    if(e.key === "g" && e.ctrlKey) {
      fs["3074D"].enabled = !fs["3074D"].enabled
      if(fs["3074D"].enabled) {
        fs["3074D"].started = Date.now()
      } else {
        fs["3074D"].started = undefined
      }
      e.preventDefault()
    }
    if(e.key === "h" && e.ctrlKey) {
      fs["3074U"].enabled = !fs["3074U"].enabled
      if(fs["3074U"].enabled) {
        fs["3074U"].started = Date.now()
      } else {
        fs["3074U"].started = undefined
      }
      e.preventDefault()
    }
  })
})

</script>

<template>
  <div class="max-w-2xl h-full mx-auto my-4 space-y-6 text-stone-800 px-4">
    <h1 class="text-4xl font-extrabold text-primary-500 text-center">Final Solution</h1>
    <div class="text-lg leading-6">
      Final Solution is a free and close-source software providing additional
      NetLimiter 4/5 functionality for Destiny 2, including the game overlay, the limiting timer, the auto unlimiting,
      the game pauser, which all these features are configurable.
    </div>
    <p class="font-semibold text-white uppercase border-2 border-red-700 bg-red-500 p-4">
      Be aware that Final Solution can lead to an account ban according to
      <a class="underline" href="https://bungie.net/ban">Destiny Account Restrictions and Banning
        Policies</a>. Use at your own risks.
    </p>
    <div class="flex flex-wrap justify-center space-x-4 py-8 link-box">
      <a href="https://mvn.taskeren.cn/#/snapshots/FinalSolution" target="_blank">Download</a>
      <a href="https://gitee.com/nitu2003/final-solution-manual/blob/master/README.md" target="_blank">Manual</a>
      <a href="https://github.com/Taskeren/3074_Release/issues" target="_blank">Issue Tracker</a>
    </div>
    <ul class="text-sm list-decimal">
      <li>The download site is located in the Mainland of China. If you cannot download, let me know.</li>
      <li>The manual is written in Simplified Chinese. I recommend you to use machine translator. There is no plan to
        translate it to English.
      </li>
    </ul>
    <!--suppress HtmlUnknownAttribute, HtmlWrongAttributeValue, HtmlDeprecatedAttribute -->
    <iframe v-if="showVideo" class="w-full h-72"
            src="//player.bilibili.com/player.html?isOutside=true&aid=1555725192&bvid=BV1H1421C7Qt&cid=1581044636&p=1"
            scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
    <div v-else class="w-full h-72 flex items-center justify-center">
      <button class="px-4 py-2 text-white font-semibold rounded-lg shadow-lg bg-primary-500 hover:bg-primary-600"
              @click="showVideo=true">
        Show Video (Bilibili)
      </button>
    </div>
    <div class="text-sm text-center">Copyright &copy; 2024 The Genius Warlock. All rights reserved.</div>
  </div>
  <div class="absolute top-2 left-2 p-6 bg-gray-200 hidden md:block">
    <div v-for="(value, port) in fs" class="flex items-center gap-2">
      <div v-show="!value.enabled" class="inline-block border border-black w-4 h-4"></div>
      <div v-show="value.enabled" class="inline-block border border-black w-4 h-4 bg-green-400"></div>
      {{ port }}
      <div v-if="typeof value.started === 'number'">{{ (now - (value.started)) / 1000 }}s</div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.link-box > * {
  @apply px-4 py-2 rounded-lg text-white font-semibold shadow-lg bg-primary-500 hover:bg-primary-600 transition
}
</style>