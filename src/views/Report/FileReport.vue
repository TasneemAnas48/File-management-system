<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        تقرير الملف {{file_id}}
                        <b-button class="button-view" @click="routeToPrint">طباعة التقرير</b-button>
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
                { text: 'اسم الملف', value: 'file_name', align: 'center', },
                { text: 'العملية', value: 'operation', align: 'center', },
                { text: 'اسم المستخدم ', value: 'user_name', align: 'center', },
                { text: 'التاريخ ', value: 'date', align: 'center', },
            ],
            rows: [],
            status: 'OK',
            username: '',
            role: '',
            user_id: null,
            file_id: null,

        };
    },

    methods: {
        routeToPrint(){
            this.$router.replace({ name: 'print-report', params: {id: this.file_id} })
        },
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/RepotFiles/" + this.file_id,
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    this.status = res.statusText
                    this.rows = res.data.data
                    console.log(res.data.data)
                });
        }
    },
    mounted() {
        this.file_id = this.$route.params.id
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
