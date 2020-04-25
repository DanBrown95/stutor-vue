<template>
    <div class="search">
        <v-autocomplete class="vtext"
            :items="getTopics"
            item-text="Name"
            item-value="Id"
            :outlined="false"
            :rounded="true"
            :solo="true"
            :single-line="true"
            append-icon='fa fa-search'
        >
        </v-autocomplete>
    </div>
</template>

<script>
export default {
    name: "Search",
    data: function () {
        return {
            val: ''
        }
    },
    computed: {
        getSearchResults: function() {
            return this.$store.getters.allCategories.filter(item => item.Name.toLowerCase().includes(this.val.toLowerCase())).map(n => n.Name)
        },
        getTopics: function() {
            return this.$store.getters.allTopics
        }
    }
}
</script>

<style scoped>
    .search {
        margin: auto;
        width: 40%;
        position: relative;
        top: 50%;
    }

    .vtext {
        font-size: 1.8em;
        text-align: center;
    }
</style>