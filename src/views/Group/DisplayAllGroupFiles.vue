<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        ملفات المجموعة {{ collection_id }}
                        <div class="d-flex justify-content-end ">
                            <router-link to="/group/all" style="margin-left: 20px">
                                <b-button class="button-view">جميع المجموعات</b-button>
                            </router-link>
                            <b-button class="button-view" @click="dialog = true">إضافة ملف</b-button>
                            <v-dialog v-model="dialog" max-width="500px">
                                <v-card>
                                    <v-spacer></v-spacer>
                                    <v-card-title style="color:var(--main-color)">
                                        إضافة ملف
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <v-container>
                                            <label for="file_id"
                                                style="text-align:right;margin-top: 10px;margin-bottom: 20px"
                                                class="label-input row">اسم الملف</label>
                                            <v-select class="input-field row" :items="files" item-text="name"
                                                item-value="id" v-model="file_id" dense solo></v-select>
                                            <v-tooltip color="error" right v-if="v$.file_id.$error">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                        mdi-exclamation
                                                    </v-icon>
                                                </template>
                                                <span>{{ v$.file_id.$errors[0].$message }}</span>
                                            </v-tooltip>
                                        </v-container>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions style="padding-bottom: 30px">
                                        <v-spacer></v-spacer>
                                        <v-btn @click="submitForm" color="var(--main-color)" text
                                            style="letter-spacing: 0px;font-size:17px">
                                            إضافة
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
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
                            <template v-slot:[`item.user`]="{ item }">
                                <div v-if="item.status == 'محجوز'"> {{ item.user }}</div>
                            </template>
                            <template v-slot:[`item.delete`]="{ item }">
                                <b-button class="button-delete" @click="deleteItem(item)" v-if="item.status == 'حر'">
                                    حذف </b-button>
                            </template>
                            <template v-slot:[`item.check_in`]="{ item }">
                                <b-button class="button-in" @click="inItem(item)" v-if="item.status == 'حر'"> حجز
                                </b-button>
                            </template>
                            <template v-slot:[`item.check_out`]="{ item }">
                                <b-button class="button-out" @click="outItem(item)" v-if="(username == item.user) && (item.status == 'محجوز')">
                                    الغاء حجز </b-button>
                            </template>
                            <template v-slot:[`item.read`]="{ item }">
                                <a @click="read(item)" :href="url">
                                    <b-button class="button-read" v-if="item.status == 'حر'"> قراءة
                                    </b-button>
                                </a>
                            </template>
                            <template v-slot:[`item.edit`]="{ item }">
                                <b-button class="button-edit" @click="edit(item)"
                                    v-if="(item.status == 'محجوز') && (username == item.user)"> تعديل
                                </b-button>
                            </template>
                        </v-data-table>
                        <div v-else>
                            <v-progress-circular :size="70" :width="7" color="var(--main-color)" indeterminate
                                style="margin-top: 100px; margin-bottom: 150px;">
                            </v-progress-circular>
                        </div>
                        <v-dialog v-model="dialogEdit" max-width="500px">
                            <v-card>
                                <v-spacer></v-spacer>
                                <v-card-title style="color:var(--main-color)">
                                    تعديل الملف
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-container>
                                        <label for="name" style="text-align:right;margin-top: 10px;margin-bottom: 20px"
                                            class="label-input row"> الملف</label>
                                        <v-file-input type="file" prepend-icon="mdi-paperclip " @change="onFileSelected"
                                            class="col-lg-11 input-field " filled color=var(--main-color)>
                                        </v-file-input>
                                        <v-tooltip color="error" right v-if="v$.file.$error">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                    mdi-exclamation
                                                </v-icon>
                                            </template>
                                            <span>{{ v$.file.$errors[0].$message }}</span>
                                        </v-tooltip>
                                    </v-container>
                                </v-card-text>
                                <v-divider></v-divider>

                                <v-card-actions style="padding-bottom: 30px">
                                    <v-spacer></v-spacer>
                                    <v-btn @click="editFile" color="var(--main-color)" text
                                        style="letter-spacing: 0px;font-size:17px">
                                        تعديل
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
export default {
    name: "DisplayFiles",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            page: 1,
            pageCount: 0,
            search: '',
            headers: [
                { text: 'رقم الملف', value: 'id', align: 'center', },
                { text: 'اسم الملف', value: 'name', align: 'center', },
                { text: 'حالة الملف', value: 'status', align: 'center', },
                { text: 'المستخدم الذي حجز الملف', value: 'user', align: 'center', },
                { text: 'حذف', value: 'delete', align: 'center', },
                { text: 'حجز', value: 'check_in', align: 'center', },
                { text: 'الغاء حجز', value: 'check_out', align: 'center', },
                { text: 'قراءة', value: 'read', align: 'center', },
                { text: 'تعديل', value: 'edit', align: 'center', },
            ],
            rows: [],
            status: '',
            username: '',
            files: [],
            file_id: null,
            dialog: false,
            collection_id: null,
            dialogDelete: false,
            editedIndex: -1,
            delete: '',
            dialogYes: false,
            dialogNo: false,
            dialogEdit: false,
            file: '',
            edit_id: null,
            url: '',
        };
    },
    validations() {
        return {
            file_id: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
            file: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
        }
    },


    methods: {
        inItem(item) {
            const token = localStorage.getItem("token")
            const id = localStorage.getItem("id")
            // console.log(token)
            this.axios.post("http://" + this.$store.state.ip + "api/file/check_in/" + item.id + "/" + id,
                { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' } })
                .then((res) => {
                    // console.log(res)
                    this.getData()
                })
        },
        outItem(item) {
            const token = localStorage.getItem("token")
            const id = localStorage.getItem("id")
            // console.log(token)
            this.axios.post("http://" + this.$store.state.ip + "api/file/check_out/" + item.id + "/" + id,
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    // console.log(res)
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
            const user_id = localStorage.getItem("id")
            const token = localStorage.getItem("token")
            this.axios.post("http://" + this.$store.state.ip + "api/collection/delete_file_from_collection",
                {
                    collection_id: this.collection_id,
                    file_id: this.delete.id,
                    user_id: user_id
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                .then((res) => {
                    console.log(res)
                    if (res.data == true) {
                        this.dialogYes = true
                        this.rows.splice(this.editedIndex, 1)
                    }
                    else if (res.data == false)
                        this.dialogNo = true
                })
        },
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error)
                this.addFile()
        },
        addFile() {
            const user_id = localStorage.getItem("id")
            const formData = new FormData()
            formData.append('collection_id', this.collection_id)
            formData.append('file_id', this.file_id)
            formData.append('user_id', user_id)
            console.log(this.file_id)
            console.log(this.collection_id)
            const token = localStorage.getItem("token")
            this.axios.post("http://" + this.$store.state.ip + "api/collection/add_file_to_collection", formData, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        this.dialog = false
                        this.getData()
                        this.getFiles()
                    }
                })
        },
        getFiles() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/all_file_not_in_collection/" + this.collection_id, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.files = res.data
                    // console.log(res.data)
                });
        },
        onFileSelected(files) {
            this.file = files
        },
        read(item){
            let url = "http://" + this.$store.state.ip + "uploads/files/hh/" + item.name
            this.url = url
            return url
        },
        edit(item) {
            this.dialogEdit = true
            this.edit_id = item.id
        },
        editFile() {
            const formData = new FormData()
            formData.append('file', this.file)
            formData.append('id', this.edit_id)
            // const token = localStorage.getItem("token")
            // this.axios.post("http://"+this.$store.state.ip+"api/file", formData, { headers: {'Authorization': `Bearer ${token}`}})
            //     .then((res) => {
            //         console.log(res)

            //     })
        },
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/show_my_collection_file/" + this.collection_id, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.status = res.statusText
                    this.rows = res.data
                    // console.log(res)
                })
        }
    },
    mounted() {
        this.collection_id = this.$route.params.id
        this.username = localStorage.getItem("name")
        // console.log(this.username)
        this.getData()
        this.getFiles()
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
