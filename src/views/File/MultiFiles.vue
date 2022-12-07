<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        حجز عدة ملفات
                        <b-button class="button-view" @click="checkIn" v-if="(files.length != 0)"> حجز {{files.length}}</b-button>
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
                            <template v-slot:top>
                                <v-dialog v-model="dialogYes" max-width="500px">
                                <v-card>
                                    <v-spacer></v-spacer>
                                    <v-card-title class="justify-content-center" style="padding-top: 30px"> 
                                        تم حجز الملفات بنجاح
                                    </v-card-title>
                                    <v-card-actions style="padding-bottom: 30px">
                                        <v-spacer></v-spacer>
                                        <v-btn color="var(--main-color)" text @click="(dialogYes = false)">موافق 
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogNo" max-width="500px">
                                <v-card>
                                    <v-spacer></v-spacer>
                                    <v-card-title class="justify-content-center" style="padding-top: 30px"> 
                                        لا يمكنك حجز الملفات لانها محجوزة من قبل مستخدم اخر
                                    </v-card-title>
                                    <v-card-actions style="padding-bottom: 30px">
                                        <v-spacer></v-spacer>
                                        <v-btn color="var(--main-color)" text @click="(dialogNo = false)">موافق 
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            </template>
                            <template v-slot:[`item.status_id`]="{ item }">
                                <div v-if="(item.status_id == 1)"> حر</div>
                                <div v-else-if="(item.status_id == 2)"> محجوز</div>
                            </template>
                            <template v-slot:[`item.user`]="{ item }">
                                <div v-if="item.status == 'محجوز'"> {{item.user}}</div>
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
                { text: 'حالة الملف', value: 'status_id', align: 'center', },
                { text: 'المستخدم الذي حجز الملف', value: 'user', align: 'center', },
            ],
            rows: [],
            status: '',
            files: [],
            dialogYes: false,
            dialogNo: false,
        };
    },

    methods: {
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/all_file_to_reserve", 
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    this.status = res.statusText
                    this.rows = res.data
                    console.log(res.data)
                })
        },
        checkIn(){
            this.files =  this.files.map(x => x.id)
            console.log(this.files)

            const token = localStorage.getItem("token")
            this.axios.post("http://"+this.$store.state.ip+"api/file/check_many_files", 
            {
                ids: this.files
            }, 
            { headers: {'Authorization': `Bearer ${token}`}})
                .then((res) => {
                    console.log(res)
                    if (res.status == 200)
                        this.dialogYes = true
                    else
                        this.dialogNo = true
                    this.getData()
                    this.files=[]
                })
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
