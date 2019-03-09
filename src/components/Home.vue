<template>
  <content-box img="true" customClasses="w-75 m-auto">
    <img src="@/assets/aws.png" slot="image"/>
    <div slot=body>
    <h5 class="card-title">Amplify/Vue Example</h5>
    <p class="card-text">This is an example project for Amplify Authentication aka AWS Cognito.. see the code <a href="https://github.com/DerekAlanGilbert/aws-amplify-auth-example" target="_blank" class="">Here..</a></p>
    <p class="card-text">Inspired by a tutorial by <a href="https://dev.to/dabit3">dabit3</a>, find that <a href="https://dev.to/dabit3/how-to-build-production-ready-vue-authentication-23mk" target="_blank" class="">Here..</a></p>
    <router-link v-if="signedIn" to="auth" class="btn btn-primary">Login/Registration</router-link>
    <router-link v-else to="auth" class="btn btn-primary">Logout</router-link>
    </div>
  </content-box>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'home',
  data () {
    return {
      signedIn: false
    }
  },
  created () {
    AmplifyEventBus.$on('authState', info => {
    this.signedIn = true
  });
  }
}
</script>