<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half-desktop is-offset-one-quarter-desktop">
        <h3 class="title">Login</h3>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" placeholder="Username"
              v-model="username"
              v-on:keydown="checkInput"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password"
              v-model="password"
              v-on:keydown="checkInput"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="help is-danger">{{ error }}</p>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary"
              :class="{ 'is-loading': isLoading }"
              @click="signIn()"
            >
              Submit
            </button>
            <button class="button is-link"
              :disabled="isLoading"
              @click="goBack()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null,
      isLoading: false,
      forbiddenCharacters: [ '/', '\\', ',', '.', '^' ]
    }
  },
  methods: {
    ...mapActions([
      'logIn'
    ]),
    signIn () {
      this.error = null
      this.isLoading = true
      this.logIn({ username: this.username, password: this.password })
        .then(response => {
          this.isLoading = false
          if (response.success && !response.errorMsg) {
            this.$router.push('/private')
          } else {
            this.error = response.errorMsg
          }
        })
    },
    checkInput (e) {
      var index = _.findIndex(this.forbiddenCharacters, c => { return c === e.key })
      if (index >= 0) {
        e.preventDefault()
      }
    },
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>