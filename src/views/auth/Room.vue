<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="float-left">
                    <h6 class="m-0 font-weight-bold text-primary">បន្ទប់ប្រជុំ</h6>
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
                                <th>ឈ្មោះបន្ទប់</th>
                                <th>ទីតាំង</th>
                                <th>ផ្សេងៗ</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="room in roomList" :key="room._id">
                                <td>{{ room.orderNumber }}</td>
                                <td>{{ room.name }}</td>
                                <td>
                                    អគារ៖ {{ room.building.name }} <br />
                                    ជាន់៖ {{ room.floor }}
                                </td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#EditModal"
                                        @click="onEditRoom(room._id)">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    |
                                    <a href="#" class="text-danger" @click="onDeleteRoom(room._id)">
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
                    <form method="post" @submit.prevent="submitCreateRoom">
                        <div class="form-group">
                            <label for="orderNumber">លេខលំដាប់ :</label>
                            <input class="form-control" v-model="createRoomDetail.orderNumber" type="number" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ឈ្មោះបន្ទប់ :</label>
                            <input class="form-control" v-model="createRoomDetail.name" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">អាគារ :</label>
                            <select class="form-control" v-model="createRoomDetail.building">
                                <optgroup label="អាគារ">
                                    <option v-for="building in buildingList" :key="building._id" :value="building._id">
                                        {{ building.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="name">ជាន់ :</label>
                            <input type="text" class="form-control" v-model="createRoomDetail.floor" placeholder="ជាន់នៃបន្ទប់">
                           
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
                    <form method="post" @submit.prevent="submitEditRoom">
                        <div class="form-group">
                            <label for="orderNumber">លេខលំដាប់ :</label>
                            <input class="form-control" v-model="editRoomDetail.orderNumber" type="number" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ឈ្មោះបន្ទប់ :</label>
                            <input class="form-control" v-model="editRoomDetail.name" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">អាគារ :</label>
                            <select class="form-control" v-model="editRoomDetail.building">
                                <optgroup label="អាគារ">
                                    <option v-for="building in buildingList" :key="building._id" :value="building._id">
                                        {{ building.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="name">ជាន់ :</label>
                            <input type="text" class="form-control" v-model="editRoomDetail.floor" placeholder="ជាន់នៃបន្ទប់">
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
            roomList: [],
            createRoomDetail: {},
            editRoomDetail: {},
            buildingList: []
        }
    },
    components: {
        Loading,
    },
    methods: {
        async fetchRooms() {
            try {
                await axios.get(`${process.env.VUE_APP_API}/v1/rooms`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                    .then(response => {
                        if (response.data.success) {
                            this.roomList = response.data.data
                        }
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        },
        
        async fetchBuildings() {
            try {
                await axios.get(`${process.env.VUE_APP_API}/v1/buildings`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                    .then(response => {
                        if (response.data.success) {
                            this.buildingList = response.data.data
                        }
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        },
        async submitCreateRoom() {
            try {
                this.actionLoading = true
                await axios.post(`${process.env.VUE_APP_API}/v1/rooms`, {
                    ...this.createRoomDetail
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.createRoomDetail = {}
                        this.fetchRooms()
                        this.$refs.closeCreateModal.click();
                    }
                }).catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error)
            }
        },
        async onDeleteRoom(id) {
            if (confirm("តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?")) {
                this.actionLoading = true;
                await axios
                    .delete(`${process.env.VUE_APP_API}/v1/rooms/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.fetchRooms();
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
        async onEditRoom(id) {
            try {
                this.actionLoading = true
                await axios
                    .get(`${process.env.VUE_APP_API}/v1/rooms/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            const res = response.data.data;
                            this.editRoomDetail.id = res._id
                            this.editRoomDetail.name = res.name
                            this.editRoomDetail.building = res.building._id
                            this.editRoomDetail.floor = res.floor
                            this.editRoomDetail.orderNumber = res.orderNumber
                        }
                    })
                    .catch((error) => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error);
            }
        },
        async submitEditRoom() {
            try {
                this.actionLoading = true
                await axios.put(`${process.env.VUE_APP_API}/v1/rooms/${this.editRoomDetail.id}`, {
                    ...this.editRoomDetail
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    if (response.data.success) {
                        this.editRoomDetail={}
                        this.fetchRooms()
                        this.$refs.closeEditModal.click();
                    }
                }).catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
        this.actionLoading = true;
        this.fetchBuildings()
        this.fetchRooms()
        this.actionLoading = false;
    }
}
</script>