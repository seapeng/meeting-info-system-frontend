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
         <li class="nav-item active">
            <router-link to="dashboard" class="nav-link">
               <i class="bi bi-speedometer2"></i>
               <span>ផ្ទាំងបង្ហាញទូទៅ</span>
            </router-link>
         </li>

          <!-- Divider -->
          <hr class="sidebar-divider">

         <!-- Heading -->
         <div class="sidebar-heading">
            សកម្មភាព
         </div>
         <li class="nav-item">
            <router-link to="meeting" class="nav-link">
               <i class="bi bi-speedometer2"></i>
               <span>បញ្ចូលកិច្ចប្រជុំ</span>
            </router-link>
         </li>
         <li class="nav-item">
            <router-link to="history" class="nav-link">
               <i class="bi bi-speedometer2"></i>
               <span>ប្រវត្តិកិច្ចប្រជុំ</span>
            </router-link>
         </li>

         <!-- Divider -->
         <hr class="sidebar-divider">

         <!-- Heading -->
         <div class="sidebar-heading">
            ការកំណត់
         </div>
         <li class="nav-item">
            <router-link to="leader" class="nav-link">
               <i class="bi bi-speedometer2"></i>
               <span>ថ្នាក់ដឹកនាំ</span>
            </router-link>
         </li>
         <li class="nav-item">
            <router-link to="room" class="nav-link">
               <i class="bi bi-door-closed-fill"></i>
               <span>បន្ទប់ប្រជុំ</span>
            </router-link>
         </li>
         <li class="nav-item">
            <router-link to="building" class="nav-link">
               <i class="bi bi-building-fill"></i>
               <span>អាគារ</span>
            </router-link>
         </li>

         <!-- Divider -->
         <hr class="sidebar-divider">

         <!-- Heading -->
         <div class="sidebar-heading">
            អ្នកគ្រប់គ្រង
         </div>
         <li class="nav-item">
            <router-link to="admin" class="nav-link">
               <i class="bi bi-speedometer2"></i>
               <span>គណនីគ្រប់គ្រង</span>
            </router-link>
         </li>

      </ul>
      <!-- End of Sidebar -->
 </template>
   