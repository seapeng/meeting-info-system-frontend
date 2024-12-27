import axios from 'axios'
import { defineStore } from 'pinia'

const useBuidlingStore = defineStore('building', {
    state: () => ({
        building: []
    }),
    actions: {
        async getAllBuildings() {
            try {
                const { data } = await axios.get(`${process.env.VUE_APP_API}/v1/buildings`)
                // console.log(data)
                this.building = data
            } catch (err) {
                console.log(err.message)
            }
        }
    }
})

export default useBuidlingStore