<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      {{ this.bid }}
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      <hr/>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      bid: 0,
      loading: true
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.bid = this.$route.params.bid
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
