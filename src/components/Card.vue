<template>
  <div>
    <div v-if="loading">loading card...</div>
    <div v-else>Card{{ cid }}</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  },
  computed: {
    cid() {
      this.fetchData();
      return this.$route.params.cid;
    }
  }
}
</script>

<style scoped>

</style>
