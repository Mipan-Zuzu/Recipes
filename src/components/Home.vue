<script setup>
import { onMounted, ref, reactive, watch } from "vue"
import { TicketPercent, CreditCard, X } from '@lucide/vue';
import axios from "axios"

const data = ref()
const show = ref(false)

onMounted(() => {
    const handleApi = async () => {
        const res = await axios.get("https://dummyjson.com/carts", {
            withCredentials: true
        })
        data.value = res.data.carts
        console.log(data.value);
    }
    handleApi()
})
</script>

<template>
    <div v-for="datas in data" class="flex justify-center mb-10 mt-10">
        <div :key="datas.id" class=" bg-stone-300 p-22 rounded-xl shadow-2xl border border-b-4">
            <div class="ml-22">
                <div class="flex gap-3">
                <p class="bg-stone-600 w-10 h-10 rounded-full -mt-3 text-center text-stone-300">U</p>
                <h1>User {{ datas.id }}</h1>
            </div>
            <p class="flex gap-5">
                <TicketPercent />
                {{ datas.discountedTotal }} %
            </p>
            <p class="flex gap-5">
                <CreditCard />
                <h1>USD</h1>
                {{ datas.total }}
            </p>
            </div>
            <div class="flex flex-col sm:flex-row bg-stone-400 p-14 mt-5 rounded-xl gap-5 shadow-2xl">
                <div v-for="prod in datas.products">
                    <img :src="prod.thumbnail" alt="">
                <div class="text-center">
                    <p class="font-mono font-bold text-3xl text-stone-200">{{ prod.title }}</p>
                <p class="font-mono font-bold text-sm text-stone-600"><span>USD $</span>{{ prod.price }}</p>
                <div class="flex gap-2 text-center items-center justify-center">
                    <p class="text-sm font-mono bg-black text-stone-50 px-2 p-1 rounded-md">SubTotal ${{ prod.total }}</p>
                    <p class="-mt-2">
                        <p class="font-mono font-bold">X{{ prod.quantity }}</p>
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>