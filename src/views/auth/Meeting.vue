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
                                <th>កាលបរិច្ឆេទ</th>
                                <th>ខ្លឺមសារ</th>
                                <th>ទីកន្លែង</th>
                                <th>ផ្សេងៗ</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="meeting in meetingList" :key="meeting._id">
                                <td>
                                    {{ meeting.date }} <br />
                                    {{ meeting.startTime.name }}
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
                                    ជាន់ : {{ meeting.room.floor.name }} <br />
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
                            <label for="startTime">ម៉ោងចាប់ផ្តើម :</label>
                            <select class="form-control" v-model="createMeetingDetail.startTime">
                                <optgroup label="ម៉ោងចាប់ផ្តើម">

                                    <option v-for="sTime in startTime" :key="sTime._id" :value="sTime._id">
                                        {{ sTime.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="endTime">ម៉ោងបញ្ចប់ </label>
                            <select class="form-control" v-model="createMeetingDetail.endTime">
                                <optgroup label="ម៉ោងចាប់បញ្ចប់">
                                    <option v-for="eTime in endTime" :key="eTime._id" :value="eTime._id">
                                        {{ eTime.name }}
                                    </option>
                                </optgroup>
                            </select>
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
                        <div class="form-group">
                            <label for="status">ស្ថានភាពប្រជុំ :</label>
                            <select class="form-control" v-model="createMeetingDetail.status">
                                <optgroup label="ស្ថានភាពប្រជុំ">
                                    <option v-for="status in statusList" :key="status._id" :value="status._id">
                                        {{ status.name }}
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
                            <label for="startTime">ម៉ោងចាប់ផ្តើម :</label>
                            <select class="form-control" v-model="editMeetingDetail.startTime">
                                <optgroup label="ម៉ោងចាប់ផ្តើម">

                                    <option v-for="sTime in startTime" :key="sTime._id" :value="sTime._id">
                                        {{ sTime.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="endTime">ម៉ោងបញ្ចប់ </label>
                            <select class="form-control" v-model="editMeetingDetail.endTime">
                                <optgroup label="ម៉ោងចាប់បញ្ចប់">
                                    <option v-for="eTime in endTime" :key="eTime._id" :value="eTime._id">
                                        {{ eTime.name }}
                                    </option>
                                </optgroup>
                            </select>
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
                        <div class="form-group">
                            <label for="status">ស្ថានភាពប្រជុំ :</label>
                            <select class="form-control" v-model="editMeetingDetail.status">
                                <optgroup label="ស្ថានភាពប្រជុំ">
                                    <option v-for="status in statusList" :key="status._id" :value="status._id">
                                        {{ status.name }}
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
            startTimeList: [],
            endTimeList: [],
            statusList: []
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
        async fetchTimes() {
            await axios.get(`${process.env.VUE_APP_API}/v1/enums/times`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then(response => {
                if (response.data.success) {
                    this.startTime = response.data.data
                    this.endTime = response.data.data
                }
            }).catch(error => console.error(error))
        },
        async fetchStatuses() {
            await axios.get(`${process.env.VUE_APP_API}/v1/enums/statuses`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then(response => {
                if (response.data.success) {
                    this.statusList = response.data.data
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
                            this.createMeetingDetail.startTime = this.startTime[2]._id
                            this.createMeetingDetail.endTime = this.endTime[4]._id
                            this.createMeetingDetail.management = this.managementList[0]._id
                            this.createMeetingDetail.room = this.roomList[0]._id
                            this.createMeetingDetail.status = this.statusList[0]._id
                            this.createMeetingDetail.date = this.currentDate
                            this.createMeetingDetail.title = ""
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
                            this.editMeetingDetail.startTime = dt.startTime._id
                            this.editMeetingDetail.endTime = dt.endTime._id
                            this.editMeetingDetail.management = dt.management._id
                            this.editMeetingDetail.room = dt.room._id
                            this.editMeetingDetail.status = dt.status._id
                            this.editMeetingDetail.date = dt.date
                            this.editMeetingDetail.title = dt.title
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
        await this.fetchTimes()
        await this.fetchStatuses()
        await this.fetchMeetings()
        this.createMeetingDetail.startTime = this.startTime[2]._id
        this.createMeetingDetail.endTime = this.endTime[4]._id
        this.createMeetingDetail.management = this.managementList[0]._id
        this.createMeetingDetail.room = this.roomList[0]._id
        this.createMeetingDetail.status = this.statusList[0]._id
        this.createMeetingDetail.date = this.currentDate
        this.actionLoading = false
    },
}
</script>