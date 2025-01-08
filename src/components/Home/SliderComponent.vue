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
                <Slide v-for="(slide,index) in meetingList" :key="slide._id" style="height:auto">
                    <div class="container-fluid row data-row text-start">
                        <div class="col-lg-2 col-md-2">
                            <div>{{ $t(fullDate(slide.date)[0]) }} {{ $t(fullDate(slide.date)[1]) }} {{
                                $t(fullDate(slide.date)[2]) }}</div>
                            ម៉ោង {{ slide.sTime }}
                        </div>
                        <div class="col-6">
                            <p>{{ slide.title }}{{ index }}</p>
                            <div>ដឹកនាំដោយ៖ {{ slide.management.title.name }} <span class="font-muol color-gold">{{
                                slide.management.fullName }}</span> {{ slide.management.position }}</div>
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
</template>

<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import moment from 'moment';
const { t } = useI18n;
const i = ref(0);
const meetingList = ref([]);
const fetchMeeting = async () => {
    await axios.get(`${process.env.VUE_APP_API}/v1/public/meeting-today`, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => {
        if (response.data.success) {
            meetingList.value = response.data.data
            i.value = meetingList.value.length
        }
    }).catch(error => console.error(error))
};
const config = ref({
    dir: 'ttb',
    wrapAround: i.value > 3 ? true : false,
    itemsToShow: i.value > 3 ? 3 : i.value,
    gap: 5,
    height: 520,
    autoplay: i.value > 3 ? 1000 : 0,
});
const fullDate = (date) => {
    const fullDate = moment(new Date(date)).format("DD-MMMM-YYYY").toString().split("-")
    return fullDate
    // return t(fullDate[0]) + ' ' + t(fullDate[1]) + ' ' + t(fullDate[2]);
}
onMounted(() => {
    fetchMeeting()
});
</script>