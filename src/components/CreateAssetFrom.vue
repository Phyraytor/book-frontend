<template>
  <div class="form">
    <input v-model="name" class="input">
    <textarea v-model="description" class="textarea" />
    <button class="button" @click="create">
      Создать
    </button>
  </div>
</template>
<script>
import { ref } from 'vue'
const API = 'http://localhost:3030'
export default {
  name: 'CreateAssetFrom',
  props: {
    append: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const name = ref('')
    const description = ref('')
    const create = async () => {
      const response = await fetch(`${API}/assets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: name.value,
          description: description.value
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      name.value = ''
      description.value = ''
      props.append(await response.json())
    }
    return {
      name,
      description,
      create
    }
  }
}
</script>

<style scoped>

</style>
