<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានកិច្ចប្រជុំ</h1>
                                    </div>
                                    <form class="user" @submit.prevent="login">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                aria-describedby="emailHelp" placeholder="Username" v-model="username">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                placeholder="Password" v-model="password" autocomplete="off">
                                        </div>
                                        <span>{{ errors }}</span>
                                        <div>

                                        </div>
                                        <button type="submit" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                    </form>
                                    <hr>
                                    <!-- <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <!-- Loading Spinner component -->
    <Loading :isLoading="actionLoading" />
</template>

<script>
import axios from 'axios';
import Loading from '@/components/Loading.vue';

export default {
    data() {
        return {
            username: '',
            password: '',
            errors: '',
            actionLoading: false,
        }
    },
    components:{
        Loading,
    },
    methods: {
        async login() {
            try {
                this.actionLoading = true;
                await axios.post(`${process.env.VUE_APP_API}/v1/auth/sign-in`, {
                    username: this.username,
                    password: this.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.data.success) {
                        localStorage.setItem('token', response.data.data.accessToken);
                        localStorage.setItem('user', JSON.stringify(response.data.data.user));
                        this.$router.push({ name: 'admin.dashboard' });
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }).finally(() => this.actionLoading = false);
            } catch (err) {
                this.errors = "invlaide username or password";
            }
        }
    }
}
</script>