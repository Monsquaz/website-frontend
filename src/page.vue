<template>
  <div class="page">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
let reactToRouteChange = (instance, from, to) => {
  instance.title = to.path;
}
export default {
  data () {
    return {
      title: 'Page'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      reactToRouteChange(vm, from, to);
    });
  },
  beforeRouteUpdate (to, from, next) {
    reactToRouteChange(this, from, to);
    next();
  }
}
</script>

<style></style>
