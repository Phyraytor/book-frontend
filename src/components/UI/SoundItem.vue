<template>
  <audio controls>
    <source :src="path" type="audio/mpeg">
    <p>Браузер не поддерживает аудио</p>
  </audio>
  <router-link :to="`/sounds/${id}`" class="link">
    {{ name || 'Имя не задано' }}
  </router-link>
</template>

<script lang="ts">
export default {
  name: 'SoundItem',
  props: ['path', 'id', 'name'],
  setup () {

  }
}
</script>

<style scoped>
.link {
  display: flex;
  align-items: center;
  transition: 0.3s;
  flex-grow: 1;
  padding: 12px;
  border-bottom: 1px solid #e7e8ec;
  height: 40px;
  justify-content: flex-end;
  padding-right: 16px;
}

.link :hover {
  background: #303841;
  color: #fff;
}
</style>
