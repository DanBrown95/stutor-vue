<template>
<div>
    <h2 class="header">Browse by Categories</h2>
    <div class="categories">
        <div v-for="c in Categories" :key="c.Id">
            <Category :Id="c.Id" :Name="c.Name" :ImageUrl="c.ImageUrl" ></Category>
        </div>
    </div>
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
        margin: 3em 0em;
        text-align: center;
        color: red;
        font-size: 2em;
    }
    .categories {
        width: 100%;
        margin-left: 4%;
    }
</style>