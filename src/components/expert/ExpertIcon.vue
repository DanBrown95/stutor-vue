<template>
    <div class="main">
        <a @click.stop="iconPressed(this)">
            <img class="image">
        </a>
        <div class="overlay">
            <div class="text" style="color: green;">${{ this.expert.price.toFixed(2) }}</div>
            <div class="text">{{ this.expert.rating | RatingAsTitle }}</div>
        </div>
    </div>
</template>

<script>
import { RatingAsTitle } from '@/helpers/Rating.js'

export default {
    name: 'ExpertIcon',
    props: ['expert'],
    data: function () {
        return {}
    },
    methods: {
        iconPressed: function(){
            this.$emit("clicked", this.expert);
        }
    },
    filters: {
        RatingAsTitle(rating) {
            return RatingAsTitle(rating);
        }
    }
}
</script>
    
<style scoped>
    .main {
        display: inline-block;
        width: 80px;
        height: auto;
        margin: 10px 2.5em;
    }

    .image {
        border: solid 1px gray;
        border-radius: 50%;
        display: block;
        width: 100%;
        height: 100%;
        content:url("../../assets/expert-icon.png");
    }

    .text {
        text-align: center;
    }
</style>