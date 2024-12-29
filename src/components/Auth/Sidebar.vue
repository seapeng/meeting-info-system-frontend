<template>
   <!-- Sidebar -->
   <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
         <!-- Sidebar - Brand -->
         <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
               <i class="fas fa-user-circle"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Admin</div>
         </a>

         <!-- Divider -->
         <hr class="sidebar-divider my-0">

         <!-- Nav Item - Dashboard -->
         <li class="nav-item" v-for="(menu, index) in menus" :key="index">
            <router-link :to="menu.link" class="nav-link">
               <i :class="menu.icon"></i>
               <span>{{ menu.name }}</span>
            </router-link>
         </li>

      </ul>
      <!-- End of Sidebar -->
 </template>

<script>

export default {
   data(){
      return{
         menus:[
            {icon:'bi-speedometer2', name:'ផ្ទាំងបង្ហាញទូទៅ', link:"./dashboard"},
            {icon:'bi bi-journal-album', name:'បញ្ចូលកិច្ចប្រជុំ', link:"./meeting"},
            {icon:'bi bi-clock-history', name:'ប្រវត្តិកិច្ចប្រជុំ', link:"./history"},
            {icon:'bi bi-person-lines-fill', name:'ថ្នាក់ដឹកនាំ', link:"./leader"},
            {icon:'bi bi-door-closed-fill', name:'បន្ទប់ប្រជុំ', link:"./room"},
            {icon:'bi bi-buildings-fill', name:'អាគារ', link:"./building"},
            {icon:'bi bi-person-fill', name:'គណនីគ្រប់គ្រង', link:"./admin"},
         ]
      }
   },
};
</script>
   