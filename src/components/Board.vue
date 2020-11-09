<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      {{board}}
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      bid: 0,
      loading: true
    }
  },
  computed: {
    ...mapState(['board'])
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(['FIND_BOARD']),
    fetchData() {
      this.loading = true
      this.FIND_BOARD(this.$route.params.bid)
        .then(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
