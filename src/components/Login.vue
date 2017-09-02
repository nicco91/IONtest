<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half-desktop is-offset-one-quarter-desktop">
        <h3 class="title">Login</h3>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" placeholder="Username"
              :class="{ 'is-danger': usernameError != null }"
              v-model="username"
              @keyup="checkUsername"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
          <p class="help is-danger">{{ usernameError }}</p>          
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password"
              :class="{ 'is-danger': passwordError != null }"
              v-model="password"
              @keyup="checkPassword"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="help is-danger">{{ passwordError }}</p>          
        </div>
        <div class="notification is-danger" v-if="error">
          {{ error }}
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" 
              :class="{ 'is-loading': isLoading }"
              :disabled="hasError"
              @click="signIn()"
            >
              Login
            </button>
            <button class="button is-link" :disabled="isLoading" @click="goBack()">
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

export default {
  data () {
    return {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    hasError () {
      return this.usernameError != null || this.passwordError != null
    }
  },
  methods: {
    ...mapActions([
      'logIn'
    ]),
    signIn () {
      if (!this.hasError) {
        this.error = null
        this.isLoading = true
        this.logIn({
          username: this.username,
          password: this.password
        }).then(response => {
          this.isLoading = false
          if (response.success && !response.errorMsg) {
            this.$router.push('/private')
          } else {
            this.error = response.errorMsg
          }
        })
      }
    },
    checkInput (string) {
      return string.search(/[/\\^,.]/) < 0
    },
    checkUsername () {
      if (!this.checkInput(this.username)) {
        this.usernameError = 'Username can not contain [\\ / , . ^] characters'
      } else {
        this.usernameError = null
      }
    },
    checkPassword () {
      if (!this.checkInput(this.password)) {
        this.passwordError = 'Password can not contain [\\ / , . ^] characters'
      } else {
        this.passwordError = null
      }
    },
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>