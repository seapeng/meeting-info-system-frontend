<template>
  <div class="body-content">
    <div class="container-fluid">
      <div class="row header-row">
        <div class="col-2">កាលបរិច្ឆេទ</div>
        <div class="col-6">ខ្លឹមសារ</div>
        <div class="col-3">ទីកន្លែង</div>
        <div class="col-1">ស្ថានភាព</div>
      </div>

      <Carousel v-bind="{
        dir: 'ttb',
        wrapAround: false,
        itemsToShow: meetingList.length,
        gap: 5,
        height: 520,
        autoplay: 10000,
      }" v-if="meetingList.length < 4">
        <Slide v-for="(slide) in meetingList" :key="slide._id" style="height:auto">
          <div class="container-fluid text-start row data-row">
            <div class="col-lg-2 col-md-2">
              <div>{{ fullDate(slide.date) }}</div>
              ម៉ោង {{ slide.sTime }}
            </div>
            <div class="col-6">
              <p>{{ slide.title }}</p>
              <div>ដឹកនាំដោយ៖ {{ slide.management.title.name }}
                <span class="font-muol color-gold">{{ slide.management.fullName }}</span>
                {{ slide.management.position }}
              </div>
            </div>
            <div class="col-3">
              <p><span>អគារ៖ </span>{{ slide.room.building.name }}</p>
              <p><span>ជាន់៖ </span>{{ slide.room.floor }}</p>
              <p><span>បន្ទប់៖ </span>{{ slide.room.name }}</p>
            </div>
            <div class="col-1">{{ slide.status }}</div>
          </div>
        </Slide>
      </Carousel>
      <Carousel v-bind="{
        dir: 'ttb',
        wrapAround: true,
        itemsToShow: 3,
        gap: 5,
        height: 520,
        autoplay: 10000,
      }" v-else>
        <Slide v-for="(slide) in meetingList" :key="slide._id" style="height:auto">
          <div class="container-fluid text-start row data-row">
            <div class="col-lg-2 col-md-2">
              <div>{{ fullDate(slide.date) }}</div>
              ម៉ោង {{ slide.sTime }}
            </div>
            <div class="col-6">
              <p>{{ slide.title }}</p>
              <div>ដឹកនាំដោយ៖ {{ slide.management.title.name }}
                <span class="font-muol color-gold">{{ slide.management.fullName }}</span>
                {{ slide.management.position }}
              </div>
            </div>
            <div class="col-3">
              <p><span>អគារ៖ </span>{{ slide.room.building.name }}</p>
              <p><span>ជាន់៖ </span>{{ slide.room.floor }}</p>
              <p><span>បន្ទប់៖ </span>{{ slide.room.name }}</p>
            </div>
            <div class="col-1">{{ slide.status }}</div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
  <!-- {{ meetingList }} -->
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import axios from 'axios';
import { ref } from 'vue';
import moment from 'moment';

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    const meetingList = ref([])
    return {
      meetingList
    }
  },
  methods: {
    async fetchTodayMeeting() {
      await axios.get(`${process.env.VUE_APP_API}/v1/public/meeting-today`, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.data.success) {
          this.meetingList = response.data.data

        }
      }).catch((error) => console.log(error))
    },
    fullDate(date) {
      const fullDate = moment(new Date(date)).format("DD-MMMM-YYYY").toString().split("-")
      return this.$t(fullDate[0]) + ' ' + this.$t(fullDate[1]) + ' ' + this.$t(fullDate[2]);
    }
  },
  mounted() {
    this.fetchTodayMeeting()
    this.timer = setInterval(this.fetchTodayMeeting, 30000);
  },

}
</script>