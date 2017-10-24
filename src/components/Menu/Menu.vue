<template>
  <div class="container">
    <js-logo></js-logo>
    <div class="flex-container">
      <menu-button class="button" v-for="menu in menus" :text="menu.name" :url="menu.url" :logo="menu.logo"
                   @button-click="choose"></menu-button>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import MenuButton from './MenuButton'

  export default {
    components: {
      MenuButton
    },
    data () {
      return {
        show: true
      }
    },
    computed: {
      ...mapGetters({
        menus: 'menus'
      })
    },
    methods: {
      choose: function (url) {
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  .container {
    max-width: 600px;
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .button:nth-child(even) {
    margin-left: 32px;
  }

  .button {
    margin-top: 20px;
  }

  @media (max-width: 447px) {
    .button {
      width: 100%;
    }

    .button {
      margin-left: 32px !important;
      margin-right: 32px !important;
    }
  }
</style>
