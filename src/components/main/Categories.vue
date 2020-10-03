<template>
<div>
    <h2 class="header">Browse by Category</h2>
    <v-row>
        <v-layout row justify-center class="categories">
            <v-col md="2" v-for="c in categories" :key="c.Id">
                <Category :id="c.id" :name="c.name" :imageUrl="c.imageUrl" class="category"></Category>
            </v-col>
        </v-layout>
    </v-row>
    <div class="wrapper"><v-btn class="inst-btn" :to="{name: 'BrowseCategory'}" rounded outlined>More Categories</v-btn></div>
</div>
</template>

<script>
import Category from '@/components/main/Category.vue'
import { ALL_CATEGORIES_QUERY } from '../../graphql/category/queries'

export default {
    name: 'Categories',
    components: {
        Category
    },
    data() {
        return {
            categories: []
        }
    },
    apollo: {
      categories: {
        query: ALL_CATEGORIES_QUERY
      }
    },
    mounted() {
        this.applyOverlay();
    },
    methods: {
        applyOverlay() { // automatically show/hide overlay on a timer
            setTimeout(function tick() {
                var elements = document.getElementsByClassName("overlay");
                elements.forEach(element => {
                    element.classList.toggle("visible");
                });
                setTimeout(tick, 5000); // (*)
            }, 5000);
        }
    }

}
</script>

<style scoped>
    .header {
        margin: 3em 0px 2em 0px;
        text-align: center;
        color: #D0021B;
        font-size: 2em;
    }
    .categories {
        width: 100%;
    }

    .category {
        width: 10em;
        height: 10em;
    }

    /* Styling for the browse categories button */
    .wrapper {
        margin: 1em auto 5em;
        text-align: center;
    }
    .inst-btn { 
        text-transform: uppercase; 
        background-color:#D0021B;
    }
    .inst-btn{ 
        color: white; 
        padding: 5px; 
        margin: 0; 
        font-family: "arial"; 
    }
    .inst-btn:hover {
        background-color: rgba(206, 27, 48, 0.89);
    }
    .wrapper:before,.wrapper:after{
        content:" ";
        width: 10%;
        height: 2px;
        margin: 0 10px;
        background-color:grey;
        display:inline-block;
    }
</style>