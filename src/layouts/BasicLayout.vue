<template>
  <div class="layout-view">
    <p>Basic layout</p>
    <component
      :is="typeComponent"
      v-bind:type-data="typeData"
      v-bind:content="content">
    </component>
  </div>
</template>

<script>

const BasicLayout = {
  name: 'basic-layout',
  props: {
    typeComponent: {
      type: String
    },
    typeData: {
      type: Object
    },
    content: {
      type: String
    }
  },
  data () {
    return {}
  },
  apollo: {

  }
}

export default BasicLayout ;
</script>

<style></style>
