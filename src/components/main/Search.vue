<template>
    <div class="search">
        <v-autocomplete class="vtext"
            v-model="selectedTopic"
            :items="topics"
            item-text="name"
            item-value="id"
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
import { GetBySubstring as _topicRepo_GetBySubstring } from '@/store/topic/repository.js';

export default {
    name: "Search",
    data: function () {
        return {
            searchInput: null,
            selectedTopic: null,
            topics: []
        }
    },
    methods: {
        topicSelected() {
            if (this.selectedTopic != null) {
                this.$router.push({name: 'Topic', params: {id: this.selectedTopic.id} });
            }
        },
        async getTopics(val) {
            if(val && val.length > 1){
                this.topics = await _topicRepo_GetBySubstring(val);
            }else{
                this.topics = [];
            }
        }
    },
    watch: {
        searchInput(val){ 
            this.getTopics(val);
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