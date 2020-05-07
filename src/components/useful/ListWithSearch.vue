<template>
    <div class="main">
        <v-container>
            <v-layout row wrap>
                <v-flex sm4 offset-sm4>
                    <v-text-field v-model="searchText" dense solo append-icon="fas fa-search"></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-sm>
            <div>
                <v-layout row>
                    <v-col sm="4" v-for="(item, index) in this.restrictedArray" :key="index" @click="selectItem(item)">
                        <v-chip style="width: 100%;" text-color="red" class="ma-2" large> {{ item.Name }} </v-chip>
                    </v-col>
                </v-layout>
                <h5 class="items-visible"> ({{restrictedArray.length}} of {{this.fullArray.length}})</h5>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "listWithSearch",
    props: ["fullArray"],
    data() {
        return {
            searchText: null,
            restrictedArray: [],
            selectedItem: null
        }
    },
    created() {
        this.restrictedArray = this.fullArray.slice(0, 9);
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item;
        }
    },
    watch: {
        searchText: function(val) {
            if(val != null){
                this.restrictedArray = this.fullArray.filter(item => item.Name.toLowerCase().includes(val.toLowerCase()));
            }
        },
        fullArray: function () {
            this.selectedItem = null;
            this.restrictedArray = this.fullArray.slice(0, 9);
        },
        selectedItem: function() {
            this.$emit('listSelectedItem', this.selectedItem);
        }
    }
}
</script>

<style scoped>
    .items-visible {
        position: relative;
        float: right;
    }
</style>