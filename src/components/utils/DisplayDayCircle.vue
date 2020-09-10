<template>
    <div class="circle" v-bind:style="{backgroundColor: color}">
        {{ day }}
    </div>
</template>

<script>
export default {
    name: "DisplayDayCircle",
    props: ["day","color"],
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .circle {
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 50%;
        font-size: 12px;
        color: #fff;
        text-align: center;
        display: inline-block;
    }
</style>