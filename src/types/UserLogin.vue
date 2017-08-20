<template>
  <div class="columns">
    <div class="column is-4">
      <form>
        <div class="field">
          <p class="control">
            <input class="input" type="email" placeholder="Email">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="password" placeholder="Password">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Util from '../Util';

const UserLogin = {
  name: 'breadcrumbs',
  props: {
    page: { type: Object }
  },
  data () {
    return {};
  },
  apollo: {

  }
}

export default UserLogin;
</script>

<style lang="sass" scoped></style>
