<template>
    <div>
        <div class="experts">
            <div v-for="x in experts" :key="x.Id" class="inline-block">
                <ExpertIcon :id="x.Id" :price="x.Price" :rating="x.Rating" @clicked="expertSelected"></ExpertIcon>
            </div>
            <div v-if="experts.length < 1">
                <h2>There are no experts available for this topic at this time &#9785;</h2>
            </div>
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
            experts: this.$store.getters.expertsByTopicId(this.TopicId)
        }
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

    .experts {
        text-align: center;
    }
</style>