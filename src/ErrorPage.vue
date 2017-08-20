<template>
  <div class="layout-view green">
    <h1>An error was encountered. Try again later!</h1>
  </div>
</template>

<script>

const ErrorPage = {
  name: 'error-page',
  props: {},
  data () {
    return {};
  },
  apollo: {

  }
}

export default ErrorPage;
</script>

<style lang="sass" scoped>
  h1 {
    text-align: center;
    padding-top: 15px;
    font-size: 20px;
  }
  .layout-view {
    width: 100vw;
    height: 100vh;
  }
</style>
