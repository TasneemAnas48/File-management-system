<template>
    <div>
        <nav class="navbar">
            <div class="container-fluid">
                <div class="right row">
                    <div class="dropdown">
                        <font-awesome-icon icon="fas fa-user" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div>
                                <b-card-text style="margin-top:0px">
                                    <div class="row" style=" justify-content: center; margin-top:30px">
                                        <img :src="profileImg" />
                                    </div>
                                    <div class="row" style=" justify-content: center;margin-top:30px">
                                        <h5 style="color: var(--main-color)">{{ name }}</h5>
                                    </div>
                                    <div class="row" style=" justify-content: center;margin-top:10px">
                                        <h6>{{ email }}</h6>
                                    </div>
                                </b-card-text>
                                <b-dd-divider></b-dd-divider>
                                <b-card-text class="item" style="margin:0px" @click="log_out">
                                    <!-- <router-link to="/"> -->
                                        <div class="row" style="color:var(--gray-medium);align-items: center;font-size:17px;cursor: pointer;">
                                            <font-awesome-icon icon="fa fa-sign-out" style="margin:20px"/>
                                            <div>تسجيل خروج</div>
                                        </div>
                                    <!-- </router-link> -->
                                </b-card-text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    props: {
        profileImg: {
            type: String,
            default: require("@/assets/img/images.png"),
        },
    },
    data() {
        return {
            name: '',
            email: '',
            messages: 0,
            notification: null,
            notification_data: [],
        }
    },
    methods:{
        log_out(){
            console.log("Log out")
            localStorage.setItem("id", '')
            localStorage.setItem("name", '')
            localStorage.setItem("email", '')
            localStorage.setItem("token", '')
            this.$router.replace({ name: 'login'})
        },
    },
    mounted(){
        this.name = localStorage.getItem("name")
        this.email = localStorage.getItem("email")
    }

};
</script>

<style lang="scss">
@import '@/assets/css/Main/Navbar.css';
</style>

