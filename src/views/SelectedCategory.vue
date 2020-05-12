<template>
    <div class="banner">
        <div class="main">
            <ListWithSearch :fullArray="topics" @listSelectedItem="setTopic" />
        </div>
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
        height: 940px;
    }

    .main {
        padding-top: 7em;
    }

    .items-visible {
        position: relative;
        float: right;
    }
</style>