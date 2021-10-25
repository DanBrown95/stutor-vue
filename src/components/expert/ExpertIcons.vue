<template>
    <div v-if="!searching">
        <div class="center" v-if="hasExperts">
            <template v-if="(this.localExperts && this.localExperts.length)">
                <v-card class="mx-auto">
                    <v-card-title>
                    <span class="title font-weight-light">Local Experts</span>
                    </v-card-title>

                    <v-card-text>
                        <div v-for="x in localExperts" :key="x.id" class="inline-block">
                            <ExpertIcon :expert="x" @clicked="expertSelected"></ExpertIcon>
                        </div>
                    </v-card-text>
                </v-card>
            </template>
            <br />
            <template v-if="(this.distantExperts && this.distantExperts.length)">
                <v-card class="mx-auto">
                    <v-card-title>
                    <span class="title font-weight-light">Distant Experts</span>
                    </v-card-title>

                    <v-card-text>
                        <div v-for="x in distantExperts" :key="x.id" class="inline-block">
                            <ExpertIcon :expert="x" @clicked="expertSelected"></ExpertIcon>
                        </div>
                    </v-card-text>
                </v-card>
            </template>
        </div>
        <div class="center" v-else>
            <h2>There are no experts available for this topic at this time &#9785;</h2>
            <br />
            <div>
                <h2>Similar topics you could try: </h2>
                <v-container grid-list-sm class="similar-topics-container">
                    <v-layout row justify-center>
                        <v-col sm="4" v-for="topic in relatedTopics" :key="topic.id">
                            <router-link :to="{name: 'Topic', params: { id: topic.id } }">
                                <v-chip style="width: 100%; cursor: pointer; justify-content: center; background-color: white;" text-color="red" class="ma-2" large> {{ topic.name }} </v-chip>
                            </router-link>
                        </v-col>
                    </v-layout>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
import ExpertIcon from '@/components/expert/ExpertIcon.vue'
import { TopicExpertsByTopicId as _expertRepo_TopicExpertsByTopicId } from "@/store/expert/repository.js";
import { CompareExpertsByRating } from '@/helpers/Compare.js';
import { GetRelatedTopics as _topicRepo_GetRelatedTopics } from '@/store/topic/repository.js'; 

export default {
    name: 'ExpertIcons',
    props: ['TopicId'],
    components: {
        ExpertIcon
    },
    data() {
        return {
            experts: [],
            searching: false,
            relatedTopics: []
        }
    },
    computed: {
        hasExperts() {
            return (this.experts.localExperts && this.experts.localExperts.length) || (this.experts.distantExperts && this.experts.distantExperts.length);
        },
        localExperts() {
            if(this.experts.localExperts && this.experts.localExperts.length){
                return this.experts.localExperts.slice().sort(CompareExpertsByRating);
            }
            return []
        },
        distantExperts(){
            if(this.experts.distantExperts && this.experts.distantExperts.length){
                return this.experts.distantExperts.slice().sort(CompareExpertsByRating);
            }
            return []
        }
    },
    mounted() {
        this.getTopicExperts();
        this.getRelatedTopics();
    },
    methods: {
        expertSelected: function(e) {
            this.$emit("expertSelected", e);
        },
        async getTopicExperts() {
            this.searching = true;
            var userId = this.$auth.user['https://stutor.com/id'];
            const accessToken = await this.$auth.getTokenSilently();
            this.experts = await _expertRepo_TopicExpertsByTopicId(accessToken, this.TopicId, Intl.DateTimeFormat().resolvedOptions().timeZone, userId);
            this.searching = false;
        },
        async getRelatedTopics() {
            this.relatedTopics = await _topicRepo_GetRelatedTopics(this.TopicId);
        }
    },
    watch: {
        searching: function(e){
            this.$emit("searching", e);
        }
    }
        
}
</script>

<style scoped>
    .inline-block{
        display: inline-block;
    }

    .center {
        text-align: center;
    }

    .similar-topics-container a {
        text-decoration: none;
    }
</style>