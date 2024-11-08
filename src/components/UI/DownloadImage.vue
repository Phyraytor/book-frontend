<template>
  <img class="image" :src="image" alt="Загрузить изображание" @click="openUploader" />
  <input type="file" class="input" @change="onFileChange" ref="inputRef" />
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'DownloadImage',
  props: ['image', 'upload'],
  setup (props) {
    const inputRef = ref(null)
    const openUploader = () => inputRef.value?.click?.()
    const onFileChange = (event) => {
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
<style scoped>
  .image {
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

  .input {
    display: none;
  }
</style>
