<template>
  <div>
    Board
    {{this.bid}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      bid: 0
    }
  },
  created() {
    this.bid = this.$route.params.bid;
    console.log(this.$route);
  }
}
</script>

<style scoped>

</style>
