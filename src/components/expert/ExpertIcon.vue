<template>
    <div class="main">
        <a @click.stop="iconPressed">
            <img class="image">
        </a>
        <div class="overlay">
            <div class="text">${{ this.price }}</div>
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
    },
    methods: {
        iconPressed: function(){
            this.$emit("clicked", this.id);
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