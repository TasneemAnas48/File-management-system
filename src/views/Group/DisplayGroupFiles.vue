<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        ملفات المجموعة {{ collection_id }}
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
                                <v-dialog v-model="dialogDelete" max-width="600px">
                                    <v-card>
                                        <v-spacer></v-spacer>
                                        <v-card-title class="justify-content-center" style="padding-top: 30px">
                                            هل انت متأكد من انك تريد حذف الملف من هذه المجموعة
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
                                            تم حذف الملف من المجموعة بنجاح
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
                                            لا يمكن حذف هذا الملف
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
                            <template v-slot:[`item.mangement`]="{ item }">
                                <font-awesome-icon icon="fa fa-trash" class="fa-trash" @click="deleteItem(item)" />
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
                { text: 'ادارة', value: 'mangement', align: 'center', },
            ],
            rows: [],
            status: '',
            name: '',
            files: [],
            file_id: null,
            dialog: false,
            collection_id: null,
            dialogDelete: false,
            editedIndex: -1,
            delete: '',
            dialogYes: false,
            dialogNo: false
        };
    },
    validations() {
        return {
            file_id: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
        }
    },

    methods: {
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
            this.axios.get("http://" + this.$store.state.ip + "api/collection/all_file_not_in_collection/"+ this.collection_id , { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.files = this.filterFile(res.data)
                    // console.log(this.files)
                    // console.log(res.data)
                });
        },
        filterFile(list){
            const user_id = localStorage.getItem("id")
            return list.filter( item => {
                return item.owner_id == user_id
            })
        },
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/show_my_collection_file/" + this.collection_id , { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.status = res.statusText
                    this.rows = res.data
                    console.log(this.rows)
                });
        }
    },
    mounted() {
        this.collection_id = this.$route.params.id
        this.getData()
        this.getFiles()
    },
    components: {
    },
};
</script>

<style lang="scss">
@import '@/assets/css/Main/View.css';

.v-input__slot {
    border: 1px solid #ced4da;
    background: white !important;
    border-radius: 30px !important;
    height: 45px !important;
    box-shadow: none !important;
    min-height: 45px !important;
}
</style>
