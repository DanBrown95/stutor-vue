<template>
<div>
    <h2 class="header">Browse by Category</h2>
    <v-row>
        <v-layout row justify-center class="categories">
            <v-col md="2" v-for="c in Categories" :key="c.Id">
                <Category :id="c.Id" :name="c.Name" :imageUrl="c.ImageUrl" class="category"></Category>
            </v-col>
        </v-layout>
    </v-row>
    <div class="wrapper"><v-btn class="inst-btn" :to="{name: 'BrowseCategory'}" rounded outlined>More Categories</v-btn></div>
</div>
</template>

<script>
import Category from '@/components/main/Category.vue'

export default {
    name: 'Categories',
    components: {
        Category
    },
    data() {
        return {
            Categories: this.$store.getters.allCategories
        }
    },
    computed: {

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