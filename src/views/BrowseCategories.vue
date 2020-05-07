<template>
    <div class="main">
        <!-- Categories -->
        <v-container v-show="!selectedCategory">
            <ListWithSearch :fullArray="categories" @listSelectedItem="selectCategory"/>
        </v-container>
        
        <!-- Topics -->
        <v-container v-show="selectedCategory">
            <ListWithSearch :fullArray="topics" @listSelectedItem="selectTopic"/>
            <v-btn @click="selectedCategory = null">Back</v-btn>
        </v-container>
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
            selectedTopic: null
        }
    },
    created() {
        this.categories = this.$store.getters.allCategories;
    },
    methods: {
        selectCategory(item) {
            this.selectedCategory = item;
        },
        selectTopic(item) {
            this.selectedTopic = item;
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
    .main {
        margin-top: 7em;
    }
</style>