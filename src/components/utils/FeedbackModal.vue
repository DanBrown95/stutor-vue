<template>
    <v-dialog :value="value" @input="$emit('input')" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Feedback</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                  <StarRating v-model="updatedRating" :show-rating="false"></StarRating>
              </v-col>
              <v-col cols="12">
                  <v-textarea :counter="190" v-model="updatedInfo" maxlength="190" rows="4" label="Additional Information"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*Changes will not be saved until you press 'Save'</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clear">Close</v-btn>
          <v-btn :disabled="disabled" color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
    name: 'FeedbackModal',
    props: ['expertId', 'orderId', 'value', 'additionalInfo', 'rating'],
    components: {
        StarRating
    },
    data() {
        return {
            updatedRating: this.rating,
            updatedInfo: this.additionalInfo
        }
    },
    computed: {
        disabled() {
            return this.updatedRating == null
        }
    },
    methods: {
        close() {
            this.$emit('input');
        },
        async save(){
            const accessToken = await this.$auth.getAccessToken();
            fetch("https://localhost:44343/api/order/updateFeedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    Id: this.orderId,
                    rating: this.updatedRating,
                    additionalInfo: this.updatedInfo
                })
            })
            .then(response => response.json())
            .then(jsonData => {
                if(jsonData.status === 200){
                    this.$emit('onSave');
                    this.$emit('input');
                }else{
                    alert(jsonData.error)
                }
            });
        },
        clear() {
            this.$emit('input');
            this.updatedRating = this.rating;
            this.updatedInfo = this.additionalInfo;
        }
    }
}
</script>

<style scoped>
    .vue-star-rating {
        justify-content: center;
    } 
</style>