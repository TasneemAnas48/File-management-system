<template>
    <div class="body-page create-file" id="body-page">
        <div class="body">
            <div class="card">
                <div class="card-header" >
                    <div class="d-flex justify-content-between align-items-center add">
                        إنشاء ملف
                        <router-link to="/file">
                            <b-button class="button-view">عرض ملفاتي</b-button>
                        </router-link>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <v-app>
                                <form class="form-input">
                                    <div class="form-row">
                                        <div class="my-input col-lg-12 row">
                                            <label for="name" class="col-lg-4 label-input"
                                                style="margin-left: -15px">اسم الملف</label>
                                                
                                                <b-form-input class="col-lg-8 col-md-11 col-sm-11 col-10  input-field" v-model="name"
                                                name="name" type="text" style="padding-left: 30px;"></b-form-input>
                                            <v-tooltip color="error" right v-if="v$.name.$error">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                        mdi-exclamation
                                                    </v-icon>
                                                </template>
                                                <span>{{ v$.name.$errors[0].$message }}</span>
                                            </v-tooltip>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="my-input col-lg-12 row">
                                            <label for="file" class="col-lg-4 label-input"
                                                style="margin-left: -15px">الملف</label>
                                                
                                            <v-file-input type="file" prepend-icon="mdi-paperclip "
                                                @change="onFileSelected" 
                                                class="col-lg-8 col-md-11 col-sm-11 col-10  input-field " filled color=var(--main-color)>
                                            </v-file-input>
                                            <v-tooltip color="error" right v-if="v$.file.$error">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                        mdi-exclamation
                                                    </v-icon>
                                                </template>
                                                <span>{{ v$.file.$errors[0].$message }}</span>
                                            </v-tooltip>
                                        </div>
                                    </div>

                                    <!-- <div class="form-row" >
                                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                                            <label for="applied-to" class="col-lg-4  col-md-4 label-input">مجموعات</label>
                                            <v-radio-group v-model="add" column>
                                                <v-radio label="دون اضافة إلى مجموعة" value="no"></v-radio>
                                                <v-radio label="إضافة إلى المجموعة" value="yes"></v-radio>
                                                <div v-if="add == 'yes'">
                                                    <v-select multiple  v-model="selectGroup" 
                                                        class="col-lg-9 col-md-9 col-sm-11 col-11 input-field optinal"
                                                        :items="products"  item-value="product_id" item-text="product_name" color=var(--main-color) :label="selectProduct" dense chips
                                                        solo style="margin-bottom: 10px;min-width: 310px !important;">
                                                        <template v-slot:selection="{ item, index }">
                                                            <v-chip v-if="index === 0">
                                                            <span>{{ item.product_name }}</span>
                                                            </v-chip>
                                                            <span
                                                            v-if="index === 1"
                                                            class="grey--text text-caption"
                                                            >
                                                            (+{{ selectGroup.length - 1 }} others)
                                                            </span>
                                                        </template>
                                                        </v-select>
                                                    <v-tooltip color="error" right v-if="v$.selectGroup.$error">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon color="red" dark v-bind="attrs" v-on="on">
                                                                mdi-exclamation
                                                            </v-icon>
                                                        </template>
                                                        <span>{{ v$.selectGroup.$errors[0].$message }}</span>
                                                    </v-tooltip>
                                                </div>
                                                

                                            </v-radio-group>
                                        </div>
                                    </div> -->
                                    
                                    
                                    <div class="form-row float-left">
                                        <b-button type="button" class=" button-add" v-on:click="submitForm">إنشاء
                                        </b-button>
                                    </div>
                                    
                                </form>
                            </v-app>
                        </div>
                        <div class="col-lg-6 d-none d-xl-block d-lg-block">
                            <!-- <img src="../../assets/img/add_group.png" class="img-thumbnail img" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
export default {
    name: "AddGroup",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            name: '',
            file: '',
            id: '',
        };
    },
    validations() {
        return {
            name: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
            file: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
        }
    },
    methods: {
        onFileSelected(files) {
            this.file = files
            // console.log(this.file)
        },
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error)
                this.sendData()
        },
        sendData() {
            const formData = new FormData()
            formData.append('name', this.name)
            formData.append('file', this.file)
            const token = localStorage.getItem("token")
            this.axios.post("http://"+this.$store.state.ip+"api/file", formData, { headers: {'Authorization': `Bearer ${token}`}})
                .then((res) => {
                console.log(res)
                if (res.status == 200)
                    this.$router.replace({ name: 'file' })
                })
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/css/File/CreateFile.css';
</style>
