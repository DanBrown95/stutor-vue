<template>
    <div class="category">
        <router-link :to="{name: 'Category', params: { id: this.id } }" >
            <img class="image" :src="this.imageUrl" :alt="this.name">
            <div class="overlay">
                <div class="text">{{ this.name }}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['id', 'name', 'imageUrl'],
    data: function () {
        return {
            // styleObject: {
            //     backgroundImage: 'url(' + this.ImageUrl + ')'
            // }
        }
    }
}
</script>

<style scoped>
    
    .category {
        position: relative;
        margin: 2em;
    }

    .image {
        display: block;
        width: 100%;
        height: 100%;
    }

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
        background-color: #008CBA;
    }

    .category:hover .overlay {
        opacity: 1;
    }

    .visible {
        opacity: 1;
    }

    .text {
        color: white;
        font-size: 1.5em;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }

    @media only screen and (max-width: 1265px) {

        .text { 
            font-size: 10px; 
        }

    }

</style>