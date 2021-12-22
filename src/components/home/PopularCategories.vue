<template>
<div>
    <h2 class="header">Browse by Category</h2>
    <v-row justify="center" v-if="categories && categoriesLoaded">
        <v-col md="2" v-for="c in categories" :key="c.Id" style="align-content: center;">
            <Category :id="c.category.id" :name="c.category.name" :imageUrl="c.imageUrl" class="category"></Category>
        </v-col>
    </v-row>
    <v-row justify="center" v-else-if="(categories == [] || categories.length < 1) && !categoriesLoaded">
        <v-col md="2" v-for="i in 8" :key="i" style="align-content: center;">
            <SkeletonImage class="category"></SkeletonImage>
        </v-col>
    </v-row>
    <div class="wrapper"><v-btn class="inst-btn" :to="{name: 'BrowseCategory'}" rounded outlined>More Categories</v-btn></div>
</div>
</template>

<script>
import Category from '@/components/home/Category.vue'
import { GetAllPopular as _categoryRepo_GetAllPopular } from '@/store/category/repository.js';
import SkeletonImage from '@/components/utils/SkeletonImage.vue'

export default {
    name: 'Categories',
    components: {
        Category,
        SkeletonImage
    },
    data() {
        return {
            categories: [],
            categoriesLoaded: false
        }
    },
    created() {
      this.getAllPopularCategories();
    },
    mounted() {
        this.applyOverlay();
    },
    methods: {
        async getAllPopularCategories() {
            this.categories = await _categoryRepo_GetAllPopular();
            this.categoriesLoaded = true;
        },
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
        margin-left: auto;
        margin-right: auto;
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