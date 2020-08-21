<template>
    <div class="banner">
        <div class="main">
            <ListWithSearch :fullArray="topics" @listSelectedItem="setTopic" />
        </div>
        <v-btn rounded color="blue lighten-3" @click="back" id="btn-back">Back</v-btn>
    </div>
</template>

<script>
import ListWithSearch from "@/components/useful/ListWithSearch.vue";

export default {
    name: 'selectedCategory',
    components: {
        ListWithSearch
    },
    data () {
        return {
            categoryId: null,
            topics: [],
            selectedTopic: null
        }
    },
    created() {
        this.categoryId = this.$route.params.id;
        this.topics = this.$store.getters.topics(this.categoryId);
    },
    methods: {
        setTopic (topic) {
            this.selectedTopic = topic;
        },
        back(){
            history.back();
        }
    },
    watch: {
        selectedTopic: function () {
            this.$router.push({name: 'Topic', params: {id: this.selectedTopic.Id} });
        }
    }
}
</script>

<style scoped>
    .banner {
        background: url('../assets/topics-banner.jpg');
        background-size:cover;
        min-height: 100vh;
    }

    .main {
        padding-top: 7em;
    }

    .items-visible {
        position: relative;
        float: right;
    }

    #btn-back {
        position: fixed;
        left: 2%;
        bottom: 5%;
    }
</style>