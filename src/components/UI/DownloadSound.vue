<template>
  <audio v-if="audio" controls>
    <source :src="audio" type="audio/mpeg">
    <p>Браузер не поддерживает аудио</p>
  </audio>
  <div v-else>
    <div class="audio" @click="openUploader">
      Загрузить аудиофайл
    </div>
    <input type="file" class="hidden" @change="onFileChange" ref="inputRef"/>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'DownloadSound',
  props: ['audio', 'upload'],
  setup (props: any) {
    const inputRef = ref<HTMLInputElement | null>(null)
    const openUploader = () => inputRef.value?.click?.()
    const onFileChange = (event: any) => {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file, file?.name)
      props.upload(formData)
    }

    return {
      inputRef,
      onFileChange,
      openUploader
    }
  }
}
</script>
<style lang="scss">
.audio {
  width: 100%;
  height: auto;
  cursor: pointer;
  background: #303841;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.hidden {
  display: none;
}
</style>
