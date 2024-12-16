<template>
  <div class="fon">
    <div class="flex">
      <div class="row">
        <div class="skill"></div>
        <div class="skill"></div>
      </div>
      <div class="row">
        <div class="skill"></div>
        <div class="skill"></div>
      </div>
      <div class="row">
        <div class="skill"></div>
        <div class="skill"></div>
      </div>
      <div class="row">
        <div class="skill"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UI2'
}
</script>

<style scoped>
  .fon {
    background: #9d5447;
    width: 100%;
    height: 100vh;
  }
  .row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 12px 0;
    border-bottom: 2px solid #000;
    flex-grow: 1;
    align-items: center;
  }

  .flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    background: #fff;
    width: 100%;
    height: 100%;
  }

  .skill {
    background: #f00;
    border: 3px ridge #8a0000;
    border-radius: 3px;
    width: 48px;
    height: 48px;
  }
</style>
