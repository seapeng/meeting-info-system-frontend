<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="float-left">
                    <h6 class="m-0 font-weight-bold text-primary">ថ្នាក់ដឹកនាំ</h6>
                </div>

                <div class="float-right margin-top-2">
                    <a href="" data-toggle="modal" data-target="#CreateModal">
                        <i class="fas fa-fw fa-plus-circle"></i> បង្កើតថ្មី
                    </a>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ល.រ</th>
                                <th>គោត្តនាម និងនាម</th>
                                <th>តួនាទី</th>
                                <th>គណនីប្រើប្រាស់</th>
                                <th>សិទ្ធិប្រើប្រាស់</th>
                                <th>អាចប្រើប្រាស់ប្រព័ន្ធ</th>
                                <th>ផ្សេងៗ</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(user, index) in usersList" :key="user._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ user.lastName }} {{ user.firstName }}</td>
                                <td>{{ user.position }}</td>
                                <td>{{ user.username }}</td>
                                <td>{{ user.role.name }}</td>
                                <td>
                                    <span class="badge badge-success" v-if="user.isEnable">
                                        Enable
                                    </span>
                                    <span class="badge badge-danger" v-else>
                                        Disable
                                    </span>
                                </td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#EditModal"
                                        @click="onEditUser(user._id)">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    |
                                    <a href="#" class="text-danger" @click="onDeleteUser(user._id)">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- Create Modal-->
    <div class="modal fade" id="CreateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form method="post" @submit.prevent="submitCreateUser">
                        <div class="form-group">
                            <label for="lastName">គោត្តនាម :</label>
                            <input class="form-control" type="text" v-model="createUserDetail.lastName" required>
                        </div>
                        <div class="form-group">
                            <label for="firstName">នាម :</label>
                            <input class="form-control" type="text" v-model="createUserDetail.firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="username">គណនីប្រើប្រាស់ :</label>
                            <input class="form-control" type="text" v-model="createUserDetail.username" required>
                        </div>
                        <div class="form-group">
                            <label for="posistion">តួនាទី :</label>
                            <input class="form-control" type="text" v-model="createUserDetail.posistion">
                        </div>
                        <div class="form-group">
                            <label for="phoneNumber">លេខទូរស័ព្ទ :</label>
                            <input class="form-control" type="text" v-model="createUserDetail.phoneNumber">
                        </div>
                        <div class="form-group">
                            <label for="role">សិទ្ធប្រើប្រាស់ :</label>
                            <select class="form-control" v-model="createUserDetail.role">
                                <optgroup label="សិទ្ធប្រើប្រាស់">
                                    <option v-for="role in rolesList" :key="role._id" :value="role._id">
                                        {{ role.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="password">ពាក្យសម្ងាត់ :</label>
                            <input class="form-control" type="password" v-model="createUserDetail.password" required>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" ref="closeCreateModal"
                                data-dismiss="modal">បដិសេធ</button>
                            <button type="submit" name="save" class="btn btn-primary">រក្សាទុក</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Edit Modal-->
    <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form method="post" @submit.prevent="submitEditUser">
                        <div class="form-group">
                            <label for="posistion">តួនាទី :</label>
                            <input class="form-control" type="text" v-model="editUserDetail.position">
                        </div>
                        <div class="form-group">
                            <label for="role">សិទ្ធប្រើប្រាស់ :</label>
                            <select class="form-control" v-model="editUserDetail.role">
                                <optgroup label="សិទ្ធប្រើប្រាស់">
                                    <option v-for="role in rolesList" :key="role._id" :value="role._id">
                                        {{ role.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="editUserDetail.isEnable"
                                    id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    អាចប្រើប្រាស់ប្រព័ន្ធ
                                </label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" ref="closeEditModal"
                                data-dismiss="modal">បដិសេធ</button>
                            <button type="submit" name="save" class="btn btn-primary">រក្សាទុក</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <!-- Loading Spinner component -->
    <Loading :isLoading="actionLoading" />
</template>

<script>
import Loading from "@/components/Loading.vue";
import axios from "axios";

export default {
    data() {
        return {
            actionLoading: false,
            rolesList: [],
            usersList: [],
            createUserDetail: {},
            editUserDetail: {}
        }
    },
    components: {
        Loading,
    },
    methods: {
        async fetchRoles() {
            try {
                await axios.get('/api//v1/enums/roles', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    if (response.data.success) {
                        this.rolesList = response.data.data
                    }
                }).catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        },
        async fetchUsers() {
            try {
                await axios.get('/api/v1/users', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    if (response.data.success) {
                        this.usersList = response.data.data
                    }
                }).catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        },
        async submitCreateUser() {
            try {
                this.actionLoading = true
                await axios
                    .post('/api/v1/users', {
                        ...this.createUserDetail
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then(response => {
                        if (response.data.success) {
                            this.fetchUsers()
                            this.$refs.closeCreateModal.click();
                        }
                    })
                    .catch(error => console.error(error))
                    .finally(() => (this.actionLoading = false));
            } catch (error) {
                console.error(error)
            }
        },
        async onDeleteUser(id) {
            if (confirm("តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?")) {
                this.actionLoading = true
                await axios.delete(`/api/v1/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    if (response.data.success) {
                        this.fetchUsers()
                    }
                }).catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            }
        },
        async onEditUser(id) {
            try {
                this.actionLoading = true
                await axios
                    .get(`/api/v1/users/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then(response => {
                        if (response.data.success) {
                            const dt = response.data.data
                            this.editUserDetail.id = dt._id
                            this.editUserDetail.position = dt.position
                            this.editUserDetail.isEnable = dt.isEnable
                            this.editUserDetail.role = dt.role._id
                        }
                    })
                    .catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error)
            }
        },
        async submitEditUser() {
            try {
                this.actionLoading = true
                await axios.put(`/api/v1/users/${this.editUserDetail.id}`, {
                    ...this.editUserDetail
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then(response => {
                        if (response.data.success) {
                            this.fetchUsers()
                            this.$refs.closeEditModal.click();
                        }
                    })
                    .catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error)
            }
        }
    },
    async mounted() {
        this.actionLoading = true
        await this.fetchRoles()
        await this.fetchUsers()
        this.createUserDetail.role = this.rolesList[0]._id
        this.actionLoading = false
    },
}
</script>