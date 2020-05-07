<template>
    <div class="main">
        <div class="banner">
            <h1>{{topic.Name}}</h1>
        </div>
        <experts id="experts"/>
    </div>
</template>

<script>
import router from '../router'
import experts from '@/components/expert/ExpertIcons.vue'

export default {
    name: 'SelectedTopic',
    components: {
        experts
    },
    data () {
        return {
            topic: null
        }
    },
    created() {
        this.topic = this.$store.getters.topic(this.$route.params.id);
    },
    methods: {
        goBack() {
            router.go(-1);
        }
    }
}
</script>

<style scoped>
    h1 {
        position: relative;
        text-align: center;
        top: 40%;
        color: green;
    }

    .banner {
        height: 150px;
        width: 100vw;
    }

    #experts {
        padding-top: 2em;
        display: table;
        margin: 0 auto;
        width: 70%;
    }
</style>