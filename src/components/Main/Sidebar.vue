<template>
    <div class="sidebar" :class="isOpened ? 'open' : ''">
        <div class="logo-details" style="margin: 6px 14px 0 14px">
            <img v-if="menuLogo" :src="menuLogo" alt="menu-logo" class="menu-logo icon" />
            <div class="logo_name">
                <!-- {{ StoreName }} -->
            </div>
            <div v-if="isOpened">
                <font-awesome-icon icon="fa fa-angle-double-right" id="btn" @click="isOpened = !isOpened" />
            </div>
            <div v-else>
                <font-awesome-icon icon="fa fa-angle-double-left" id="btn" @click="isOpened = !isOpened" />
            </div>
        </div>

        <div class="user" style="margin-top: 15px">
            <div class="row">
                <div class="user-img">
                    <font-awesome-icon icon="fas fa-user" style="color: var(--main-color);
    font-size: 25px; margin-right: 40px;" />
                </div>
                <div id="user-info" class="user-info">
                    <p class="user-name">{{ name }}</p>
                    <p class="user-email">{{ email }}</p>
                </div>
            </div>
        </div>

        <div style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-grow: 1;
                max-height: calc(100% - 60px);
                margin-top: 10px
            ">
            <div id="my-scroll" style="margin: 0px 14px 0 14px">
                <ul class="nav-list" style="overflow: visible">
                    <span v-for="(menuItem, index) in menuItems" :key="index">
                        <li class="d-flex justify-content-center">
                            <router-link :to="menuItem.link" class="p-2">
                                <font-awesome-icon :icon="menuItem.icon" :class="menuItem.style" class="icon" />
                                <!-- <i class="bx" :class=" menuItem.icon || 'bx-square-rounded'"/> -->
                                <span class="links_name">{{
                                        menuItem.name
                                }}</span>
                            </router-link>
                            <span class="p-2 tooltip">{{
                                    menuItem.tooltip || menuItem.name
                            }}</span>
                        </li>
                    </span>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    name: "side-bar",
    props: {
        //! Menu settings
        isMenuOpen: {
            type: Boolean,
            default: false,
        },
        menuLogo: {
            type: String,
            default: "",
        },
        menuIcon: {
            type: String,
            default: "bxl-c-plus-plus",
        },
        isPaddingRight: {
            type: Boolean,
            default: true,
        },
        isDisplayBlock: {
            type: Boolean,
            default: true,
        },

        //body
        menuOpenedPaddingRightBody: {
            type: String,
            default: "272px",
        },
        menuClosedPaddingRightBody: {
            type: String,
            default: "100px",
        },

        //navbar
        menuOpenedMarginRightNavbar: {
            type: String,
            default: "290",
        },

        menuClosedMarginRightNavbar: {
            type: String,
            default: "125px",
        },

        //user info

        menuClosedUserDisplayNone: {
            type: String,
            default: "none",
        },
        menuOpenUserDisplayBlock: {
            type: String,
            default: "block",
        },

        //! Menu items
        menuItems: {
            type: Array,
            default: () => [
                // {
                //     link: "/dashboard",
                //     name: "لوحة التحكم",
                //     tooltip: "لوحة التحكم",
                //     icon: "fa fa-home",
                //     style: "home",
                // },
                // {
                //     link: "/view-stores",
                //     name: "المتاجر",
                //     tooltip: "المتاجر",
                //     icon: "fas fa-store",
                //     style: "folder",
                // },
                // {
                //     link: "/join-requests",
                //     name: "طلبات الانضمام",
                //     tooltip: "طلبات الانضمام",
                //     icon: "fas fa-user-plus",
                //     style: "tag",
                // },
                // {
                //     link: "/view-classification",
                //     name: "تصنيفات",
                //     tooltip: "تصنيفات",
                //     icon: "fa fa-sitemap",
                //     style: "percent",
                // },
                // {
                //     link: "/view-customer",
                //     name: "زبائن",
                //     tooltip: "زبائن",
                //     icon: "fas fa-users",
                //     style: "users",
                // },
                {
                    link: "/file",
                    name: "ملفات",
                    tooltip: "ملفات",
                    icon: "fa fa-file-text",
                    style: "file",
                },
                {
                    link: "/group",
                    name: "مجموعات",
                    tooltip: "مجموعات",
                    icon: "fas fa-folder",
                    style: "group",
                },
                {
                    link: "/report",
                    name: "تقارير",
                    tooltip: "تقارير",
                    icon: "fa fa-file-archive",
                    style: "report",
                },
                // {
                //     link: "/view-objection",
                //     name: "شكاوي",
                //     tooltip: "شكاوي",
                //     icon: "fas fa-exclamation-circle",
                //     style: "exclamation",
                // },
                // {
                //     link: "#",
                //     name: "مراسلات",
                //     tooltip: "مراسلات",
                //     icon: "fa fa-comments",
                //     style: "comments",
                // },
                // {
                //     link: "/setting",
                //     name: "إعدادات",
                //     tooltip: "إعدادات",
                //     icon: "fa fa-cog",
                //     style: "cog",
                // },
            ],
        },

        //! Profile detailes
        StoreName: {
            type: String,
            default: "خيط وسنارة",
        },
        profileImg: {
            type: String,
            default: require("@/assets/img/images.png"),
        },
        profileName: {
            type: String,
            default: "",
        },
        profileEmail: {
            type: String,
            default: " ",
        },
        isExitButton: {
            type: Boolean,
            default: true,
        },

    },
    data() {
        return {
            isOpened: false,
            name: '',
            email: '',
        };
    },
    mounted() {
        this.isOpened = this.isMenuOpen
        this.name = localStorage.getItem("name")
        this.email = localStorage.getItem("email")
    },
    watch: {
        isOpened() {
            window.document.body.style.paddingRight =
                this.isOpened && this.isPaddingRight
                    ? this.menuOpenedPaddingRightBody
                    : this.menuClosedPaddingRightBody;
            document.querySelector("#user-info").style.display =
                this.isOpened && this.isDisplayBlock
                    ? this.menuOpenUserDisplayBlock
                    : this.menuClosedUserDisplayNone;
        },

    },
};
</script>

<style lang="scss">
@import '@/assets/css/Main/Sidebar.scss';
</style>
