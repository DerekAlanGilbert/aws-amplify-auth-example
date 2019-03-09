<template>
<div :class="[customClasses, 'card shadow-lg']">
    <slot name="image" v-if="img"></slot>
  <div class="card-body">
  <slot name="body">
          Default body
    </slot>
  </div>
</div>
</template>
<script>
export default {
  props: ['customClasses', 'img']
}
</script>

