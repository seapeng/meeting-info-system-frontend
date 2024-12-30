<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="float-left">
                    <h6 class="m-0 font-weight-bold text-primary">ប្រវត្តិនៃកិច្ចប្រជុំ</h6>
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
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="meeting in meetingHistoryList" :key="meeting._id">
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
                            </tr>
                        </tbody>
                    </table>
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
            meetingHistoryList: []
        }
    },
    components: {
        Loading,
    },
    methods: {
        async fetchMeetingHistory() {
            await axios.get(`${process.env.VUE_APP_API}/v1/meetings/histories/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then(response => {
                if (response.data.success) {
                    this.meetingHistoryList = response.data.data
                }
            }).catch(error => console.error(error))
        },
    },
    mounted() {
        this.actionLoading = true
        this.fetchMeetingHistory()
        this.actionLoading = false
    }
}
</script>