 <template>
  <div class="list">
    <div class="list-header">
      <input v-if="isEditTitle" v-model="inputTitle" class="form-control input-title" type="text"
        ref="inputTitle" @blur="onSubmitTitle" @keyup.enter="onSubmitTitle">
      <div v-else class="list-header-title" @click.prevent="onClickTitle">{{data.title}}</div>
    </div>
    <div class="card-list">
      <card-item v-for="card in data.cards" :key="card.id" :data="card" />
    </div>
    <div v-if="isAddCard">
      <AddCard :list-id="data.id" @close="isAddCard=false"/>
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent.stop="isAddCard=true">&plus;Add Card</a>
    </div>
  </div>
</template>

<script>
import AddCard from './AddCard.vue'
import CardItem from "./CardItem";
import {mapActions} from 'vuex'
export default {
  components: {AddCard, CardItem},
  props: ['data'],
  created() {
    this.inputTitle = this.data.title
  },
  data() {
    return {
      isEditTitle: false,
      isAddCard: false,
      inputTitle: ''
    }
  },
  methods: {
    ...mapActions(['UPDATE_LIST']),
    onClickTitle() {
      this.isEditTitle = true
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    onSubmitTitle() {
      this.isEditTitle = false
      const title = this.inputTitle.trim()
      if(title === this.data.title) return
      this.UPDATE_LIST({boardId: this.data.id, title: title})
    }
  }
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.empty-card-item   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0,0,0, .1);
}
</style>
