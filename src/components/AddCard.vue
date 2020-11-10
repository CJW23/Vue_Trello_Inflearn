<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <label>
        <input class="form-control" v-model="inputTitle" type="text" ref="inputText">
      </label>
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" @click.prevent="$emit('close')" href="">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['listId'],
  data() {
    return {
      inputTitle: ''
    }
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim()
    }
  },
  //DOM 공부해야
  mounted() {
    this.$refs.inputText.focus()
    this.setupClickOutside(this.$el)
  },
  methods: {
    ...mapActions(['ADD_CARD']),
    onSubmit() {
      if(this.invalidInput) return
      const {inputTitle, listId} = this ///???????? 내일 보기
      console.log("add")
    },
    setupClickOutside(el) {
      document.querySelector('body').addEventListener('click', e => {
        if(el.contains(e.target)) return
        this.$emit('close')
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}

.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}

.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
