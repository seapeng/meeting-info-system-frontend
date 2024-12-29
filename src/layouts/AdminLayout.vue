<template>
   
    <div id="wrapper">
       <!-- Sidebar -->
 <Sidebar></Sidebar>
 <!-- End of Sidebar -->
 
       <!-- Content Wrapper -->
       <div id="content-wrapper" class="d-flex flex-column">
 
          <!-- Main Content -->
          <div id="content">
 
             <!-- Topbar -->
             <Topbar></Topbar>
             <!-- End of Topbar -->
 
             <!-- Begin Page Content -->
             <router-view></router-view>
             <!-- /.container-fluid -->
 
          </div>
          <!-- End of Main Content -->
 
          <!-- Footer -->
          <Footer></Footer>
 
       </div>
    </div>
       <!-- End of Content Wrapper -->
 
 </template>
 
 <script>
    import Sidebar from '@/components/Auth/Sidebar.vue';
    import Topbar from '@/components/Auth/Topbar.vue';
    import Footer from '@/components/Auth/Footer.vue';
 
    export default {
       components: {
          Sidebar,
          Topbar,
          Footer,
       },
       data(){
          return{
             infos:[
                {icon:'fas fa-building fa-2x text-gray-300', name:'ចំនួនអារគារ', number:6},
                {icon:'fas fa-server fa-2x text-gray-300', name:'ចំនួនបន្ទប់', number:10},
                {icon:'fas fa-user fa-2x text-gray-300', name:'ចំនួនគណនី', number:3},
                {icon:'fas fa-users fa-2x text-gray-300', name:'ចំនួនប្រជុំថ្ងៃនេះ', number:5},
             ]
          }
       },
    };
 </script>