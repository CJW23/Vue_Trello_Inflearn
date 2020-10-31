<template>
  <div>
    Card{{cid}}
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      cid: 0
    }
  },
  created() {
    this.cid = this.$route.params.cid;
    console.log(this.$route.params);
  },
  watch: {
    '$route'() {
      this.cid = this.$route.params.cid;
    }
  }
}
</script>

<style scoped>

</style>
