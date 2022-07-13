<template>
    <header class="header">
        <img src="../assets/headerPic1.jpg" alt="background picture" class="image" />
        <div class="top">
            Флоротека
            <nav class="nav">
                <router-link class="link" to="/">Каталог</router-link>
                <router-link class="link" to="/beforeafter">Было / стало</router-link>
                <router-link class="link" to="/technologies">Технологии</router-link>
                <router-link class="link" to="/aboutus">О нас</router-link>
                <router-link class="link" to="/contacts">Контакты</router-link>
            </nav>
        </div>
        <div class="content">
            <h1 class="heading">Растения дендроучастка Сыктывкарского Лесного Института</h1>
            <p class="paragraph">Представляем наш проект, где вы можете увидеть разнообразие растений, высаженных на
                дендрологическом участке Сыктывкарского лесного института.</p>
            <a class="link">Что у нас есть</a>
        </div>
    </header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'header-component'
})
</script>
<style lang="scss">
@import '@/variables';

.header {
    @include flex(column, center, unset);
    width: 100%;
    color: $mainWhite;
    position: relative;
    .image{
        display: block;
        width: 100%;
    }
    .top {
        @include flex(row, center, space-between);
        @include font(30px, 36px, 500);
        width: 1280px;
        padding-top: 35px;
        position: absolute;
        .nav {
            @include flex(row, center, space-between);
            width: 50%;

            .link {
                @include font(16px, 19px, 500);
                color: inherit;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }

            .router-link-exact-active {
                text-decoration: underline;
            }
        }
    }

    .content {
        @include flex(column, flex-start, center);
        width: 1280px;
        position: absolute;
        top: 30%;
        .heading {
            @include font(55px, 65px, 500);
            width: 820px;
        }

        .paragraph {
            @include font(20px, 34px, 500);
            width: 700px;
            padding: 20px 0 30px;
        }

        .link {
            @include font(18px, 28px, 500);
            padding: 16px 44px;
            border: 1px solid $mainWhite;
            border-radius: 25px;
            text-transform: uppercase;
            &:hover{
                cursor: pointer;
            }
        }
    }
}
@media screen and (max-width: 1400px) {
    .header{
        .top{
            width: 100%;
            padding: 35px 50px;
        }
        .content {
            width: 100%;
            padding: 0 50px;
        .heading {
            @include font(45px, 55px, 500);
            width: 720px;
        }

        .paragraph {
            @include font(16px, 20px, 500);
            width: 600px;
            padding: 20px 0 30px;
        }

        .link {
            @include font(14px, 18px, 500);
            padding: 14px 40px;
            border: 1px solid $mainWhite;
            border-radius: 25px;
            text-transform: uppercase;
            &:hover{
                cursor: pointer;
            }
        }
    }
    }
}
</style>
