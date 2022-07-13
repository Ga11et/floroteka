<template>
    <div class="plant">
        <img :src="content.img" alt="plant" />
        <div class="content">
            <h3 class="heading">{{ content.name }}</h3>
            <p class="paragraph">{{ content.description }}</p>
            <router-link class="link" to="/plant">Читать больше</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'plant-container',
  props: ['content']
})
</script>
<style lang="scss">
    @import '@/variables';
    .plant{
        position: relative;
        img{
            display: block;
            width: 100%;
        }
        .content{
            width: 100%;
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(6px);
            bottom: 0;
            color: white;
            padding: 15px 20px;
            .heading{
                @include font(24px, 30px, 500);
            }
            .paragraph{
                @include font(16px, 20px, 400);
                margin: 10px 0 15px;
                color: #ffffffbb;
            }
            .link{
                display: inline-block;
                text-decoration: none;
                border: 1px solid #ffffffbb;
                color: #ffffffbb;
                @include font(16px, 20px, 500);
                padding: 9px 26px;
            }
        }
        &:hover {
            .content .link{
                color: white;
                border-color: white;
            }
        }
    }
</style>
