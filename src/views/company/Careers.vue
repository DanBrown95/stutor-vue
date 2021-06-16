<template>
    <div>
        <div class="banner">
            
        </div>
        <div class="main-content-wrapper">
            <div id="available-jobs-container" v-if="availableJobs != undefined && availableJobs.length > 0">
                <div style="text-align: center;">
                    <h1 style="display: inline-block; margin-right: 10px;">Open positions in</h1> 
                    <v-select
                        :items="locations"
                        v-model="selectedLocation"
                        full-width
                        style="display: inline-block; font-family: Arial, Helvetica, sans-serif;"
                    ></v-select>

                    <v-divider></v-divider>
                </div>
                <v-row justify="center" style="padding-top: 30px;">
                    <template v-for="x in availableJobs.filter(y => selectedLocation == 'All Locations' || y.location == selectedLocation)">
                        <available-job :job="x" :key="x.id"/>
                    </template>
                </v-row>
            </div>
            <div v-else class="empty-jobs">
                <div justify="center">
                    <h2>We are not actively hiring at this time</h2>
                    <p>Please check back at a later time for a list of open positions</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AvailableJob from "@/components/company/AvailableJob.vue";
import { GetAllAvailableJobs as _careerRepo_GetAllAvailableJobs } from '@/store/career/repository.js';

export default {
    components: {
        AvailableJob
    },
    data() {
        return {
            availableJobs: [],
            searching: false,
            selectedLocation: "All Locations"
        }
    },
    mounted(){
        this.getAvailableJobs();
    },
    computed: {
        locations(){
            if(this.availableJobs.length < 1){
                return [];
            }else{
                var locs = this.availableJobs.map(x => x.location);
                locs.push("All Locations");
                return locs;
            }
        }
    },
    watch: {
    },
    methods: {
        async getAvailableJobs() {
            this.searching = true;
            this.availableJobs = await _careerRepo_GetAllAvailableJobs();
            this.searching = false;
        }
    }
}
</script>
<style scoped>
    .banner {
        height: 450px;
        justify-content: center;
        align-items: center;
        background-color: antiquewhite;
        background-image: url("../../assets/careers-banner.png");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .main-content-wrapper {
        background-color: #f1f5f8;
        min-height: 500px;
        padding-top: 2em;
        padding-bottom: 2em;
    }

    .main-content-wrapper h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        padding-bottom: 1em;
    }

    #available-jobs-container hr {
        width: 94%;
        margin: auto;
        height: 60px;
        background:lightskyblue;
        margin-bottom: 1em;
    }

    .empty-jobs {
        display: table; 
        height: 100%; 
        width: 100%;
    }

    .empty-jobs > div {
        display: table-cell; 
        vertical-align: middle; 
        text-align: center;
    }
    
</style>