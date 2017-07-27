<template>
  <div class="layout-view">
    <p>Basic layout</p>
    <component
      :is="typeComponent"
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
    content: {
      type: String
    }
  },
  data () {
    console.warn('test1', this.typeComponent);
    console.warn('test2', this.content);
    return {}
  },
  apollo: {

  }
}

export default BasicLayout ;
</script>

<style></style>
