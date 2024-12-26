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
        
        <Slide v-for="slide in 4" :key="slide" style="height:auto">
          <div class="row data-row">
              <div class="col-lg-2 col-md-2">
                <div>២០ វិច្ឆិកា ២០២៤</div>
                ម៉ោង 10:00
              </div>
              <div class="col-6">
                <p>កិច្ចប្រជុំពិភាក្សាលើការអនុវត្តគម្រោងស្តារ និងដាំព្រៃកោងកាងរបស់ក្រុមហ៊ុន ATR និងក្រុមហ៊ុន T&T</p>      
                <div>ដឹកនាំដោយ៖ ឯកឧត្តម <span class="font-muol color-gold">កែវ អូម៉ាលីស្ស</span> រដ្ឋលេខាធិការ</div>
              </div>
              <div class="col-3">
                <p><span>អគារ៖ </span>តេជោសន្តិភាព</p>
                <p><span>ជាន់៖ </span>ទី១</p>
                <p><span>បន្ទប់៖ </span>បូព្រឹក</p>
              </div>
              <div class="col-1">កំពុងប្រជុំ</div>
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

  const i = 4;
  
  export default {
    name: 'App',
    components: {
      Carousel,
      Slide,
    },
    setup() {
      const config = {
        dir: 'ttb',
        wrapAround: i>3?true:false,
        itemsToShow: i>3?3:i,
        gap: 5,
        height: 520,
        autoplay:i>3?10000:0,
      };
  
      return {
        config
      }
    },
  }
  </script>
  