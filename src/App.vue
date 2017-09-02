<template>
  <div id="app">
    <nav class="navbar container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <img src="./assets/ion-logo.png" alt="ION test">
        </span>

        <div class="navbar-burger burger"
          :class="{ 'is-active': showBurger }"
          @click="showBurger = !showBurger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
  
      <div class="navbar-menu" :class="{ 'is-active': showBurger }">
        <div class="navbar-start">
          <router-link to="/" exact class="navbar-item" @click.native="showBurger = false">Home</router-link>
          <router-link to="private" class="navbar-item" @click.native="showBurger = false">Private</router-link>
        </div>

        <div class="navbar-end">
          <user-status></user-status>
          <login-button @click.native="checkHideBurger()"></login-button>
        </div>
      </div>
    </nav>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">ION test</h1>
          <h2 class="subtitle">
            Test application for ION personal recruitment
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <router-view class="container is-fluid" />
    </section>
  </div>
</template>

<script>
import LoginButton from './components/LoginButton'
import UserStatus from './components/UserStatus'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    UserStatus,
    LoginButton
  },
  data () {
    return {
      showBurger: false
    }
  },
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  },
  methods: {
    checkHideBurger () {
      if (!this.isLogged) {
        this.showBurger = false
      }
    }
  }
}
</script>
