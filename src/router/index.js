import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login/Login.vue";
import Register from "../views/Register/Register.vue";
import DisplayFiles from "../views/File/DisplayFiles.vue";
import CreateFile from "../views/File/CreateFile.vue";
import DisplayGroups from "../views/Group/DisplayGroups.vue";
import DisplayGroupFiles from "../views/Group/DisplayGroupFiles.vue";
import DisplayGroupUsers from "../views/Group/DisplayGroupUsers.vue";
import AllGroup from "../views/Group/AllGroup.vue";
import MultiFiles from "../views/File/MultiFiles.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/file",
        name: "file",
        component: DisplayFiles,
    },
    {
        path: "/file/create",
        name: "file-create",
        component: CreateFile,
    },
    {
        path: "/group",
        name: "group",
        component: DisplayGroups,
    },
    {
        path: "/group/:id/files",
        name: "group-file",
        component: DisplayGroupFiles,
    },
    {
        path: "/group/:id/users",
        name: "group-user",
        component: DisplayGroupUsers,
    },
    {
        path: "/group/all",
        name: "group-all",
        component: AllGroup,
    },
    {
        path: "/file/check-in",
        name: "file-check-in",
        component: MultiFiles,
    },
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
