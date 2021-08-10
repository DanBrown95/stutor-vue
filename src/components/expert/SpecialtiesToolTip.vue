<template>
    <div class="tooltip-box">
    <slot />
    <div class="tooltip" v-if="specialties.length">
        <ul>
            <li class="text" v-for="specialty in specialties" :key="specialty.id">
                {{ specialty.name }}
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: "SpecialtiesToolTip",
    props: ['specialties']
}
</script>

<style scoped>
    ul {
        list-style: none;
    }

    ul li:before {
        content: "\2713\0020";
        color: green;
    }

    .tooltip-box { 
        position: relative;
        display: inline-block;
    }

    .tooltip-box:hover .tooltip{
        display: block;
    }

    .tooltip { 
        color: grey;
        text-align: left;
        padding: 5px 0;
        border-radius: 2px;
        background-color: white;
        width: 250px;
        min-height: 120px;
        bottom: 100%;
        left: 50%;
        margin-left: -125px;

        display: none;

        position: absolute;
        z-index: 1;

        border: solid 1px lightgray;
    }

    .text::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: lightgray transparent transparent transparent;
    }
</style>