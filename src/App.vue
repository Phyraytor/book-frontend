<template>
<!--  <router-link to="/">Логотип</router-link>-->
  <router-view/>
</template>

<style>
  div:focus {outline:none!important;}
  body, html {
    margin: 0;
    padding: 0;
  }

  .input {
    width: calc(100% - 16px);
    margin-bottom: 16px;
    height: 32px;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    padding: 4px 8px;
  }

  .button {
    align-self: flex-end;
    cursor: pointer;
    height: 44px;
    padding: 0 24px;
    border-radius: 12px;
    background: #4285f5;
    font-weight: 600;
    font-size: 16px;
    line-height: 110%;
    border: none;
    color: #fff;
  }

  input:focus, textarea:focus {
    outline: none;
  }
</style>
<script setup lang="ts">
</script>
