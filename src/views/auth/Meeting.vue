<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="float-left">
                    <h6 class="m-0 font-weight-bold text-primary">កិច្ចប្រជុំ</h6>
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
                                <th width="120">កាលបរិច្ឆេទ</th>
                                <th>ខ្លឺមសារ</th>
                                <th width="210">ទីកន្លែង</th>
                                <th width="100">ផ្សេងៗ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="meeting in meetingList" :key="meeting._id">
                                <td>
                                    {{ meeting.date }} <br />
                                    {{ meeting.sTime }} ដល់
                                    {{ meeting.eTime }}
                                </td>
                                <td>
                                    {{ meeting.title }} <br />
                                    ដឹកនាំដោយ
                                    {{ meeting.management.title.name }}
                                    <b>{{ meeting.management.fullName }}</b>
                                    {{ meeting.management.position }}
                                </td>
                                <td>
                                    អគារ : {{ meeting.room.building.name }} <br />
                                    ជាន់ : {{ meeting.room.floor }} <br />
                                    បន្ទប់ : {{ meeting.room.name }}
                                </td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#EditModal"
                                        @click="onEditMeeting(meeting._id)">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    |
                                    <a href="#" class="text-danger" @click="onDeleteMeeting(meeting._id)">
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
                    <form method="post" @submit.prevent="submitCreateMeeting">
                        <div class="form-group">
                            <label for="date">កាលបរិច្ឆេទ :</label>
                            <input class="form-control" type="date" v-model="createMeetingDetail.date" required>
                        </div>
                        <div class="form-group">
                            <label for="title">ខ្លឺមសារ :</label>
                            <input class="form-control" type="text" v-model="createMeetingDetail.title" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ដឹកនាំដោយ :</label>
                            <select class="form-control" v-model="createMeetingDetail.management">
                                <optgroup label="ដឹកនាំដោយ">
                                    <option v-for="management in managementList" :key="management._id"
                                        :value="management._id">
                                        {{ management.title.name }} {{ management.fullName }} {{ management.position }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sTime">ម៉ោងចាប់ផ្តើម :</label>
                            <input type="time" class="form-control" v-model="createMeetingDetail.sTime" required>
                        </div>
                        <div class="form-group">
                            <label for="eTime">ម៉ោងចាប់បញ្ចប់ :</label>
                            <input type="time" class="form-control" v-model="createMeetingDetail.eTime" required>
                        </div>
                        <div class="form-group">
                            <label for="name">បន្ទប់ប្រជុំ > ជាន់ > អគារ :</label>
                            <select class="form-control" v-model="createMeetingDetail.room">
                                <optgroup label="បន្ទប់ប្រជុំ">
                                    <option v-for="room in roomList" :key="room._id" :value="room._id">
                                        {{ room.name }} > {{ room.floor.name }} > {{ room.building.name }}
                                    </option>
                                </optgroup>
                            </select>
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
                    <form method="post" @submit.prevent="submitEditMeeting">
                        <div class="form-group">
                            <label for="date">កាលបរិច្ឆេទ :</label>
                            <input class="form-control" type="date" v-model="editMeetingDetail.date" required>
                        </div>
                        <div class="form-group">
                            <label for="title">ខ្លឺមសារ :</label>
                            <input class="form-control" type="text" v-model="editMeetingDetail.title" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ដឹកនាំដោយ :</label>
                            <select class="form-control" v-model="editMeetingDetail.management">
                                <optgroup label="ដឹកនាំដោយ">
                                    <option v-for="management in managementList" :key="management._id"
                                        :value="management._id">
                                        {{ management.title.name }} {{ management.fullName }} {{ management.position }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sTime">ម៉ោងចាប់ផ្តើម :</label>
                            <input type="time" class="form-control" v-model="editMeetingDetail.sTime" required>
                        </div>
                        <div class="form-group">
                            <label for="eTime">ម៉ោងចាប់បញ្ចប់ :</label>
                            <input type="time" class="form-control" v-model="editMeetingDetail.eTime" required>
                        </div>
                        <div class="form-group">
                            <label for="name">បន្ទប់ប្រជុំ > ជាន់ > អគារ :</label>
                            <select class="form-control" v-model="editMeetingDetail.room">
                                <optgroup label="បន្ទប់ប្រជុំ">
                                    <option v-for="room in roomList" :key="room._id" :value="room._id">
                                        {{ room.name }} > {{ room.floor.name }} > {{ room.building.name }}
                                    </option>
                                </optgroup>
                            </select>
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
import moment from "moment";
export default {
    data() {
        return {
            currentDate: moment(new Date()).format("YYYY-MM-DD"),
            actionLoading: false,
            createMeetingDetail: {},
            editMeetingDetail: {},
            meetingList: [],
            managementList: [],
            roomList: [],
        }
    },
    components: {
        Loading
    },
    methods: {
        async fetchManagements() {
            await axios.get(`${process.env.VUE_APP_API}/v1/managements`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then(response => {
                if (response.data.success) {
                    this.managementList = response.data.data
                }
            }).catch(error => console.error(error))
        },
        async fetchRooms() {
            await axios.get(`${process.env.VUE_APP_API}/v1/rooms`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then(response => {
                if (response.data.success) {
                    this.roomList = response.data.data
                }
            }).catch(error => console.error(error))
        },
        async fetchMeetings() {
            try {
                await axios.get(`${process.env.VUE_APP_API}/v1/meetings`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    if (response.data.success) {
                        this.meetingList = response.data.data
                    }
                }).catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        },
        async submitCreateMeeting() {
            try {
                this.actionLoading = true
                await axios
                    .post(`${process.env.VUE_APP_API}/v1/meetings`, {
                        ...this.createMeetingDetail
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then(response => {
                        if (response.data.success) {
                            this.createMeetingDetail = {}
                            this.fetchMeetings()
                            this.$refs.closeCreateModal.click();
                        }
                    })
                    .catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.log(error)
            }
        },
        async onDeleteMeeting(id) {
            if (confirm("តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?")) {
                this.actionLoading = true;
                await axios
                    .delete(`${process.env.VUE_APP_API}/v1/meetings/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.fetchMeetings()
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
        async onEditMeeting(id) {
            try {
                this.actionLoading = true
                await axios.get(`${process.env.VUE_APP_API}/v1/meetings/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then(response => {
                        if (response.data.success) {
                            const dt = response.data.data;
                            this.editMeetingDetail.id = dt._id
                            this.editMeetingDetail.management = dt.management._id
                            this.editMeetingDetail.room = dt.room._id
                            this.editMeetingDetail.date = dt.date
                            this.editMeetingDetail.title = dt.title
                            this.editMeetingDetail.sTime = dt.sTime
                            this.editMeetingDetail.eTime = dt.eTime
                        }
                    })
                    .catch(error => console.error(error))
                    .finally(() => this.actionLoading = false)
            } catch (error) {
                console.error(error)
            }
        },
        async submitEditMeeting() {
            try {
                this.actionLoading = true
                await axios.put(`${process.env.VUE_APP_API}/v1/meetings/${this.editMeetingDetail.id}`, {
                    ...this.editMeetingDetail
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    if (response.data.success) {
                        this.editMeetingDetail = {}
                        this.fetchMeetings()
                        this.$refs.closeEditModal.click();
                    }
                }).catch(error => console.error(error))
                this.actionLoading = false
            } catch (error) {
                console.error(error)
            }
        }
    },
    async mounted() {
        this.actionLoading = true
        await this.fetchManagements()
        await this.fetchRooms()
        await this.fetchMeetings()
       
        this.actionLoading = false
    },
}
</script>