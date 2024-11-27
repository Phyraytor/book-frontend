<template>
  <router-view/>
</template>
<script setup lang="ts">
</script>
<style>
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

  .title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    padding: 0 12px;
    flex-grow: 1;
    align-self: center;
  }

  .buttons {
    display: flex;
    cursor: pointer;
    justify-content: flex-end;
  }

  .items-index {
    padding: 0;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e7e8ec;
  }

  .items-text {
    padding: 0;
    padding-left: 12px;
  }

  .items {
    margin: 0 auto;
    width: 1000px;
    min-height: calc(100vh - 96px);
  }

  .items-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .items-list__item {
    width: 100%;
    font-size: 24px;
    border-bottom: 1px solid #eaeaef;
  }

  .items-list__link {
    color: #000;
    text-decoration: none;
    width: 100%;
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .items-list__link img {
    width: 24px;
    margin-left: 8px;
    height: auto;
  }

  .items-list__link:hover {
    background: #303841;
    color: #fff;
  }
</style>
