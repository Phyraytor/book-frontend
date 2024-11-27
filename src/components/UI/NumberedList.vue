<template>
  <div class="list">
    <ul class="list__items">
      <li
        v-for="(item, index) in items"
        class="list-item"
        :key="item.id"
      >
        <router-link class="list-item__link" :to="getLink(item.id)">
          <span class="list-item__index">{{ index + 1 }}</span>
          <span class="list-item__text">{{ item[fieldName] }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NumberedList',
  props: ['items', 'getLink', 'fieldName'],
  setup () {
  }
}
</script>

<style lang="scss" scoped>
  .list {
    margin: 0 auto;
    width: 1000px;
    min-height: calc(100vh - 96px);

    &__items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &-item {
      width: 100%;
      font-size: 24px;
      border-bottom: 1px solid #eaeaef;

      &__index {
        padding: 0;
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e7e8ec;
      }

      &__text {
        padding: 0;
        padding-left: 12px;
      }

      &__link {
        color: #000;
        text-decoration: none;
        width: 100%;
        transition: 0.3s;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &:hover {
          background: #303841;
          color: #fff;
        }
      }
    }
  }
</style>
