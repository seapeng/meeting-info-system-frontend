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
            <div class="container-fluid">

               <!-- Page Heading -->
               <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                  <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                     <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
                  </a>
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