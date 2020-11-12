<template>
  <div class="add-list">
    <input v-if="isAddList" type="text" class="form-control"
           v-model="inputTitle" ref="inputTitle" @blur="restore" @keyup.enter="onSubmitTitle">
    <a v-else href="" @click.prevent="onAddList">&plus; Add List</a>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "AddList",
  data() {
    return {
      isAddList: false,
      inputTitle: ''
    }
  },
  computed: {
    ...mapState(['board'])
  },
  methods: {
    ...mapActions(['ADD_LIST']),
    onAddList() {
      this.isAddList = true
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    restore() {
      this.isAddList = false
      this.inputTitle = ''
    },
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return this.restore()
      const title = this.inputTitle
      const lastList = this.board.lists[this.board.lists.length - 1]
      console.log(lastList)
      const pos = lastList ? lastList.pos * 2 : 65535
      this.ADD_LIST({title: title, boardId: this.board.id, pos: pos})
        .then(() => {
          this.restore()
        })
    }
  }
}
</script>

<style scoped>
.add-list {
  background-color: rgba(0, 0, 0, .1);
  padding: 12px;
  transition: all .3s;
}

.add-list a {
  color: #ddd;
}

.add-list:hover,
.add-list:focus {
  background-color: rgba(0, 0, 0, .3);
}
</style>
