<template>
    <v-flex style="max-width: 30%; min-width: 30%; margin: 10px 10px;">
        <v-card outlined elevation="5">
            <v-list-item two-line>
                <v-list-item-content style="width: 90%;">
                    <v-list-item-title class="text-h5 mb-1">
                        {{job.title}}
                    </v-list-item-title>
                    <v-list-item-subtitle><i class="fas fa-map-marker-alt" style="color: red;"></i>&nbsp;{{job.location}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content style="flex: none !important;">
                    <a :href="job.url" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'AvailableJob',
    props: ['job']
}
</script>

<style scoped>

</style>
