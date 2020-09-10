<template>
    <div>
        <paginate
            :page-count="totalPages"
            :click-handler="paginationChange"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'">
        </paginate>
    </div>
</template>

<script>
import paginate from "vuejs-paginate"

export default {
    name: 'Pagination' ,
    props: ['totalPages'],
    components: {
        paginate
    },
    methods: {
        paginationChange(page) {
            this.$emit("pageChange", page);
        }
    }
}
</script>

<style>
    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
    }

    .pagination > li {
        display: inline;
    }

    .pagination > li > a,
    .pagination > li > span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .pagination > li.active > a{
        color: black;
        background-color: lightgray;
    }
</style>