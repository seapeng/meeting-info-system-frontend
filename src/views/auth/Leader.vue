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
                                <th>គោត្តនាម និងនាមថ្នាក់ដឹកនាំ</th>
                                <th>តួនាទី</th>
                                <th>ផ្សេងៗ</th>
                            </tr>
                        </thead>

                        <tbody>
                            <!-- <tr>
                                <td>1</td>
                                <td>ឯកឧត្តម ឌិត ទីណា</td>
                                <td>រដ្ឋមន្ត្រីក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ</td>
                                <td>
                                    <i class="bi bi-pencil-square"></i> |
                                    <i class="bi bi-trash-fill"></i>
                                </td>
                            </tr> -->
                            <tr v-for="(management) in managements" :key="management._id">
                                <td>{{ management.orderNumber }}</td>
                                <td>{{ management.title.name }} {{ management.fullName }}</td>
                                <td>{{ management.position }}</td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#EditModal"
                                        @click="onEditManagement(management._id)">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    |
                                    <a href="#" class="text-danger" @click="onDeleteManagement(management._id)">
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
                    <form method="post" @submit.prevent="onCreateManagement">
                        <div class="form-group">
                            <label for="sort">លេខលំដាប់ :</label>
                            <input class="form-control" type="number" v-model="createManagementDetail.orderNumber"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="name">គោរមងារ :</label>
                            <select class="form-control" v-model="createManagementDetail.title">
                                <optgroup label="គោរមងារ">
                                    <option v-for="title in titles" :key="title._id" :value="title._id">{{ title.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fullName">គោត្តនាម និងនាមថ្នាក់ដឹកនាំ :</label>
                            <input class="form-control" type="text" v-model="createManagementDetail.fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="gender">ភេទ :</label>
                            <select class="form-control" v-model="createManagementDetail.gender">
                                <optgroup label="ភេទ">
                                    <option v-for="gender in genders" :key="gender._id" :value="gender._id">{{
                                        gender.name }}</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="position">តួនាទី :</label>
                            <input class="form-control" type="text" v-model="createManagementDetail.position" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-dismiss="modal"
                                ref="closeCreateModal">បដិសេធ</button>
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
                    <form method="post" @submit.prevent="submitEditManagement">
                        <div class="form-group">
                            <label for="sort">លេខលំដាប់ :</label>
                            <input class="form-control" type="number" v-model="updateManagementDetail.orderNumber"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="name">គោរមងារ :</label>
                            <select class="form-control" v-model="updateManagementDetail.title">
                                <optgroup label="គោរមងារ">
                                    <option v-for="title in titles" :key="title._id" :value="title._id">
                                        {{ title.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fullName">គោត្តនាម និងនាមថ្នាក់ដឹកនាំ :</label>
                            <input class="form-control" type="text" v-model="updateManagementDetail.fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="gender">ភេទ :</label>
                            <select class="form-control" v-model="updateManagementDetail.gender">
                                <optgroup label="ភេទ">
                                    <option v-for="gender in genders" :key="gender._id" :value="gender._id">{{
                                        gender.name }}</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="position">តួនាទី :</label>
                            <input class="form-control" type="text" v-model="updateManagementDetail.position" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-dismiss="modal"
                                ref="closeEditModal">បដិសេធ</button>
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
import axios from 'axios';
import Loading from "@/components/Loading.vue";
export default {
    data() {
        return {
            actionLoading: false,
            page: 1,
            managements: [],
            titles: [],
            genders: [],
            createManagementDetail: { title: "", fullName: "", gender: "", position: "", orderNumber: 999 },
            updateManagementDetail: { id: "", title: "", fullName: "", gender: "", position: "", orderNumber: 999 },
        }
    },
    components: {
        Loading
    },
    methods: {
        async fetchManagements() {
            try {
                await axios.get(`/api/v1/managements?pages=${this.page}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }).then((response) => {
                    if (response.data.success) {
                        // console.log(response.data.data)
                        this.managements = response.data.data
                    }
                })
            } catch (error) {
                console.error(error)
            }
        },
        async fetchTitles() {
            try {
                await axios.get('/api/v1/enums/titles', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                },).then((response) => {
                    this.titles = response.data.data
                })
            } catch (error) {
                console.error(error)
            }
        },
        async fetchGenders() {
            try {
                await axios.get('/api/v1/enums/genders', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                },).then((response) => {
                    this.genders = response.data.data
                })
            } catch (error) {
                console.error(error)
            }
        },
        async onCreateManagement() {
            try {
                this.actionLoading = true;
                await axios.post("/api/v1/managements", {
                    ...this.createManagementDetail
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }).then((response) => {
                    if (response.data.success) {
                        this.createManagementDetail = { title: "", fullName: "", gender: "", position: "", orderNumber: 999 }
                        this.fetchManagements(1);
                        this.$refs.closeCreateModal.click();
                    }
                }).catch((error) => console.error(error))
            } catch (error) {
                console.error(error)
            } finally {
                this.actionLoading = false;
            }
        },
        async onDeleteManagement(id) {
            if (confirm("តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?")) {
                this.actionLoading = true;
                axios
                    .delete(`/api/v1/managements/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.fetchManagements();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        this.actionLoading = false;
                    });
            }
        },
        async onEditManagement(id) {
            try {
                this.actionLoading = true
                await axios
                    .get(`/api/v1/managements/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            const res = response.data.data;
                            this.updateManagementDetail.id = res._id
                            this.updateManagementDetail.fullName = res.fullName
                            this.updateManagementDetail.title = res.title._id
                            this.updateManagementDetail.gender = res.gender._id
                            this.updateManagementDetail.orderNumber = res.orderNumber
                            this.updateManagementDetail.position = res.position
                        }
                    })
                    .catch((error) => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error);
            }
        },
        async submitEditManagement() {
            try {
                this.actionLoading = true
                await axios
                    .put(`/api/v1/managements/${this.updateManagementDetail.id}`,{
                        ...this.updateManagementDetail
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then(response => {
                        if (response.data.success) {
                            this.updateManagementDetail.id = ""
                            this.updateManagementDetail.fullName = ""
                            this.updateManagementDetail.title = ""
                            this.updateManagementDetail.gender = ""
                            this.updateManagementDetail.orderNumber = 999
                            this.updateManagementDetail.position = ""
                            this.fetchManagements();
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
        await this.fetchManagements(this.page)
        await this.fetchTitles()
        await this.fetchGenders()
        this.actionLoading = false
    }
}
</script>