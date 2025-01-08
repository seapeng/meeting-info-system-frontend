import axios from "axios";
import { defineStore } from "pinia";

export const useSlideStore = defineStore("slideStore", {
  // arrow function recommended for full type inference
  state: () => ({
    totalRecoreds: 0,
    meetingList: [],
  }),
  actions: {
    async fetchMeetingToday() {
      await axios
        .get(`${process.env.VUE_APP_API}/v1/public/meeting-today`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          if (response.data.success) {
            this.meetingList = await response.data.data;
            this.totalRecoreds = this.meetingList.length;
          }
        })
        .catch((error) => console.error(error));
    },
  },
});

export default useSlideStore;
