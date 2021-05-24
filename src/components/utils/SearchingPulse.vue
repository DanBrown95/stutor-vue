<template>
    <div v-if="showSearching" class="container">
        <h3 v-if="!hideMessage" :style="styles" class="title loading">
            {{templateText}}
        </h3>
        <div class="pulsating-circle"></div>
    </div>
</template>

<script>
/**
 * Pulsating circle with customizable message
 * To be used as a animated replacement to static "Searching" text
 * @displayName Searching Pulse
 */
export default {
    name: 'SearchingPulse',
    props: {
        /**
         * The toggle to hide/show the component
         */
        showSearching: {
            type: Boolean,
            default: false
        },
        /**
         * Text to show the header
         */
        searchingText: {
            type: String,
            default: "Searching"
        },
        /**
         * Whether to hide the loading message
         */
        hideMessage: {
            type: Boolean,
            default: false
        },
        /**
         * The color for the searching message
         */
        color: {
            type: String,
            default: "black"
        },
        /**
         * Whether to show alternate text on long searches
         */
        allowAlternateText: {
            type: Boolean,
            default: false
        },
        /**
         * The time to which display the alternative searchingText for long searches
         */
        interval: {
            type: Number,
            default: 15000
        },
        /**
         * Alternative text to show during long searches
         */
        alternateText: {
            type: String,
            default: "We are still searching. Please continue to wait"
        }
    },
    data() {
        return {
            templateText: this.searchingText,
            timeout: null
        }
    },
    computed: {
        styles() {
            return "color: " + this.color + ";";
        }
    },
    methods: {
        changeText() {
            this.templateText = this.alternateText;
        }
    },
    watch: {
        showSearching(e) {
            if(e === true && this.allowAlternateText){
                this.timeout = setTimeout(this.changeText, this.interval);
            }else{
                clearTimeout(this.timeout);
                this.timeout = null;
                this.templateText = this.searchingText;
            }
        }
    }
}
</script>

<style scoped>

    .title {
        position: relative;
        top: 10%;
        text-align: center;
    }

    .container {
        width: 100%;
        height: 150px;
    }

    .pulsating-circle {
        display: inline-block;
        margin: 0 auto;
        width: 70px;
        position: relative;
        left: 50%;
        top: 40%;
        transform: translateX(-50%) translateY(-50%);
        height: 70px;
    }

    .pulsating-circle:before {
        content: "";
        position: relative;
        display: block;
        width: 300%;
        height: 300%;
        box-sizing: border-box;
        margin-left: -100%;
        margin-top: -100%;
        border-radius: 100px;
        background-color: #01a4e9;
        -webkit-animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }

    .pulsating-circle:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 35px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        -webkit-animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
        animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
    }

    @-webkit-keyframes pulse-ring {
        0% {
            transform: scale(0.33);
        }
        80%, 100% {
            opacity: 0;
        }
    }

    @keyframes pulse-ring {
        0% {
            transform: scale(0.33);
        }
        80%, 100% {
            opacity: 0;
        }
    }

    @-webkit-keyframes pulse-dot {
        0% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.8);
        }
    }

    @keyframes pulse-dot {
        0% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.8);
        }
    }

    .loading::after {
      display: inline-block;
      animation: dotty steps(1,end) 5s infinite;
      content: '';
    }
    
    @keyframes dotty {
        0%   { content: ''; }
        25%  { content: '.'; }
        50%  { content: '..'; }
        75%  { content: '...'; }
        100% { content: ''; }
    }
</style>