<template>
    <div class="banner">
        <div class="main">
            <!-- Categories -->
            <v-container v-show="!selectedCategory">
                <ListWithSearch :fullArray="categories" @listSelectedItem="selectCategory"/>
            </v-container>
            
            <!-- Topics -->
            <v-container v-show="selectedCategory">
                <ListWithSearch :fullArray="topics" :searchReset="searchReset" @listSelectedItem="selectTopic"/>
                <v-btn @click="back">Back</v-btn>
            </v-container>
        </div>
    </div>
</template>

<script>
import ListWithSearch from "@/components/useful/ListWithSearch.vue";

export default {
    name: 'browseCategories',
    components: {
        ListWithSearch
    },
    data () {
        return {
            categories: [],
            selectedCategory: null,

            topics: [],
            selectedTopic: null,

            searchReset: false
        }
    },
    created() {
        this.categories = this.$store.getters.allCategories;
    },
    methods: {
        selectCategory(item) {
            this.selectedCategory = item;
            this.searchReset = false;
        },
        selectTopic(item) {
            this.selectedTopic = item;
        },
        back() {
            this.selectedCategory = null;
            this.searchReset = true;
        }
    },
    watch: {
        selectedCategory: function () {
            if(this.selectedCategory){
                this.topics = this.$store.getters.topics(this.selectedCategory.Id);
            }
        },
        selectedTopic: function() {
            this.$router.push({name: 'Topic', params: {id: this.selectedTopic.Id} });
        }
    }
}
</script>

<style scoped>
    .banner {
        background-image: url("../assets/categories-banner.png");
        background-repeat: no-repeat;
        background-size: cover;
        height: 940px;
    }

    .main {
        padding: 7em 0;
    }
</style>