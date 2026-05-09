<script setup>
import axios from "axios"
import { onMounted, ref, reactive, onBeforeUnmount, watch,computed } from "vue"
import { SquareCheckBig, ChefHat, Store, Search, LoaderCircle } from '@lucide/vue';

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
        target.value.scrollIntoView({behavior: "smooth"})
}


onMounted(() => handleApi())
watch(search, () => {
        handleApi()
        scrolTarget()
        console.log(data.value)
})

</script>

<template>
        <div class="bg-stone-100 min-h-screen flex flex-col justify-center items-center font-mono">
                <div class="flex gap-3 border border-b-4 px-14 p-3 rounded-md fixed top-5 z-50 backdrop-blur-lg">
                        <Search />
                        <input ref="inputRef" v-model="search" class="outline-none" type="text" placeholder="Cari menu resep">
                        <p class="text-stone-400">Ctrl + \</p>
                </div>
                <p ref="target"></p>
                <div v-if="!data || data.length === 0" class="flex gap-3">
                        <p>Loading</p>
                        <LoaderCircle class="text-stone-500 animate-spin"/>
                </div>
                <div v-for="recipe in data" class="mt-32">
                        <div :key="recipe.id" class="items-center">
                                <h1 class="text-2xl font-bold"># {{ recipe.name }}</h1>
                                <div>
                                        <img :src="recipe.image" alt="" class="w-52 rounded-xl border border-b-8">
                                </div>
                                <div class="flex gap-4 mt-3 mb-3">
                                        <Store />
                                        <h1>ingredients</h1>
                                </div>
                                <div v-for="ingredients in recipe.ingredients" class="flex gap-2">
                                        <p>• {{ ingredients }}</p>
                                </div>
                                <div class="flex gap-3 mt-3 mb-3">
                                        <ChefHat />
                                        <h1>instructions</h1>
                                </div>
                                <div v-for="instructions in recipe.instructions" class="flex gap-4">
                                        <SquareCheckBig />
                                        <p class="w-90">{{ instructions }}</p>
                                </div>
                        </div>
                </div>
        </div>
</template>