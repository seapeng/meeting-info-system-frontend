<template>
   <div id="page-top"></div>
   <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <!-- Topbar Navbar -->
      <ul class="navbar-nav ml-auto">
         <!-- Nav Item - User Information -->
         <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
               <span class="mr-2 d-none d-lg-inline text-secondary text-uppercase">Welcome {{ getFullName }}</span>
               <img class="img-profile rounded-circle" src="@/assets/auth/img/undraw_profile.svg">
            </a>
            <!-- Dropdown - User Information -->
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
               <a class="dropdown-item" href="#" data-toggle="modal" data-target="#changePasswordModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Change Password
               </a>
               <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
               </a>
            </div>
         </li>
      </ul>
   </nav>

   <!-- Logout Modal-->
   <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
               <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
               </button>
            </div>
            <div class="modal-body">Select "Logout" if you are ready to end.</div>
            <div class="modal-footer">
               <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
               <!-- <a class="btn btn-primary" href="administra">Logout</a> -->
               <button class="btn btn-primary" @click="logout" data-dismiss="modal">Logout</button>
            </div>
         </div>
      </div>
   </div>

   <!-- Change Password Modal-->
   <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Change Password?</h5>
               <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
               </button>
            </div>
            <div class="modal-body">Select "Logout" if you are ready to end.</div>
            <div class="modal-footer">
               <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
               <button class="btn btn-primary" data-dismiss="modal">Logout</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         user: JSON.parse(localStorage.getItem('user'))
      }
   },
   computed:{
      getFullName(){
         return `${this.user.firstName} ${this.user.lastName}, ${this.user.position}`
      },
   },
   methods: {
      logout() {
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         this.$router.push({ name: 'signin' });
      }
   }
}
</script>