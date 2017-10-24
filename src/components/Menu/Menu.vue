<template>
  <div class="container">
    <img v-if="show" :src="logo" width="200px" height="200px"/>
    <div class="flex-container">
      <menu-button class="button" v-for="menu in menus" :text="menu.name" :url="menu.url" :logo="menu.logo"
                   @button-click="choose" @button-hovered="setLogo" @button-left="setDefaultLogo"></menu-button>
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
        show: true,
        logo: '',
        prod: process.env.NODE_ENV === 'production'
      }
    },
    computed: {
      ...mapGetters({
        menus: 'menus'
      })
    },
    created: function () {
      this.setDefaultLogo()
    },
    methods: {
      choose: function (url) {
        this.$router.push(url)
      },
      setDefaultLogo: function () {
        this.setLogo('app_icon')
      },
      setLogo: function (logo) {
        if (logo) {
          this.logo = '../static/logos/' + logo.toLowerCase() + '.png'
        } else {
          this.setDefaultLogo()
        }
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
