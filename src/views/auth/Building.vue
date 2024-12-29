<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="float-left">
                    <h6 class="m-0 font-weight-bold text-primary">អាគារ</h6>
                </div>

                <div class="float-right margin-top-2">
                    <a href="#" data-toggle="modal" data-target="#CreateModal">
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
                                <th>ឈ្មោះអាគារ</th>
                                <th>ផ្សេងៗ</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(building, index) in buildings" :key="index">
                                <td>{{ building.orderNumber }}</td>
                                <td>{{ building.name }}</td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#EditModal"
                                        @click="onEditBuilding(building._id)">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    |
                                    <a href="#" class="text-danger" @click="onDeleteBuilding(building._id)">
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
    <div class="modal fade" id="CreateModal" ref="createModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form method="post" @submit.prevent="onCreateBuilding">
                        <div class="form-group">
                            <label for="orderNumber">លេខលំដាប់ :</label>
                            <input class="form-control" type="number" v-model="orderNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ឈ្មោះអាគារ :</label>
                            <input class="form-control" type="text" v-model="name" required>
                            <span v-for="(err, index) in errors" :key="index" class="text-danger">{{ err.message
                                }}</span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" ref="hideCreateModal"
                                data-dismiss="modal">បដិសេធ</button>
                            <button type="submit" name="save" class="btn btn-primary">រក្សាទុក</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Modal-->
    <div class="modal fade" id="EditModal" ref="editModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form method="post" @submit.prevent="submitEditBuilding">
                        <div class="form-group">
                            <label for="orderNumber">លេខលំដាប់ :</label>
                            <input class="form-control" type="number" v-model="updateDetails.orderNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ឈ្មោះអាគារ :</label>
                            <input class="form-control" type="text" v-model="updateDetails.name" required>
                            <span v-for="(err, index) in errors" :key="index" class="text-danger">{{ err.message
                                }}</span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" ref="hideEditModal"
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
import axios from 'axios';
import Loading from '@/components/Loading.vue';
export default {

    data() {
        return {
            actionLoading: false,
            buildings: [],
            orderNumber: '',
            name: '',
            errors: [],
            updateDetails: {
                _id: '',
                orderNumber: '',
                name: ''
            }
        }
    },
    components: {
        Loading,
    },
    async mounted() {
        this.actionLoading = true;
        await this.fetchBuildings();
        this.actionLoading = false;
    },
    methods: {
        async fetchBuildings() {
            await axios.get('/api/v1/buildings', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.data.success) {
                    this.buildings = response.data.data;
                }
            }).catch(error => {
                console.error(error);
            });
        },
        async onCreateBuilding() {

            try {
                this.actionLoading = true
                await axios.post('/api/v1/buildings', {
                    orderNumber: this.orderNumber,
                    name: this.name
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.fetchBuildings();
                        this.$refs.hideCreateModal.click();
                    }
                }).catch(error => {
                    this.errors = error.response.data.error;
                }).finally(() => this.actionLoading = false);

            } catch (error) {
                console.error(error);
            }
        },
        async onEditBuilding(id) {
            this.actionLoading = true;
            await axios.get(`/api/v1/buildings/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data.data);
                if (response.data.success) {
                    this.updateDetails = response.data.data;
                }
            }).catch(error => {
                console.error(error);
            }).finally(()=>this.actionLoading=false);
        },
        async submitEditBuilding() {
            try {
                this.actionLoading = true;
                await axios.put(`/api/v1/buildings/${this.updateDetails._id}`, {
                    orderNumber: this.updateDetails.orderNumber,
                    name: this.updateDetails.name
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.fetchBuildings();
                        this.$refs.hideEditModal.click();
                    }
                }).catch(error => {
                    console.error(error);
                }).finally(()=>this.actionLoading = false);

            } catch (error) {
                console.error(error);
            }
        },
        onDeleteBuilding(id) {
            if (confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?')) {
                this.actionLoading = true
                axios.delete(`/api/v1/buildings/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.fetchBuildings();
                    }
                }).catch(error => {
                    console.error(error);
                }).finally(() => {
                    this.actionLoading = false
                });
            }
        }
    }
}
</script>
