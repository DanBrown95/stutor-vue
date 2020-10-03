<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" id="legend" x-large class="icon">{{keySvgPath}}</v-icon>
        </template>
        <span style="color: lightGrey;">
            Knowledge </span><span> <br/>
              Scholar <br /> <v-icon class="">{{arrowUpSvgPath}}</v-icon> <br /> 
              Master <br /> <v-icon>{{arrowUpSvgPath}}</v-icon> <br /> 
              Expert  <br /> <v-icon>{{arrowUpSvgPath}}</v-icon> <br />
              Beginner <br /> <v-icon>{{arrowUpSvgPath}}</v-icon> <br /> 
              Novice <br /> </span>
      </v-tooltip>
</template>

<script>
import { mdiKeyOutline, mdiArrowUp } from '@mdi/js';

export default {
    name: 'RatingLegend',
    data() {
        return {
            keySvgPath: mdiKeyOutline,
            arrowUpSvgPath: mdiArrowUp
        }
    }
}
</script>

<style scoped>
    #legend {
        position: absolute;
        right: 2%;
        bottom: 5%;
        color: burlywood;
    }
</style>