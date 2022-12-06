<template>
    <div class="body-page view view-group" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center add">
                        مجموعاتي
                        <div class="d-flex justify-content-end ">
                            <router-link to="/group/all" style="margin-left:15px">
                                <b-button class="button-view">جميع المجموعات</b-button>
                            </router-link>
                            <!-- <router-link to="/group/create"  > -->
                                <b-button class="button-view" @click="dialog=true">إنشاء مجموعة</b-button>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <v-card>
                                        <v-spacer></v-spacer>
                                        <v-card-title style="color:var(--main-color)">
                                            إنشاء مجموعة
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-container>
                                                <label for="name" style="text-align:right;margin-top: 10px;margin-bottom: 20px"
                                                            class="label-input row">اسم المجموعة</label>
                                                    <b-form-input class="input-field row" v-model="name"
                                                        name="name" type="text" style="padding-left: 30px;"></b-form-input>
                                                    <v-tooltip color="error" right v-if="v$.name.$error">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                                mdi-exclamation
                                                            </v-icon>
                                                        </template>
                                                        <span>{{ v$.name.$errors[0].$message }}</span>
                                                    </v-tooltip>
                                                    </v-container>
                                        </v-card-text>
                                        <v-divider></v-divider>

                                        <v-card-actions style="padding-bottom: 30px">
                                            <v-spacer></v-spacer>
                                            <v-btn @click="submitForm" color="var(--main-color)" text style="letter-spacing: 0px;font-size:17px">
                                            إنشاء
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            <!-- </router-link> -->
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
                                        متأكد من انك تريد حذف المجموعة؟
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
                                        تم حذف المجموعة بنجاح
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
                                        لا يمكنك حذف المجموعة بسبب وجود فيها ملفات محجوزة من قبل مستخدين اخرين
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
                                <b-button class="button-delete"  @click="deleteItem(item)"> حذف المجموعة </b-button>
                                <b-button class="button-display" @click="routeToFile(item)"> إدارة الملفات </b-button>
                                <b-button class="button-manage" @click="routeToUsers(item)"> إدارة المستخدمين </b-button>
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
                { text: 'رقم المجموعة', value: 'id', align: 'center', },
                { text: 'اسم المجموعة', value: 'name', align: 'center', },
                // { text: 'عدد الملفات ', value: 'status', align: 'center', },
                // { text: ' تاريخ الانشاء', value: 'user', align: 'center', },
                { text: 'إدارة', value: 'mangement', align: 'center', },
            ],
            rows: [],
            status: 'OK',
            dialog: false,
            name:'',
            dialogDelete:false,
            editedIndex: -1,
            delete: '',
            dialogYes: false,
            dialogNo: false
        };
    },
    validations() {
        return {
            name: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
        }
    },

    methods: {
        routeToFile(item){
            this.$router.replace({ name: 'group-file', params: {id: item.id} })
        },
        routeToUsers(item){
            this.$router.replace({ name: 'group-user', params: {id: item.id} })
        },
        deleteItem (item) {
            this.editedIndex = this.rows.indexOf(item)
            this.delete = item
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            this.sendIdDeleted()
            this.closeDelete()
        },
        closeDelete () {
            this.dialogDelete = false
        },
        sendIdDeleted() {
            const token = localStorage.getItem("token")
            this.axios.post("http://"+this.$store.state.ip+"api/collection/destroy",
                {collection_id: this.delete.id}, 
                { headers: {'Authorization': `Bearer ${token}`}})
                .then((res) => {
                    console.log(res)
                    if (res.data == 'yes'){
                        this.dialogYes = true
                        this.rows.splice(this.editedIndex, 1)
                    }
                    else if (res.data == 'no')
                        this.dialogNo = true
                    // console.log(this.delete.id)
                })
        },
        submitForm(){
            this.v$.$validate()
            if (!this.v$.$error)
                this.addGroup()
        },
        addGroup(){
            const formData = new FormData()
            formData.append('name', this.name)
            formData.append('status', "private")
            const token = localStorage.getItem("token")
            this.axios.post("http://"+this.$store.state.ip+"api/collection/creat", formData, { headers: {'Authorization': `Bearer ${token}`}})
                .then((res) => {
                    console.log(res)
                    if (res.status == 200){
                        this.dialog = false
                        this.getData()
                    }
                })
        },
        // getId(item){
        //     console.log(item.name)
        // },
        getData() {
            const token = localStorage.getItem("token")
            this.axios.get("http://"+this.$store.state.ip+"api/collection/show_my_collection", { headers: {'Authorization': `Bearer ${token}`}})
                .then(res => {
                    this.rows = res.data
                    console.log(res.data)
                });
        }

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

.view .button-delete {
    border-radius: 20px !important;
    background-color: #ff00003b !important;
    font-size: 15px !important;
    border: none !important;
    color: #dc3545 !important;
}

.view .button-delete:hover {
    background-color: #dc3545 !important;
    color: white !important;
}

.view .button-display {
    border-radius: 20px !important;
    background-color: #dae1ff !important;
    font-size: 15px !important;
    border: none !important;
    color: #2f52ec !important;
    margin-right: 10px
}

.view .button-display:hover {
    background-color: #2f52ec !important;
    color: white !important;
}

.view .button-manage {
    border-radius: 20px !important;
    background-color: #d7f8bb !important;
    font-size: 15px !important;
    border: none !important;
    color: #589c21 !important;
    margin-right: 10px
}

.view .button-manage:hover {
    background-color: #589c21 !important;
    color: white !important;
}

.view-group .mdi-exclamation {
    position: relative !important;
    left: -194px;
    margin-right: -33px;
    z-index: 100;
    margin-top: -47px;
}
</style>
