<script setup>
import axios from "axios"
import { onMounted, ref, onBeforeUnmount, watch } from "vue"
import { SquareCheckBig, ChefHat, Store, Search, LoaderCircle } from "@lucide/vue"

const data = ref()
const search = ref("")
const inputRef = ref(null)
const target = ref(null)

const handleApi = async () => {
  const res = await axios.get(`https://dummyjson.com/recipes/search?q=${search.value}`)
  data.value = res.data.recipes
}

const handleKey = (e) => {
  if (e.ctrlKey && e.key === "\\") {
    e.preventDefault()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKey)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKey)
})

const scrolTarget = () => {
  target.value?.scrollIntoView({ behavior: "smooth" })
}

onMounted(() => handleApi())
watch(search, () => {
  handleApi()
  scrolTarget()
})
</script>

<template>
  <div class="min-h-screen bg-stone-100 px-4 py-6 font-mono sm:px-6 lg:px-10">
    <div
      class="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 items-center gap-2 rounded-md border border-b-4 p-3 shadow-sm backdrop-blur-lg sm:top-5 sm:gap-3 sm:p-4"
    >
      <Search class="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      <input
        ref="inputRef"
        v-model="search"
        class="w-full bg-transparent text-base outline-none"
        type="text"
        placeholder="Cari menu resep"
      />
      <p class="hidden whitespace-nowrap text-xs text-stone-400 sm:block">Ctrl + \</p>
    </div>

    <p ref="target"></p>

    <div v-if="!data || data.length === 0" class="mx-auto mt-28 flex w-full max-w-3xl items-center gap-3 sm:mt-32">
      <p>Loading</p>
      <LoaderCircle class="animate-spin text-stone-500" />
    </div>

    <div class="mx-auto mt-28 flex w-full max-w-3xl flex-col gap-8 sm:mt-32">
      <div
        v-for="recipe in data"
        :key="recipe.id"
        class="rounded-xl border border-b-8 bg-white p-4 shadow-sm sm:p-6"
      >
        <h1 class="text-xl font-bold leading-tight sm:text-2xl"># {{ recipe.name }}</h1>

        <div class="mt-4">
          <img
            :src="recipe.image"
            :alt="recipe.name"
            class="h-auto w-full max-w-xs rounded-xl border border-b-8 object-cover"
          />
        </div>

        <div class="mb-3 mt-5 flex items-center gap-3">
          <Store class="h-5 w-5" />
          <h2 class="text-sm font-semibold uppercase tracking-wide sm:text-base">Ingredients</h2>
        </div>

        <div v-for="ingredient in recipe.ingredients" :key="ingredient" class="mb-1">
          <p class="break-words text-sm sm:text-base">• {{ ingredient }}</p>
        </div>

        <div class="mb-3 mt-5 flex items-center gap-3">
          <ChefHat class="h-5 w-5" />
          <h2 class="text-sm font-semibold uppercase tracking-wide sm:text-base">Instructions</h2>
        </div>

        <div v-for="(instruction, index) in recipe.instructions" :key="`${recipe.id}-${index}`" class="mb-2 flex items-start gap-3">
          <SquareCheckBig class="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          <p class="max-w-none break-words text-sm leading-relaxed sm:text-base">{{ instruction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



