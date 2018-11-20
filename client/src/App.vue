<template>
  <transition name="page-fade" mode="out-in">
    <keep-alive><router-view class="page"></router-view></keep-alive>
  </transition>
</template>

<style lang="less">
  .page {
    min-height: 100vh;
  }
</style>
