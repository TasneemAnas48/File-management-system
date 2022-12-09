<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        تقارير
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
                            <template v-slot:[`item.report`]="{ item }">
                                <b-button class="button-display" @click="routeToReport(item)"> عرض التقرير </b-button>
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
    name: "DisplayFiles",
    data() {
        return {
            page: 1,
            pageCount: 0,
            search: '',
            headers: [
                { text: 'رقم الملف', value: 'id', align: 'center', },
                { text: 'اسم الملف', value: 'name', align: 'center', },
                { text: 'عرض التقرير', value: 'report', align: 'center', },
            ],
            rows: [],
            status: '',
            username: '',
            role: '',
            user_id: null,
        };
    },

    methods: {
        routeToReport(item){
            this.$router.replace({ name: 'report-file', params: {id: item.id} })
        },
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/all_file_to_reserve",
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    this.status = res.statusText
                    this.rows = res.data
                    console.log(res.data)
                });
        }
    },
    mounted() {
        this.role = localStorage.getItem('role')
        this.getData()
        this.username = localStorage.getItem("name")
        this.user_id = localStorage.getItem("id")
    },
    components: {
    },
};
</script>

<style lang="scss">
@import '@/assets/css/Main/View.css';
</style>
