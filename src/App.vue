<template>
  <div id="app">
    <!-- 缓存所有的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    background: #F1F1F1;
  }
</style>
