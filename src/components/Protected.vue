<template>
  <content-box>
    <div slot="body">
      <h1>Hello from protected route!</h1>
    </div>
  </content-box>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'protected',
}
</script>