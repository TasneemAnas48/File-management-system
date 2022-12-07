import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ip:'192.168.43.244:8000/',
        id: '',
        name: '',
        email:'',
        token:'',
        role:'',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
});
