<template>
  <content-box>
    <div slot="body">
      <h1 class="card-title">Welcome, <span style="color:lightGreen">{{user.username}}</span></h1> 
      <div class="list-group">
        <div  class="list-group-item list-group-item-action d-flex justify-content-between pointer">
          <div>Email</div>
          <div>{{userInfo.email}}</div>
          </div>
        <div  class="list-group-item list-group-item-action d-flex justify-content-between" tabindex="-1" aria-disabled="true">
          <div>Verified:</div>
          <div style="color:lightGreen">{{userInfo.email_verified}}</div>
        </div>
         <div class="list-group-item list-group-item-action d-flex justify-content-between" tabindex="-1" aria-disabled="true">
          <div>Phone Number:</div>
          <div>{{userInfo.phone_number}}</div>
        </div>
         <div class="list-group-item list-group-item-action d-flex justify-content-between" tabindex="-1" aria-disabled="true">
          <div>Phone Number:</div>
          <div style="color:LightSalmon ">{{userInfo.phone_number_verified}}</div>
        </div>
      </div>     
    </div>
  </content-box>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      userInfo: {}
    }
  },
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user)
        this.user = user
        this.userInfo = user.attributes
      })
      .catch(() => console.log('not signed in...'))
  }
}
</script>