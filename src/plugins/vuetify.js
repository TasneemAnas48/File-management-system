
import 'font-awesome/css/font-awesome.min.css'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ar from 'vuetify/lib/locale/ar'
Vue.use(Vuetify);

Vue.component('my-component', {
    methods: {
        changeLocale() {
            this.$vuetify.lang.current = 'ar'
        },
    },
})

export default new Vuetify({
    lang: {
        locales: { ar, },
        current: 'ar',
    },
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        light: true,
        themes: {
            light: {
                primary: '#0a66c2',
                accent: '#0a66c2',
            }
        }
    }
});
