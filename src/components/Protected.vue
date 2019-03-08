<template>
  <content-box>
    <h1>Hello from protected route!</h1>
  </content-box>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'protected',
}
</script>