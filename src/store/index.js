import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import users from '../users'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

function generateTimer () {
  return Math.floor(Math.random() * 2000 + 1000)
}

function findUser (username) {
  return _.find(users, user => user.username === username)
}

const state = {
  user: null
}

const actions = {
  logIn ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        let user = findUser(username)
        if (!user) {
          resolve({ success: false, errorMsg: 'Invalid username' })
          return
        }
        if (user.password !== password) {
          resolve({ success: false, errorMsg: 'Invalid password' })
          return
        }
        commit('logIn', user)
        resolve({ success: true, errorMsg: null })
      }, generateTimer())
    })
  },
  logOut ({ commit }) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        commit('logOut')
        resolve({ success: true })
      }, generateTimer())
    })
  }
}

const getters = {
  isLogged: state => state.user != null,
  getUsername: state => state.user ? state.user.username : null
}

const mutations = {
  logIn (state, user) {
    state.user = user
  },
  logOut (state) {
    state.user = null
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug
})
