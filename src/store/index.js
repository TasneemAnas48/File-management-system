import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ip:'192.168.1.104:8000/',
        id: '',
        name: '',
        email:'',
        token:'',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
});
