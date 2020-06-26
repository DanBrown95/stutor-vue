<template>
    <div>
        <div class="top">
            <div style="padding-top: 12%; padding-bottom: 4em;">
                <h1>Need Assistance?</h1>
                <p>We're sorry you are having issues. Feel free to drop us a line.</p>
            </div>
            <div>
                <div class="col-md-3 inline-block">
                    <div class="contact-img">
                        <v-icon x-large class="icon">{{emailSvgPath}}</v-icon>
                    </div>
                    <div class="contact-info">
                        <p>Support</p><br>
                        <p>support@stutor.com</p>
                        <br/><br/>
                    </div>
                </div>
                <div class="col-md-3 inline-block">
                    <div class="contact-img">
                        <v-icon x-large class="icon">{{phoneSvgPath}}</v-icon>
                    </div>
                    <div class="contact-info">
                        <p>Support</p><br>
                        <p>Ph: 319-540-5044</p>
                        <br/>
                        <br/>
                    </div>
                </div>
                <div class="col-md-3 inline-block">
                    <div class="contact-img">
                        <v-icon x-large class="icon">{{locationSvgPath}}</v-icon>
                    </div>
                    <div class="contact-info">
                        <p>Mailing Address</p> <br>
                        <p>Stutor Inc.</p>
                        <p>1150 F Ave</p>
                        <p>Marion, IA, 52302</p>
                    </div>
                </div>
            </div>
        </div> <!-- End of top -->
        <div class="middle">
            <ContactForm></ContactForm>
        </div>
        <div class="bottom">
            <iframe style="width: 100%; height: 100%;" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112879.13737228615!2d-91.6577796551938!3d41.97366874944675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1592428175884!5m2!1sen!2sus" aria-hidden="false" tabindex="0"></iframe>
        </div>
    </div>
</template>

<script>
import { mdiEmailMarkAsUnread, mdiCellphoneAndroid, mdiMapMarker } from '@mdi/js';
import ContactForm from "@/components/shared/ContactForm.vue";

export default {
    components: {
        ContactForm
    },
    data: () => ({
      emailSvgPath: mdiEmailMarkAsUnread,
      phoneSvgPath: mdiCellphoneAndroid,
      locationSvgPath: mdiMapMarker
    }),
}
</script>

<style scoped>
    .top {
        background-color: #E9ECEE;
        text-align: center;
        padding-bottom: 5em;
    }
    .middle {
        /* height: 600px; */
    }
    .bottom {
        height: 500px;
    }

    .inline-block {
        display: inline-block;
        margin-bottom: 1em;
    }

    p {
        margin-bottom: 0%;
    }

    .icon {
        color: #DEA800;
    }
</style>