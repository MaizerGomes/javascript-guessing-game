<template>
  <div>
    <js-logo v-if="!gameFinished"></js-logo>
    <ui-options v-if="!gameFinished" @answer="answer"></ui-options>
    <result-page v-if="gameFinished"></result-page>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import JsLogo from './JsLogo'
  import UiOptions from './UiOptions'
  import ResultPage from './ResultPage'

  export default {
    components: {
      JsLogo,
      UiOptions,
      ResultPage
    },
    computed: {
      ...mapGetters([
        'gameFinished',
        'answerCount',
        'logos',
        'currentLogo',
        'amount',
        'route'
      ])
    },
    created: function () {
      this.setActiveGame({
        game: this.route.params.game,
        callback: function () {
          this.initializeLogos(() => {
            this.restartGame()
          })
        }.bind(this)
      })
    },
    methods: {
      ...mapActions([
        'initializeLogos',
        'setCurrentLogo',
        'setOptions',
        'setActiveGame',
        'increaseAnswerCount',
        'playSound',
        'finishGame',
        'restartGame'
      ]),
      answer: function (answerId) {
        // this.$emit('answer', id)
        if (answerId === this.currentLogo.id) {
          this.increaseAnswerCount()
          if (this.answerCount === this.amount) { // game finish
            this.playSound('game-end')
            this.finishGame()
            this.$emit('save-score')
          } else {
            this.playSound('correct')
            this.setCurrentLogo(this.logos[this.answerCount])
            this.setOptions()
          }
        } else {
          this.playSound('wrong')
          this.finishGame()
          this.$emit('save-score')
        }
      }
    }
  }
</script>
