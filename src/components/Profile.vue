<template>
  <content-box>
    <div slot="body">
      <h1 class="card-title">Welcome, {{user.username}}</h1>      
    </div>
  </content-box>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'Profile',
  data() {
    return {
      user: {}
    }
  },
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
      })
      .catch(() => console.log('not signed in...'))
  }
}
</script>