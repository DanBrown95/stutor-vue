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
        <ButtonBack/>
    </div>
</template>

<script>
import ListWithSearch from "@/components/utils/ListWithSearch.vue";
import ButtonBack from "@/components/utils/ButtonBack.vue";
import { GetAll as _categoryRepo_GetAll } from "@/store/category/repository.js";
import { GetAllByCategoryId as _topicRepo_GetAllByCategoryId } from "@/store/topic/repository.js";

export default {
    name: 'browseCategories',
    components: {
        ListWithSearch,
        ButtonBack
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
        this.fetchCategories();
    },
    methods: {
        async fetchCategories(){
            this.categories = await _categoryRepo_GetAll();
        },
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
        async selectedCategory() {
            if(this.selectedCategory){
                this.topics = await _topicRepo_GetAllByCategoryId(this.selectedCategory.id);
            }
        },
        selectedTopic: function() {
            this.$router.push({name: 'Topic', params: {id: this.selectedTopic.id} });
        }
    }
}
</script>

<style scoped>
    .banner {
        /* background-image: url("../assets/categories-banner.png"); */
        background-color: #A8D0E6;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 100vh;
    }

    .main {
        padding-top: 5%;
    }
</style>