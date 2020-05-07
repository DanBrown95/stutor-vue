<template>
    <div class="main">
        <router-link :to="'/'" >
            <img class="image">
        </router-link>
        <div class="overlay">
            <div class="text">{{ this.price }}</div>
            <div class="text">{{ this.rating }}/5 Rating</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExpertIcon',
    props: ['id', 'rating', 'price'],
    data: function () {
        return {
        }
    }
}
</script>
    
<style scoped>
    .main {
        display: inline-block;
        width: 80px;
        height: auto;
        margin: 0px 2.5em;
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