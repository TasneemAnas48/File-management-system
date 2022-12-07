<template>
    <div class="body-page view" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        مستخدمي المجموعة {{collection_id}} 
                        <b-button class="button-view" @click="dialog = true">إضافة مستخدم</b-button>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-spacer></v-spacer>
                                <v-card-title style="color:var(--main-color)">
                                    إضافة مجموعة
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-container>
                                        <label for="user_id"
                                            style="text-align:right;margin-top: 10px;margin-bottom: 20px"
                                            class="label-input row">اسم المستخدم</label>
                                        <v-select class="input-field row" :items="users" item-text="username"
                                            item-value="id" v-model="user_id" dense solo></v-select>
                                        <v-tooltip color="error" right v-if="v$.user_id.$error">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                    mdi-exclamation
                                                </v-icon>
                                            </template>
                                            <span>{{ v$.user_id.$errors[0].$message }}</span>
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
                                            هل انت متأكد من انك تريد حذف المستخدم من هذه المجموعة
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
                                            تم حذف المستخدم بنجاح
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
                                            لا يمكن حذف هذا المستخدم لانه حاجز ملفات ضمن المجموعة
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
                { text: 'رقم المستخدم', value: 'id', align: 'center', },
                { text: 'اسم المستخدم', value: 'username', align: 'center', },
                { text: 'ادارة', value: 'mangement', align: 'center', },
            ],
            rows: [],
            status: '',
            name: '',
            users: [],
            user_id: null,
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
            user_id: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
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
            const token = localStorage.getItem("token")
            this.axios.post("http://" + this.$store.state.ip + "api/collection/delete_user_from_collection",
                { 
                    collection_id : this.collection_id,
                    user_id: this.delete.id
                },
                { 
                    headers: { 'Authorization': `Bearer ${token}` } 
                })
                .then((res) => {
                    console.log(res)
                    if (res.data == 'yse')
                        {
                            this.dialogYes = true
                            this.rows.splice(this.editedIndex, 1)
                        }
                    else if (res.data == 'no')
                        this.dialogNo = true
                    // console.log(this.delete.id)
                })
        },
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error)
                this.addUser()
        },
        addUser() {
            const formData = new FormData()
            formData.append('collection_id', this.collection_id)
            formData.append('user_id', this.user_id)
            const token = localStorage.getItem("token")
            this.axios.post("http://" + this.$store.state.ip + "api/collection/add_user_to_collection", formData, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        this.dialog = false
                        this.getData()
                    }
                })
        },
        getUsers() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/show_all_users_not_in_collection/" + this.collection_id, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.users = res.data
                    // this.status = res.statusText
                    // console.log(this.users)
                });
        },

        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://" + this.$store.state.ip + "api/collection/show_all_users_in_collection/"+ this.collection_id, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.status = res.statusText
                    this.rows = res.data
                    // this.status = res.statusText
                    console.log(this.rows)
                });
        }
    },
    mounted() {
        this.collection_id = this.$route.params.id
        this.getData()
        this.getUsers()

    },
    components: {
    },
};
</script>

<style lang="scss">
@import '@/assets/css/Main/View.css';

.v-input__slot {
    background: white !important;
    border-radius: 30px !important;
    height: 45px !important;
    box-shadow: none !important;
    min-height: 45px !important;
}
</style>
