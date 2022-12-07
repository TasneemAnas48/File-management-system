<template>
    <div class="body-page view view-group" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        جميع المجموعات
                        <div class="d-flex justify-content-end ">
                            <router-link to="/group" style="margin-left:15px">
                                <b-button class="button-view">مجموعاتي </b-button>
                            </router-link>

                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <v-app>
                        <v-card-title class="search">
                            <b-form-input v-model="search" class="col-lg-3 input-field" label="Search"
                                placeholder="ابحث" append-icon="mdi-magnify" single-line hide-details>
                            </b-form-input>
                        </v-card-title>
                        <v-data-table class="col-lg-12 my-table" :headers="headers" :items="rows" :search="search"
                            :page.sync="page" @page-count="pageCount = $event" :hide-default-footer="true"
                            v-if="status == 'OK'">
                            <template v-slot:[`item.mangement`]="{ item }">
                                <b-button class="button-display" @click="routeToFile(item)"> عرض الملفات </b-button>
                            </template>
                        </v-data-table>
                        <div v-else>
                            <v-progress-circular :size="70" :width="7" color="var(--main-color)" indeterminate
                                style="margin-top: 100px; margin-bottom: 150px;">
                            </v-progress-circular>
                        </div>
                        <div class="text-center">
                            <v-pagination color=var(--main-color) v-model="page" :length="pageCount" circle>
                            </v-pagination>
                        </div>
                    </v-app>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "AllGroup",

    data() {
        return {
            page: 1,
            pageCount: 0,
            search: '',
            headers: [
                { text: 'رقم المجموعة', value: 'id', align: 'center', },
                { text: 'اسم المجموعة', value: 'name', align: 'center', },
                // { text: 'عدد الملفات ', value: 'status', align: 'center', },
                // { text: ' تاريخ الانشاء', value: 'user', align: 'center', },
                { text: 'إدارة', value: 'mangement', align: 'center', },
            ],
            rows: [],
            status: '',
            temp: [],
        };
    },

    methods: {
        routeToFile(item){
            this.$router.replace({ name: 'all-group-file', params: {id: item.id} })
        },

        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://"+this.$store.state.ip+"api/collection/show_all_collection", { headers: {'Authorization': `Bearer ${token}`}})
                .then(res => {
                    this.status = res.statusText
                    this.rows = res.data
                    console.log(res.data)
                });
        }
    },
    mounted() {
        this.getData()
    },

};
</script>

<style lang="scss">
@import '@/assets/css/Main/View.css';

</style>
