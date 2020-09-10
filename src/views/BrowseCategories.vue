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
            fetch("https://localhost:44343/api/category/GetAll", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(jsonData => {
                this.categories = jsonData;
            });
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
        selectedCategory: function () {
            if(this.selectedCategory){
                fetch("https://localhost:44343/api/topic/GetTopicsByCategory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: this.selectedCategory.id
                })
                .then(response => response.json())
                .then(jsonData => {
                    this.topics = jsonData;
                });
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
        background-image: url("../assets/categories-banner.png");
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 100vh;
    }

    .main {
        padding-top: 5%;
    }
</style>