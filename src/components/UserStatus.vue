<template>
  <span class="navbar-item">
    <span v-if="isLogged">
      <span class="icon"><i class="fa fa-fw fa-user"></i></span>
      Hi {{ getUsername }}!
    </span>
    <span v-else>
      <span class="icon"><i class="fa fa-fw fa-user-o"></i></span>      
      Guest user
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLogged',
      'getUsername'
    ])
  }
}
</script>

<style>

</style>
