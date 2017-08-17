<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#">Bulma</a></li>
      <li><a href="#">Documentation</a></li>
      <li><a href="#">Components</a></li>
      <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
    </ul>
  </nav>
</template>

<script>

import Util from '../Util';

const Breadcrumbs = {
  name: 'breadcrumbs',
  props: {
    page: { type: Object}
  },
  data () {
    return {};
  },
  apollo: {

  }
}

export default Breadcrumbs;
</script>

<style lang="sass" scoped></style>
