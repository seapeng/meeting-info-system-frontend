import axios from 'axios'
import { defineStore } from 'pinia'

const useMeetingTodayStore = defineStore('meetingtoday', {
    state: () => ({
        meetingtoday: []
    }),
    actions: {
        async getAllMeetingToday() {
            try {
                const { data } = await axios.get(`${process.env.VUE_APP_API}/v1/public/meeting-today`)
                // console.log(data)
                this.meetingtoday = data
            } catch (err) {
                console.log(err.message)
            }
        }
    }
})

export default useMeetingTodayStore