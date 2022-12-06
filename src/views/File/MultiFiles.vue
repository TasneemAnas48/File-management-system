<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        حجز عدة ملفات
                        <b-button class="button-view" @click="checkIn" v-if="(files.length != 0)"> حجز</b-button>
                    </div>
                </div>
                <div class="card-body">
                    <v-app>
                        <v-card-title class="search">
                            <b-form-input v-model="search" class="col-lg-3 input-field" label="Search"
                                placeholder="ابحث" append-icon="mdi-magnify" single-line hide-details>
                            </b-form-input>
                        </v-card-title>
                        <v-data-table class="col-lg-12 my-table" item-key="id" show-select v-model="files" :headers="headers" :items="rows" :search="search"
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
                { text: 'رقم الملف', value: 'id', align: 'center', },
                { text: 'اسم الملف', value: 'name', align: 'center', },
                { text: 'حالة الملف', value: 'status', align: 'center', },
                { text: 'المستخدم الذي حجز الملف', value: 'user_name', align: 'center', },
            ],
            rows: [],
            status: 'OK',
            files: [],
        };
    },

    methods: {
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/all_file_to_reserve", 
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    this.rows = res.data
                    // console.log(res.data)
                });
        },
        checkIn(){
            this.files =  this.files.map(x => x.id)
            console.log(this.files)
        },
    },
    mounted() {
        this.getData()
        
    },
    components: {
    },
};
</script>

<style lang="scss">
@import '@/assets/css/Main/View.css';

.view .button-in {
    border-radius: 20px !important;
    background-color: #dae1ff !important;
    font-size: 15px !important;
    border: none !important;
    color: #2f52ec !important;
    margin-right: 10px
}

.view .button-in:hover {
    background-color: #2f52ec !important;
    color: white !important;
}

.view .button-out {
    border-radius: 20px !important;
    background-color: #d7f8bb !important;
    font-size: 15px !important;
    border: none !important;
    color: #589c21 !important;
    margin-right: 10px
}

.view .button-out:hover {
    background-color: #589c21 !important;
    color: white !important;
}
</style>
