<template>
    <div>
        <div class="top">
            <div style="padding-top: 12%; padding-bottom: 4em;">
                <h1>Need Assistance?</h1>
                <p>We're sorry you are having issues. Feel free to drop us a line.<br> Or use our online chat feature <a class="purechat-button-expand">here</a></p>
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
        <v-container id="faq-section">
            <h3>FAQ's</h3>
            <v-row justify="center">
                <v-col cols="7">
                    <VueFaqAccordion borderColor="#DEA800" activeColor="#D0021B" :items="faqs"/>
                </v-col>
            </v-row>
        </v-container>
        <div id="contact-section" style="padding-top: 2em;">
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
import VueFaqAccordion from 'vue-faq-accordion';
import faqs from '@/store/faq/repository.js';

export default {
    components: {
        ContactForm,
        VueFaqAccordion
    },
    data() {
        return { 
            emailSvgPath: mdiEmailMarkAsUnread,
            phoneSvgPath: mdiCellphoneAndroid,
            locationSvgPath: mdiMapMarker,

            faqs: faqs.faqs,
        }
    }
}
</script>

<style scoped>
    .top {
        background-color: #E9ECEE;
        text-align: center;
        padding-bottom: 5em;
    }

    #faq-section {
        min-height: 600px;
        padding-top: 4em;
    }

    #faq-section h3 {
        width: 100%;
        text-align: center;
        margin-bottom: 1em;
        font-size: 2em;
    }

    #faq-section div.row {
        margin-bottom: 3em;
    }

    #contact-section {
        background-color: #E9ECEE;
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

<style>
    #faq-section .faq-wrapper {
        max-width: none;
    }
</style>