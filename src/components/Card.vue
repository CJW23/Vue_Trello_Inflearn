<template>
  <Modal>
    <div>
      <div v-if="loading">loading card...</div>
      <div v-else>Card{{ cid }}</div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "Card",
  components: {Modal},
  comments: ['Modal'],
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
      }, 0)
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
