<template>
    <div>
        <div class="experts">
            <div v-for="x in Experts" :key="x.Id" class="inline-block">
                <ExpertIcon :id="x.Id" :price="x.Price" :rating="x.Rating" @clicked="expertSelected"></ExpertIcon>
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
            Experts: this.$store.getters.expertsByTopicId(this.TopicId)
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