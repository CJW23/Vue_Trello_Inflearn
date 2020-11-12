<template>
  <div class="board-menu">
    <div class="board-menu-header">
      <div class="header-title">Menu</div>
      <a class="header-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <ul class="menu-list">
      <li><a href="" @click.prevent="onDeleteBoard">Delete Board</a></li>
      <li>Change Background</li>
      <div class="color-picker">
        <a href="" data-value="rgb(0, 121, 191)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(201, 140, 52)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(81, 152, 57)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(210, 144, 52)" @click.prevent="onChangeTheme"></a>
      </div>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['board'])
  },
  mounted() {
    Array.from(this.$el.querySelectorAll('.color-picker a'))
      .forEach(el => {
        el.style.backgroundColor = el.dataset.value
      })
  },
  methods: {
    ...mapActions(['DELETE_BOARD', 'UPDATE_BOARD']),
    ...mapMutations(['SET_THEME', 'SET_IS_SHOW_BOARD_SETTINGS']),
    onDeleteBoard() {
      if (!window.confirm(`Delete ${this.board.title} Board`)) return
      this.DELETE_BOARD(this.board.id)
        .then(() => this.SET_IS_SHOW_BOARD_SETTINGS(false))
        .then(() => this.$router.push('/'))
    },
    onClose() {
      this.SET_IS_SHOW_BOARD_SETTINGS(false)
    },

    //클릭한 태그의 el을 받아올 수 있음
    onChangeTheme(el) {
      console.log(el)
      const bgColor = el.target.dataset.value
      this.SET_THEME(bgColor)
      this.UPDATE_BOARD({id: this.board.id, bgColor: el.target.dataset.value})
    }
  }
}
</script>

<style>
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all .3s;
}

.board-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}

.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight: 700;
}

.header-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}

.menu-list {
  list-style: none;
  padding-left: 0px;
}

.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}

.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0, 0, 0, .1);
}

.menu-list li a {
  text-decoration: none;
  color: inherit;
}

.color-picker {
  margin: 0 10px;
}

.color-picker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  border-radius: 8px;
}
</style>
