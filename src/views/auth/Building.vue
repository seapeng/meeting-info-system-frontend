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
                                <td>1</td>
                                <td>{{ building.name }}</td>
                                <td>
                                    <i class="bi bi-pencil-square"></i> |
                                    <i class="bi bi-trash-fill"></i>
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
                    <form method="post" @submit.prevent="onCreateBuilding">
                        <div class="form-group">
                            <label for="orderNumber">លេខលំដាប់ :</label>
                            <input class="form-control" type="number" v-model="orderNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ឈ្មោះអាគារ :</label>
                            <input class="form-control" type="text" v-model="name" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">បដិសេធ</button>
                            <button type="submit" name="save" class="btn btn-primary">រក្សាទុក</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';



import useBuidlingStore from "@/store/building.js";
import { mapActions, mapState } from "pinia";

const getAllBuilding = async () => {
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
}

export default {
    
    data() {
        return {
            buildings: [],
            orderNumber: '',
            name: ''
        }
    },
    async beforeCreate() {
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
    methods: {
        async onCreateBuilding() {
            try {
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
                        this.buildings.push(response.data.data);
                        this.orderNumber = '';
                        this.name = '';
                        this.$router.push({ name: 'admin.building' });
                    }
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
<!-- 
<script>
    import Sidebar from '@/components/Auth/Sidebar.vue';
    import Topbar from '@/components/Auth/Topbar.vue';
    import Footer from '@/components/Auth/Footer.vue';

    import useBuidlingStore from "@/store/building.js";
    import { mapActions, mapState } from "pinia";

    export default {
        components: {
            Sidebar,
            Topbar,
            Footer,
        },
        data() {
            return {
                datas: [],
            };
        },
        async created() {
            await this.getAllBuildings();
            // console.log(this.services);
            this.datas = this.buildings;
        },
        computed: {
            ...mapState(useBuidlingStore, ["buildings"]),
        },
        methods: {
            ...mapActions(useBuidlingStore, ["getAllBuildings"]),
        }
    };
</script> -->