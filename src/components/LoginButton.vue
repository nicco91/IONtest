<template>
  <span class="navbar-item">
    <router-link to="login" v-if="!isLogged" class="button is-primary">
      <span class="icon"><i class="fa fa-sign-in"></i></span>
      <span>Login</span>
    </router-link>
    <a v-else class="button is-primary" :class="{ 'is-loading': isLoading }" @click="signOut()">
      <span class="icon"><i class="fa fa-sign-out"></i></span>
      <span>Logout</span>
    </a>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  },
  methods: {
    ...mapActions([
      'logOut'
    ]),
    signOut () {
      this.isLoading = true
      this.logOut().then(() => {
        this.isLoading = false
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>
