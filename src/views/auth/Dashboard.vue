<template>
   <div class="container-fluid">

      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
         <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
         <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
         </a> -->
      </div>

      <!-- Content Row -->
      <div class="row">

         <!-- Earnings (Monthly) Card Example -->
         <div class="col-xl-3 col-md-6 mb-4" v-for="(info, index) in infos" :key="index">
            <div class="card border-left-primary shadow h-100 py-2">
               <div class="card-body">
                  <div class="row no-gutters align-items-center">
                     <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                           {{ info.name }}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{ info.number }}</div>
                     </div>
                     <div class="col-auto">
                        <i :class="info.icon"></i>
                     </div>
                  </div>
               </div>
            </div>
         </div>


      </div>
      <!-- Content Row -->

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
         infos: [
            { icon: 'fas fa-building fa-2x text-gray-300', name: 'ចំនួនអារគារ', number: 0 },
            { icon: 'fas fa-server fa-2x text-gray-300', name: 'ចំនួនបន្ទប់', number: 0 },
            { icon: 'fas fa-user fa-2x text-gray-300', name: 'ចំនួនគណនី', number: 0 },
            { icon: 'fas fa-users fa-2x text-gray-300', name: 'ចំនួនប្រជុំថ្ងៃនេះ', number: 0 },
         ]
      }
   },
   components: {
      Loading
   },
   methods: {
      async fetchBuildings() {
         await axios.get(`${process.env.VUE_APP_API}/v1/buildings`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }).then(response => {
            if (response.data.success) {
               const res = response.data.data
               this.infos[0].number = res.length
            }
         })
      },
      async fetchRooms() {
         await axios.get(`${process.env.VUE_APP_API}/v1/Rooms`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }).then(response => {
            if (response.data.success) {
               const res = response.data.data
               this.infos[1].number = res.length
            }
         })
      },
      async fetchUsers() {
         await axios.get(`${process.env.VUE_APP_API}/v1/users`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }).then(response => {
            if (response.data.success) {
               const res = response.data.data
               this.infos[2].number = res.length
            }
         })
      },
      async fetchTodayMeeting() {
         await axios.get(`${process.env.VUE_APP_API}/v1/public/meeting-today`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }).then(response => {
            if (response.data.success) {
               const res = response.data.data
               this.infos[3].number = res.length
            }
         })
      },
   },
   async mounted() {
      this.actionLoading = true
      await this.fetchBuildings()
      await this.fetchRooms()
      await this.fetchUsers()
      await this.fetchTodayMeeting()
      this.actionLoading = false
   }
};
</script>