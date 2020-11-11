<template>
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input class="form-control" type="text"
               :value="card.title"
               :readonly="!toggleTitle"
               @click="toggleTitle=true"
               @blur="onBlurTitle" ref="inputTitle">
      </div>
      <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..."
                :readonly="!toggleDescription"
                @click="toggleDescription=true"
                @blur="onBlurDescription"
                ref="inputDescription"
                v-model="card.description"></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import {mapState, mapActions} from "vuex";

export default {
  name: "Card",
  components: {Modal},
  comments: ['Modal'],
  data() {
    return {
      toggleTitle: false,
      toggleDescription: false
    }
  },
  created() {
    this.fetchCard()
  },
  methods: {
    ...mapActions(['FIND_CARD', 'UPDATE_CARD']),
    fetchCard() {
      const cardId = this.$route.params.cid
      this.FIND_CARD({cardId: cardId})
    },
    onClose() {
      this.$router.push(`/b/${this.board.id}`)
    },
    onBlurTitle() {
      this.toggleTitle = false
      const title = this.$refs.inputTitle.value.trim()
      if (!title) return
      this.UPDATE_CARD({cardId: this.card.id, title: title})
        .then(() => {
          this.fetchCard()
        })
    },
    onBlurDescription() {
      this.toggleDescription = false
      const description = this.$refs.inputDescription.value.trim()
      if (!description) return
      this.UPDATE_CARD({cardId: this.card.id, description: description})
        .then(() => {
          this.fetchCard()
        })
    }
  },
  computed: {
    ...mapState(['card', 'board']),
  }
}
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}

.modal-card-header-title {
  padding-right: 30px;
}

.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}

.modal-card-header {
  position: relative;
}
</style>

