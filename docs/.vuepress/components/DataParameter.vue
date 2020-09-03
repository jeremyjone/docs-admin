<template>
  <div class="param-root">
    <span class="param-span">
      <span v-if="r">
        <!-- 下面两个 span 不要换行 -->
        <span class="param-required">*required*</span><span>,</span>
      </span>
      <!-- 下面两个 span 不要换行 -->
      <span>type: {{ t }}</span><span v-if="d">,</span>
      <span v-if="d">default: {{ d }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "ParamComponent",

  props: {
    // required
    r: {
      type: Boolean
    },

    // type
    t: {
      type: String,
      required: true
    },

    // default
    d: {
      type: String
    }
  }
};
</script>

<style lang="stylus" scoped>
.param-root
  margin-top 5px

  .param-span
    font-weight 500
    background-color #EAECF4
    padding 0 5px 4px 5px
    border-radius 2px

    .param-required
      color red
</style>
