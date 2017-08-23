<template>
  <div class="columns">
    <div class="column is-4">
      <div v-if="message" class="notification" v-bind:class="{'is-success': message.type == 'success', 'is-danger': message.type == 'error'}">
        {{ message.content }}
      </div>
      <form v-if="!authToken" @submit.prevent="login()">
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
      password:     '',
      isSubmitting: false,
      message:      null
    };
  },
  computed: {
    ...mapGetters(['authToken'])
  },
  methods: {
    login: async function() {
      this.isSubmitting = true;
      try {
        let response = await this.$apollo.mutate({
          mutation: gql`mutation ($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
            }
          }`,
          variables: {
            username: this.username,
            password: this.password
          },
          update: (store, res) => {

          }
        });
        this.message = {
          type: 'success',
          content: 'Successfully logged in.'
        };
        this.isSubmitting = false;
        this.$store.dispatch('setAuthToken', response.data.login.token)
      } catch(err) {
        this.message = {
          type: 'error',
          content: err.message
        };
        this.isSubmitting = false;
      }
    }
  },
  apollo: {

  }
}

export default UserLogin;
</script>

<style lang="sass" scoped></style>
