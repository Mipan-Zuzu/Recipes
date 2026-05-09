import Home from "../components/Home.vue"
import About from "../components/About.vue"
import "../style.css"

import ErrorElement from "../components/Error/Error.vue"

import {createWebHistory, createRouter} from "vue-router"

const routes = [
    {
        path: "/:pathMatch(.*)*",
        component: ErrorElement
    },
    {
        path: "/",
        component: Home
    },
    {
        path: "/about",
        component: About
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})