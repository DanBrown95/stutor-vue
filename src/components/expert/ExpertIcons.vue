<template>
    <div>
        <div class="center" v-if="experts.length > 0">
            <div v-for="x in experts" :key="x.id" class="inline-block">
                <ExpertIcon :expert="x" @clicked="expertSelected"></ExpertIcon>
            </div>
        </div>
        <div class="center" v-else>
            <h2>There are no experts available for this topic at this time &#9785;</h2>
        </div>
    </div>
</template>

<script>
import ExpertIcon from '@/components/expert/ExpertIcon.vue'

export default {
    name: 'ExpertIcons',
    props: ['TopicId'],
    components: {
        ExpertIcon
    },
    data() {
        return {
            experts: []
        }
    },
    mounted() {
        fetch("https://localhost:44343/api/expert/TopicExpertsByTopicId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topicId: this.TopicId,
                userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone 
            })
        })
        .then(response => response.json())
        .then(jsonData => {
            this.experts = jsonData;
        });
    },
    methods: {
        expertSelected: function(e) {
            this.$emit("expertSelected", e);
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