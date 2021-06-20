<template>
    <div class="banner">
        <div class="main">
            <ListWithSearch v-if="topics" :fullArray="topics" @listSelectedItem="setTopic" />
        </div>
        <ButtonBack/>
    </div>
</template>

<script>
import ListWithSearch from "@/components/utils/ListWithSearch.vue";
import ButtonBack from "@/components/utils/ButtonBack.vue";
import { GetAllByCategoryId as _topicRepo_GetAllByCategoryId } from "@/store/topic/repository.js";

export default {
    name: 'selectedCategory',
    components: {
        ListWithSearch,
        ButtonBack
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
        this.fetchTopics();
    },
    methods: {
        async fetchTopics() {
            this.topics = await _topicRepo_GetAllByCategoryId(this.categoryId);
        },
        setTopic (topic) {
            this.selectedTopic = topic;
        }
    },
    watch: {
        selectedTopic: function () {
            this.$router.push({name: 'Topic', params: {id: this.selectedTopic.id} });
        }
    }
}
</script>

<style scoped>
    .banner {
        background: url('../../assets/topics-banner.jpg');
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
</style>