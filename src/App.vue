<template>
  <div id='app'>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src="@/assets/amplify.svg" class="ml-3" height="25"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
              <router-link class="nav-item" tag="li" to="/">
              <a class="nav-link"> Home </a>
              </router-link>
              <router-link class="nav-item" tag="li" to="/profile">
                <a class="nav-link"> Profile </a>
              </router-link>
              <router-link class="nav-item" tag="li" to="/protected">
              <a class="nav-link"> Protected </a>
              </router-link>
              <router-link class="nav-item" tag="li" to="/auth" v-if="!signedIn">
              <a class="nav-link"> Sign Up / Sign In </a>
              </router-link>
          </ul>
        </div>
      </div>
          <div class='sign-out'>
          <amplify-sign-out v-if="signedIn"></amplify-sign-out>
        </div>
    </nav>
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      signedIn: false
    }
  },
  beforeCreate() {
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
        this.$router.push('/profile')
      }
      if (info === 'signedOut') {
        this.$router.push('/auth')
        this.signedIn = false
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => {
        this.signedIn = true
      })
      .catch(() => this.signedIn = false)
  }
}
</script>

<style>
.sign-out {
  width: 160px;
  margin: 0 auto;
}
</style>