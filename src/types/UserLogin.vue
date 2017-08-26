<template>
  <div class="columns">
    <div class="column is-4">
      <form v-if="!authToken" @submit.prevent="login()" v-bind:class="{'submitting': isSubmitting}">
        <div class="field">
          <p class="control">
            <input class="input" type="text" v-model="username" :disabled="isSubmitting" placeholder="Username">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="password" v-model="password" :disabled="isSubmitting" placeholder="Password">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success" :disabled="isSubmitting">
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
import gql from 'graphql-tag';
import { mapGetters } from 'vuex';

const UserLogin = {
  name: 'breadcrumbs',
  props: {
    page: { type: Object }
  },
  data () {
    return {
      username:     '',
      password:     ''
    };
  },
  computed: {
    ...mapGetters(['isSubmitting', 'authToken'])
  },
  methods: {
    login: async function() {
      let success = await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      });
      if(success) {
        this.$router.push('/profile');
      }
    }
  },
  apollo: {

  }
}

export default UserLogin;
</script>

<style lang="sass" scoped>
  .submitting {
    opacity: 0.5;
  }
</style>
