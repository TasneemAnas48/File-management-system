<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        ملفاتي
                        <div class="d-flex justify-content-end ">
                            <router-link to="/file/check-in" style="margin-left: 10px">
                                <b-button class="button-view">حجز عدة ملفات</b-button>
                            </router-link>
                            <router-link to="/file/create">
                                <b-button class="button-view">إنشاء ملف</b-button>
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
                            <template v-slot:top>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-spacer></v-spacer>
                                        <v-card-title class="justify-content-center" style="padding-top: 30px">هل انت
                                            متأكد من انك تريد حذف الملف؟
                                        </v-card-title>
                                        <v-card-actions style="padding-bottom: 30px">
                                            <v-spacer></v-spacer>
                                            <v-btn color="var(--gray-medium)" text @click="closeDelete">لا تراجع
                                            </v-btn>
                                            <v-btn color="red" text @click="deleteItemConfirm">نعم تأكيد
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogYes" max-width="500px">
                                <v-card>
                                    <v-spacer></v-spacer>
                                    <v-card-title class="justify-content-center" style="padding-top: 30px"> 
                                        تم حذف الملف بنجاح
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
                                        لا يمكنك حذف الملف لانه محجوزة من قبل مستخدم اخر
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
                            <template v-slot:[`item.delete`]="{ item }">
                                <b-button class="button-delete" @click="deleteItem(item)" v-if="item.status == 'حر'"> حذف  </b-button>
                            </template>
                            <template v-slot:[`item.check_in`]="{ item }">
                                <b-button class="button-in" @click="inItem(item)" v-if="item.status == 'حر'"> حجز  </b-button>
                            </template>
                            <template v-slot:[`item.check_out`]="{ item }">
                                <b-button class="button-out" @click="outItem(item)" v-if="(username == item.user_name)"> الغاء حجز  </b-button>
                            </template>
                            <template v-slot:[`item.read`]="{ item }">
                                <b-button class="button-read" @click="read(item)"  v-if="item.status == 'حر'"> قراءة  </b-button>
                            </template>
                            <template v-slot:[`item.edit`]="{ item }">
                                <b-button class="button-edit" @click="edit(item)"  v-if="item.status == 'حر'"> تعديل  </b-button>
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
                { text: 'حالة الملف', value: 'status', align: 'center', },
                { text: 'المستخدم الذي حجز الملف', value: 'user_name', align: 'center', },
                { text: 'حذف', value: 'delete', align: 'center', },
                { text: 'حجز', value:'check_in', align: 'center', },
                { text: 'الغاء حجز', value: 'check_out', align: 'center', },
                { text: 'قراءة', value: 'read', align: 'center', },
                { text: 'تعديل', value: 'edit', align: 'center', },
            ],
            rows: [],
            status: '',
            dialogDelete: false,
            editedIndex: -1,
            delete: '',
            dialogYes: false,
            dialogNo: false,
            username:''
        };
    },

    methods: {
        inItem(item){
            const token = localStorage.getItem("token")
            const id = localStorage.getItem("id")
            console.log(token)
            this.axios.post("http://" + this.$store.state.ip + "api/file/check_in/" + item.id +"/"+id,
                { headers: { 'Authorization': `Bearer ${token}` , 'Accept' : 'application/json' } })
                .then((res) => {
                    console.log(res)
                    this.getData()
                })
        },
        outItem(item){
            const token = localStorage.getItem("token")
            const id = localStorage.getItem("id")
            // console.log(token)
            this.axios.post("http://" + this.$store.state.ip + "api/file/check_out/" + item.id +"/"+id,
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    console.log(res)
                    this.getData()
                })
        },
        deleteItem(item) {
            this.editedIndex = this.rows.indexOf(item)
            this.delete = item
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.sendIdDeleted()
            this.closeDelete()
        },
        closeDelete() {
            this.dialogDelete = false
        },
        sendIdDeleted() {
            const token = localStorage.getItem("token")
            this.axios.delete("http://" + this.$store.state.ip + "api/file/" + this.delete.id,
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.status == "success"){
                        this.dialogYes = true
                        this.rows.splice(this.editedIndex, 1)
                    }
                    else if (res.data.status == "error")
                        this.dialogNo = true
                })
        },
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/file", 
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    this.status = res.statusText
                    this.rows = res.data.data
                    console.log(res)
                });
        }
    },
    mounted() {
        this.getData()
        this.username = localStorage.getItem("name")
        // console.log(this.username)
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

.view .button-read {
    border-radius: 20px !important;
    background-color: #f7e5f3 !important;
    font-size: 15px !important;
    border: none !important;
    color: #ac2389 !important;
    margin-right: 10px
}
.view .button-read:hover {
    background-color: #ac2389 !important;
    color: white !important;
}

.view .button-edit {
    border-radius: 20px !important;
    background-color: #fff3e4 !important;
    font-size: 15px !important;
    border: none !important;
    color: #e2730c !important;
    margin-right: 10px
}
.view .button-edit:hover {
    background-color: #e2730c !important;
    color: white !important;
}
</style>
