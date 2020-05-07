<template>
    <div>
        <div class="experts">
            <div v-for="x in Experts" :key="x.Id" class="inline-block">
                <ExpertIcon :id="x.Id" :price="x.Price" :rating="x.Rating" ></ExpertIcon>
            </div>
        </div>
    </div>
</template>

<script>
import ExpertIcon from '@/components/expert/ExpertIcon.vue'

export default {
    name: 'ExpertIcons',
    components: {
        ExpertIcon
    },
    data() {
        return {
            Experts: this.$store.getters.allExperts
        }
    },
        
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