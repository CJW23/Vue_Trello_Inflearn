<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="b in boards" :key="b.id"
           :data-bgcolor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard"/>
  </div>
</template>
<script>
import {board} from '../api'
import AddBoard from "./AddBoard";
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  components: {AddBoard},
  data() {
    return {
      loading: false,
      error: '',
      isModal: false
    }
  },

  created() {
    this.fetchData()
  },

  computed: {
    ...mapState(['isAddBoard', 'boards']),

  },

  updated() {
    this.$refs.boardItem.forEach(el => {
      //css 설정                   태그에 달린 rgb 값
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },

  methods: {
    ...mapMutations(['SET_IS_ADD_BOARD']),
    ...mapActions(['FETCH_BOARD']),

    //FETCH_BOARD -> Action -> mutations -> state
    fetchData() {
      this.loading = true
      this.FETCH_BOARD()
        .finally(_ => {
          this.loading = false
        })
    },
    addBoard() {
      this.SET_IS_ADD_BOARD(true)
    }
  }
}
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}

.board-item-new {
  background-color: #ddd;
}

.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0, 0, 0, .1);
  color: #666;
}

.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}

.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
