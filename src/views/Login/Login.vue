<template>
    <div class="login">
        <div class="side-left col-lg-4 d-none d-lg-block">
            <div class="image">
                <img src="../../assets/img/login.png" class="img-thumbnail img" />
            </div>
        </div>
        <div class="side-right col-lg-9 ">
            <div class="top-button">
                    <div class="button-add create button-login" >أهلا بعودتك، </div>
                    <div class="button-add create button-login" > الرجاء قم بإدخال بياناتك</div>
            </div>
            
            <v-app>
                <form class="form-input" style="margin-top: -35px;">

                    <div class="form-row" style="justify-content: center;margin-top: 100px">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="name" class="col-lg-3 label-input"> اسم المستخدم</label>
                            <b-form-input class="col-lg-6 col-md-11 input-field" v-model.trim="name"
                                name="name" type="text" style="padding-left: 30px;"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.name.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{v$.name.$errors[0].$message}}</span>
                            </v-tooltip>
                            <v-tooltip color="error" right v-if="!valid_name">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span> اسم المستخدم غير موجود </span>
                            </v-tooltip>
                        </div>
                    </div> 


                    <div class="form-row" style="justify-content: center;">
                        <div class="my-input col-lg-12 row" style="margin-top: -12px">
                            <label for="password" class="col-lg-3 label-input">كلمة المرور</label>
                            <b-form-input class="col-lg-6  col-md-11 input-field" v-model="password"
                                name="password" type="password"></b-form-input>
                            <v-tooltip color="error" right v-if="v$.password.$error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>{{v$.password.$errors[0].$message}}</span>
                            </v-tooltip>
                            <v-tooltip color="error" right v-if="!validate_">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                                        mdi-exclamation
                                    </v-icon>
                                </template>
                                <span>كلمة المرور غير صحيحة </span>
                            </v-tooltip>
                        </div>
                    </div> 

                    <div class="buttons form-row " style="margin-top:50px;justify-content: flex-end;margin-left: 40px;">
                        <router-link to="/register">
                            <b-button type="button" class="button-add" style="margin-left: 25px;">
                                <font-awesome-icon icon="fas fa-arrow-right" class="icon-button-right" />إنشاء حساب 
                            </b-button>
                        </router-link>
                        <b-button type="button" class="button-add" v-on:click="submitForm" style="margin-left: 55px;">
                            <font-awesome-icon icon="fas fa-arrow-left" class="icon-button-left" />تسجيل دخول
                        </b-button>
                        
                    </div>
                </form>
            </v-app>
        </div>
    </div>
</template>


<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
    name: "Login",
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            valid_name: true,
            name:'',
            password:'',
            validate_: true,

        };
    },
    validations () {
        return {
            name: { required: helpers.withMessage('هذا الحقل مطلوب', required) },
            password: {  required: helpers.withMessage('هذا الحقل مطلوب', required) },
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
            formData.append('username', this.name)
            formData.append('password', this.password)
            this.axios.post("http://"+this.$store.state.ip+"api/login", formData)
                .then((res) => {
                    console.log(res.data)
                    if (res.status == 200){
                        this.addtoStore(res.data.token, res.data.user.id, res.data.user.username, res.data.user.email, res.data.user.role)
                        this.addlocalStorage(res.data.token, res.data.user.id, res.data.user.username, res.data.user.email, res.data.user.role)
                        this.$router.replace({ name: 'file' })
                    }
                })
        },
        addtoStore(token, id, name, email, role){
            this.$store.state.token = token
            this.$store.state.id = id
            this.$store.state.name = name
            this.$store.state.email = email
            this.$store.state.role = role
        },
        addlocalStorage(token, id, name, email, role){
            localStorage.setItem("token", token)
            localStorage.setItem("id", id)
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("role", role)
        }
    },
};
</script>

<style lang="scss">
@import '@/assets/css/Login/Login.css';
</style>

