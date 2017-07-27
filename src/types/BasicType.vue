<template>
  <div class="type-view">
    <p>Basic type</p>
    <p>Content: {{ content }}</p>
  </div>
</template>

<script>

const BasicType = {
  name: 'basic-type',
  props: {
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

export default BasicType;
</script>

<style></style>
