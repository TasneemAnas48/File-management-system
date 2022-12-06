<template>
    <div class="login register">
        <div class="side-left col-lg-4 d-none d-lg-block">
            <div class="image">
                <img src="../../assets/img/login.png" class="img-thumbnail img" />
            </div>
        </div>
        <div class="side-right col-lg-9 ">
            <div class="top-button">
                <div class="button-add create button-login">إنشاء حساب جديد </div>
            </div>

            <v-app>
                <form class="form-input" style="margin-top: -35px;">


                    <div class="form-row" style="justify-content: center;margin-top: 100px">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="email" class="col-lg-3 label-input">البريد الالكتروني</label>
                            <b-form-input class="col-lg-6 input-field" v-model="email" name="email" type="email"
                                style="padding-left: 30px;"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.email.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{ v$.email.$errors[0].$message }}</span>
                            </v-tooltip>
                            <v-tooltip color="error" right v-if="!valid_email">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>هذا الايميل موجود مسبقا</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <div class="form-row" style="justify-content: center;">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="full_name" class="col-lg-3 label-input"> الاسم الكامل </label>
                            <b-form-input class="col-lg-6 col-md-11 input-field" v-model="full_name" name="full_name"
                                type="text" style="padding-left: 30px;"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.full_name.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{ v$.full_name.$errors[0].$message }}</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <div class="form-row" style="justify-content: center;">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="username" class="col-lg-3 label-input"> اسم المستخدم</label>
                            <b-form-input class="col-lg-6 col-md-11 input-field" v-model="username" name="username"
                                type="text" style="padding-left: 30px;"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.username.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{ v$.username.$errors[0].$message }}</span>
                            </v-tooltip>
                            <v-tooltip color="error" right v-if="!valid_username">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>اسم المستخدم موجود مسبقا</span>
                            </v-tooltip>
                        </div>
                    </div>


                    <div class="form-row" style="justify-content: center;">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="password" class="col-lg-3 label-input">كلمة المرور</label>
                            <b-form-input class="col-lg-6  col-md-11 input-field" v-model="password" name="password"
                                type="password"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.password.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{ v$.password.$errors[0].$message }}</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <div class="form-row" style="justify-content: center;">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="confrim-password" class="col-lg-3 label-input">تأكيد كلمة المرور</label>
                            <b-form-input class="col-lg-6  col-md-11 input-field" v-model="confrim"
                                name="confrim-password" type="password"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.confrim.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{v$.confrim.$errors[0].$message}}</span>
                            </v-tooltip>
                    
                        </div>
                    </div>

                    <div class="buttons form-row " style="margin-top:50px;justify-content: flex-end;margin-left: 40px;">
                        <b-button type="button" class="button-add" v-on:click="submitForm" style="margin-left: 55px;">
                            <font-awesome-icon icon="fas fa-arrow-left" class="icon-button-left" /> إنشاء حساب
                        </b-button>
                    </div>

                    <template>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-spacer></v-spacer>
                                <v-card-title class="justify-content-center" style="padding-top: 30px;font-size:20px">
                                    لقد تم إنشاء الحساب بنجاح
                                </v-card-title>
                                <v-card-actions style="padding-bottom: 30px">
                                    <v-spacer></v-spacer>
                                    <router-link to="/login">
                                        <v-btn color="var(--main-color)" text style="letter-spacing: 0px;">
                                            تسجيل دخول
                                        </v-btn>
                                    </router-link>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </form>
            </v-app>
        </div>
    </div>
</template>


<script>
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'


export default {
    name: "Register",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            valid_username: true,
            valid_email:true,
            full_name: '',
            username:'',
            password: '',
            email:'',
            confrim:'',
            dialog: false,
        };
    },
    validations() {
        return {
            full_name: {  required: helpers.withMessage('هذا الحقل مطلوب', required) },
            username: {  required: helpers.withMessage('هذا الحقل مطلوب', required) },
            email: {  required: helpers.withMessage('هذا الحقل مطلوب', required),
                        email: helpers.withMessage('يجب ادخال عنوان بريد الكتروني صحيح', email) },
            password: {  required: helpers.withMessage('هذا الحقل مطلوب', required),
                            minLength: helpers.withMessage('يجب ان تتكون كلمة السر من 8 رموز على الاقل', minLength(8)) },
            confrim: {  required: helpers.withMessage('هذا الحقل مطلوب', required),
                        sameAs: helpers.withMessage('تأكيد كلمة السر غير صحيح', sameAs(this.password)) },
        }
    },

    methods: {
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.initData()
            }
        },
        initData(){
            const formData = new FormData()
            formData.append('name', this.full_name)
            formData.append('username', this.username)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('password_confirmation', this.confrim)
            this.axios
                .post("http://"+this.$store.state.ip+"api/register", formData)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200)
                        this.dialog = true
                })
        }

    },
};
</script>

<style lang="scss">
@import '@/assets/css/Login/Login.css';
@media (min-width: 992px) {
    .login {
        height: 800px !important;
    }
}
</style>

