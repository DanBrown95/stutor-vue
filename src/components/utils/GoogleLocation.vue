<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    v-model="locationInput"
                    v-on:keyup="manualChange"
                    :rules="[validLocation]"
                    label="Current Location"
                    type="text"
                    color="#F44336"
                    id="autocomplete"
                    class="v-text-field"
                    disabled
                    readonly
                ></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-btn icon @click="locatorButtonPressed" class="current-location">
                    <v-icon aria-hidden="true" :color="validLocation ? 'black' : 'green'">mdi-crosshairs-gps</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn rounded color="primary" @click="updateClicked" v-if="existingLocation && existingLocation.address != address && validLocation">
                    <v-icon left>
                        mdi-pencil
                    </v-icon>
                        Save
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios"

export default {
    name: 'GoogleLocation',
    props: ["autoLocate", "existingLocation"],
    data() {
        return {
            locationInput: "",
            address: "",
            coords: {lat: 0.0, lng: 0.0},
            validLocation: false,
            grantedPermissions: false
        }
    },
    mounted() {
        // by default get user location from browser.
        if(this.autoLocate){
            this.locatorButtonPressed();
        }
    },
    watch: {
        existingLocation: function(value){
            this.address = value.address ?? "";
            this.locationInput = value.address ?? "";
            this.coords.lat = value.coords.lat ?? 0.0;
            this.coords.lng = value.coords.lng ?? 0.0;
            this.validLocation = true;
        }
    },
    methods: {
        locatorButtonPressed() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.getStreetAddressFrom(position.coords.latitude, position.coords.longitude)
                },
                error => {
                    if(error.code == 1){
                        this.grantedPermissions == false
                        const vm = {
                            address: this.address,
                            coords: this.coords,
                            isValid: this.validLocation,
                            grantedPermissions: this.grantedPermissions
                        }
                        this.$emit('locationChange', vm);
                    }
                    console.log(error.message);
                }
            );
        },
        async getStreetAddressFrom(lat, long) {
            try {
                var { data } = await axios.get(
                "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    lat +
                    "," +
                    long +
                    "&key=AIzaSyCiz7dvmI6a0q697JeMPnPneuXpxXqRJpk"
                );
                if(data.error_message) {
                    console.log(data.error_message)
                } else {
                    var res = data.results.filter(x => x.types.indexOf('locality') != -1)[0];
                    this.SetAddressToInputField(res.formatted_address, res.geometry.location);
                }
            } catch (error) {
                console.log(error.message);
            } 
        },
        SetAddressToInputField(address, location){
            this.locationInput = address;
            this.address = address;
            this.coords.lat = location.lat;
            this.coords.lng = location.lng;
            this.validLocation = true;
            this.grantedPermissions = true;

            const vm = {
                address: this.address,
                coords: this.coords,
                isValid: this.validLocation,
                grantedPermissions: this.grantedPermissions
            }
            this.$emit('locationChange', vm);
        },
        manualChange(){ // if someone manually inputs location, set valid to false unless they correct their change back
            if(this.locationInput !== this.address){
                this.validLocation = false;
            }else{
                this.validLocation = true;
            }

            const vm = {
                address: this.address,
                coords: this.coords,
                isValid: this.validLocation,
                grantedPermissions: this.grantedPermissions
            }
            this.$emit('locationChange', vm);
        },
        updateClicked(){
            const vm = {
                address: this.address,
                coords: this.coords,
                isValid: this.validLocation,
                grantedPermissions: this.grantedPermissions
            }

            this.$emit("saveLocation", vm);
        }
    }
}
</script>


<style scoped>
    .v-text-field{
        width: 100%;
        display: inline-block !important;
    }

    .invalid {
        border-bottom: 1px solid red;
    }
</style>