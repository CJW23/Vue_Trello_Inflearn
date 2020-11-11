<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{ board.title }}</span>
          <a class="board-header-btn show-menu" href="" @click.prevent="onShowSettings">
            ... Show Menu
          </a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists">
              <List :data="list"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BoardSettings v-if="isShowBoardSetting"/>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import List from "./List"
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import dragger from "../utiles/dragger";
import BoardSettings from "./BoardSettings";

export default {
  components: {BoardSettings, List},
  data() {
    return {
      bid: 0,
      loading: true,
      cDragger: null
    }
  },
  computed: {
    ...mapState(['board', "isShowBoardSetting"])
  },
  created() {
    this.fetchData();
    this.SET_IS_SHOW_BOARD_SETTINGS(false)
  },
  updated() {
    this.setCardDragabble()
  },
  methods: {
    ...mapActions(['FIND_BOARD', 'UPDATE_CARD']),
    ...mapMutations(['SET_IS_SHOW_BOARD_SETTINGS']),
    fetchData() {
      this.loading = true
      this.FIND_BOARD(this.$route.params.bid)
        .then(() => this.loading = false)
    },
    //카드 드래그 관련 함수
    setCardDragabble() {
      if (this.cDragger) this.cDragger.destroy()
      this.cDragger = dragger.init(Array.from(this.$el.querySelectorAll('.card-list')))

      //카드를 드래그 해서 놓았을 때
      this.cDragger.on('drop', (el, wrapper, target, siblings) => {
        const targetCard = {id: el.dataset.cardId * 1, pos: 65535}
        //드랍한 카드의 양쪽 카드 정보를 가져온다
        const {prev, next} = dragger.sibling({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll('.card-item')),
          type: 'card'
        })
        if (!prev && next) targetCard.pos = next.pos / 2
        else if (prev && !next) targetCard.pos = prev.pos * 2
        else if (prev && next) targetCard.pos = (prev.pos + next.pos) / 2
        //카드 순서를 업데이트 한다
        this.UPDATE_CARD({cardId: targetCard.id, pos: targetCard.pos})
      })
    },
    onShowSettings() {
      this.SET_IS_SHOW_BOARD_SETTINGS(true)
    }
  }
}

</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}

.board-header input[type=text] {
  width: 200px;
}

.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}

.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0, 0, 0, .15);
  cursor: pointer;
}

.board-title {
  font-weight: 700;
  font-size: 18px;
}

.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}

.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}

.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}

.card-item.gu-transit {
  background-color: #555 !important;
}

.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
