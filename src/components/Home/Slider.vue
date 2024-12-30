<template>
  <div class="body-content">
    <div class="container-fluid">
      <div class="row header-row">
        <div class="col-2">កាលបរិច្ឆេទ</div>
        <div class="col-6">ខ្លឹមសារ</div>
        <div class="col-3">ទីកន្លែង</div>
        <div class="col-1">ស្ថានភាព</div>
      </div>

      <Carousel v-bind="config">

        <Slide v-for="slide in meetingList" :key="slide" style="height:auto">
          <div class="container-fluid row data-row text-start">
            <div class="col-lg-2 col-md-2">
              <div>{{ slide.date }}</div>
              ម៉ោង {{ slide.startTime.name }}
            </div>
            <div class="col-6">
              <p>{{ slide.title }}</p>
              <div>
                ដឹកនាំដោយ៖ {{ slide.management.title.name }}
                <span class="font-muol color-gold">{{ slide.management.fullName }}</span>
                {{ slide.management.position }}
              </div>
            </div>
            <div class="col-3">
              <p><span>អគារ៖ </span>{{ slide.room.building.name }}</p>
              <p><span>ជាន់៖ </span>{{ slide.room.floor.name }}</p>
              <p><span>បន្ទប់៖ </span>{{ slide.room.name }}</p>
            </div>
            <div class="col-1">{{ slide.status.name }}</div>
          </div>
        </Slide>

      </Carousel>


    </div>
  </div>

</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import axios from "axios"

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      slideLength:1,
      config: {
        dir: 'ttb',
        wrapAround: this.slideLength > 3 ? true : false,
        itemsToShow: this.slideLength > 3 ? 3 : this.slideLength,
        gap: 5,
        height: 520,
        autoplay: this.slideLength > 3 ? 10000 : 0,
      },
      meetingList: []
    }
  },
  methods: {
    async fetchMeetings() {
      await axios.get(`${process.env.VUE_APP_API}/v1/public/meeting-today`, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
        if (response.data.success) {
          this.meetingList = response.data.data
          this.slideLength = response.data.data.lenght
        }
      }).catch(error => console.error(error))
    }
  },
  async mounted() {
    await this.fetchMeetings()
  },

}
</script>