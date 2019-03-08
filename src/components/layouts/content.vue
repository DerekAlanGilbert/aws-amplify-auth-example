<template>
<div class="card w-100" >
  <div :class="[customClasses, 'card-body']">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
  data () {
    
  },
  props: ['customClasses']
}
</script>

