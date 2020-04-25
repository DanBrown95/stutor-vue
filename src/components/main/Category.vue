<template>
    <div class="category">
        <router-link :to="'/'+this.Name" >
            <img class="image" :src="this.ImageUrl" :alt="this.Name">
            <div class="overlay">
                <div class="text">{{ this.Name }}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['Id', 'Name', 'ImageUrl'],
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
        float: left;
        width: 15%;
        height: 15vw;
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

    .text {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }

</style>