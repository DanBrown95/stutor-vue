<template>
    <div>
        <v-row>
            <v-col cols="6">
                <div class="day-container column" v-for="day in sortedDays" :key="day.Id">
                    <DisplayDayCircle :day="day.name" :color='day.name | dayAsColor'></DisplayDayCircle>
                </div>
            </v-col>
            <v-col v-if="parsedAvailability.weekdayHours" v-bind:style="{color: '#11DC6F'}">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">{{parsedAvailability.weekdayHours | toFriendlyTime }}</span>
                    </template>
                    <span>Weekday Hours</span>
                </v-tooltip>
            </v-col>
            <v-col v-if="parsedAvailability.weekendHours" v-bind:style="{color: '#5298F0'}">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">{{parsedAvailability.weekendHours | toFriendlyTime}}</span>
                    </template>
                    <span>Weekend Hours</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import DisplayDayCircle from '@/components/utils/DisplayDayCircle.vue'
import { militaryToFriendlyTime } from '@/helpers/Time.js'
import { AvailabilityParser, MapAndSortDaysOfTheWeek } from '@/helpers/Availability.js'

export default {
    name: 'AvailabilityDisplay',
    props: ['availability'],
    components: {
        DisplayDayCircle
    },
    data() {
        return {
            parsedAvailability: { }
        }
    },
    created() {
        this.parsedAvailability = AvailabilityParser(this.availability);
    },
    computed: {
        sortedDays(){
            return MapAndSortDaysOfTheWeek(this.parsedAvailability.days);
        }
    },
    filters: {
        dayAsColor(day) {
            return (day.toLowerCase() == 'sat' || day.toLowerCase() == 'sun') ? '#5298F0' : '#11DC6F'
        },
        toFriendlyTime(time) {
            var split = time.split('-');
            var start = militaryToFriendlyTime(split[0]);
            var end = militaryToFriendlyTime(split[1]);
            return start + ' - ' + end;
        }
    }
    
}
</script>

<style scoped>
    .day-container {
        display: inline-block;
    }

    .column {
        display: inline-block;
    }
</style>