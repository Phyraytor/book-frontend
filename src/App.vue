<template>
  <router-view/>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
  html {
    font-family: Georgia, serif;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    padding: 0 12px;
    flex-grow: 1;
    align-self: center;
  }

  .input__title {
    margin: 0;
    font-size: 18px;
    border: none;
    font-weight: 600;
    flex-grow: 1;
    height: 100%;
    padding: 0 12px;
    background: #303841;
    color: #fff;
  }

  .description {
    white-space: pre-line;
    text-align: left;
    min-height: calc(100vh - 97px);
    font-size: 16px;
    width: calc(100% - 24px);
    padding: 12px;
    resize: none;
    border: none;
    font-family: Georgia, serif;
    margin: 0;
  }

  .textarea {
    background: #303841;
    color: #fff;
  }
</style>
