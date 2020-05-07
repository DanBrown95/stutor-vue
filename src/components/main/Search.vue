<template>
    <div class="search">
        <v-autocomplete class="vtext"
            v-model="selectedTopic"
            :items="getTopics"
            item-text="Name"
            item-value="Id"
            :outlined="false"
            :rounded="true"
            :solo="true"
            :single-line="true"
            append-icon='fa fa-search'
            @change="topicSelected()"
            :hide-no-data="true"
            :allow-overflow="false"
            no-data-text="No topic found"
            return-object
            :search-input.sync="searchInput"
        >
        </v-autocomplete>
    </div>
</template>

<script>
export default {
    name: "Search",
    data: function () {
        return {
            searchInput: null,
            selectedTopic: null,
        }
    },
    methods: {
        topicSelected() {
            if (this.selectedTopic != null) {
                this.$router.push({name: 'Topic', params: {id: this.selectedTopic.Id} });
            }
        }
    },
    computed: {
        getTopics: function() { // Ensure atleast 2 characters are typed before showing any topics.
            if(this.searchInput && this.searchInput.length > 1){
                return this.$store.getters.allTopics
            }
            return []
        }
    }
}
</script>

<style scoped>
    .search {
        position: relative;
    }

    .vtext {
        font-size: 1.8em;
        text-align: center;
    }
</style>