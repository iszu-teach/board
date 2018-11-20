<template>
  <select class="dropdown" :value="value" @input="$emit('input', $event.target.value)">
    <slot></slot>
  </select>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';

  .dropdown {
    height: 40px;
    padding-right: 24px;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    background-image: url(../assets/images/ic_arrow_drop_down_24px.svg);
    background-repeat: no-repeat;
    background-position: right center;
    appearance: none;
    outline: 0;
  }
</style>
