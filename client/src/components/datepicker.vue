<template>
  <div class="datepicker">
    <label :class="{ empty: !value }" :for="id">{{ value || placeholder }}</label>
    <input type="date" :id="id" :value="value" :max="max" :min="min" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: String,
      max: String,
      min: String
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';

  .datepicker {
    position: relative;
    width: 100%;
    height: 40px;
    .all-center-flex;

    label {
      position: relative;
      z-index: 1;
      font-size: 14px;
      text-align: center;

      &.empty {
        color: @md-grey-500;
      }
    }

    input {
      .fill;
      opacity: 0;
    }
  }
</style>
