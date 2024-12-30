<template>
    <div class="header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-4">
            <div class="logo">
              <img src="@/assets/img/logo.png">
            </div>
          </div>
  
          <div class="col-lg-4 col-md-4">
            <div class="title">
              <h1>កម្មវិធីប្រជុំ</h1>
              <h2>{{ $t(formattedDay) + ' ' + $t(formattedMonth) + ' ' + $t(formattedYear) }}</h2>
            </div>
          </div>
          <div class="col-lg-4 col-md-4">
            <div class="time">{{ currentTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
    export default {
      data() {
        return {
          currentDate: new Date(), // Format the date as per your locale
          currentTime: moment(new Date()).format("H:mm:ss"),
        };
      },
      methods: {
        updateTime() {
          this.currentTime = moment(new Date()).format("H:mm:ss");
        },
      },
      mounted() {
        this.timer = setInterval(this.updateTime, 1000);
      },
      computed: {
        formattedDay() {
          const formatter = new Intl.DateTimeFormat('kh', {
            day: 'numeric',
          });
          return formatter.format(this.currentDate);
        },
        formattedMonth() {
          const formatter = new Intl.DateTimeFormat('kh', {
            month: 'long',
          });
          return formatter.format(this.currentDate);
        },
        formattedYear() {
          const formatter = new Intl.DateTimeFormat('kh', {
            year: 'numeric',
          });
          return formatter.format(this.currentDate);
        },
      },
    };
  </script>
    