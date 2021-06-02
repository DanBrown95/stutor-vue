<template>
    <div v-if="!searching">
        <div class="center" v-if="hasExperts">
            <template v-if="(this.experts.localExperts && this.experts.localExperts.length)">
                <v-card class="mx-auto">
                    <v-card-title>
                    <span class="title font-weight-light">Local Experts</span>
                    </v-card-title>

                    <v-card-text>
                        <div v-for="x in experts.localExperts" :key="x.id" class="inline-block">
                            <ExpertIcon :expert="x" @clicked="expertSelected"></ExpertIcon>
                        </div>
                    </v-card-text>
                </v-card>
            </template>
            <br />
            <template v-if="(this.experts.distantExperts && this.experts.distantExperts.length)">
                <v-card class="mx-auto">
                    <v-card-title>
                    <span class="title font-weight-light">Distant Experts</span>
                    </v-card-title>

                    <v-card-text>
                        <div v-for="x in experts.distantExperts" :key="x.id" class="inline-block">
                            <ExpertIcon :expert="x" @clicked="expertSelected"></ExpertIcon>
                        </div>
                    </v-card-text>
                </v-card>
            </template>
        </div>
        <div class="center" v-else>
            <h2>There are no experts available for this topic at this time &#9785;</h2>
        </div>
    </div>
</template>

<script>
import ExpertIcon from '@/components/expert/ExpertIcon.vue'
import { TopicExpertsByTopicId as _expertRepo_TopicExpertsByTopicId } from "@/store/expert/repository.js";

export default {
    name: 'ExpertIcons',
    props: ['TopicId'],
    components: {
        ExpertIcon
    },
    data() {
        return {
            experts: [],
            searching: false
        }
    },
    computed: {
        hasExperts() {
            return (this.experts.localExperts && this.experts.localExperts.length) || (this.experts.distantExperts && this.experts.distantExperts.length);
        }
    },
    mounted() {
        this.getTopicExperts();
    },
    methods: {
        expertSelected: function(e) {
            this.$emit("expertSelected", e);
        },
        async getTopicExperts() {
            this.searching = true;
            var userId = this.$parent.user['https://stutor.com/id']
            const accessToken = await this.$auth.getTokenSilently();
            this.experts = await _expertRepo_TopicExpertsByTopicId(accessToken, this.TopicId, Intl.DateTimeFormat().resolvedOptions().timeZone, userId);
            this.searching = false;
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
</style>