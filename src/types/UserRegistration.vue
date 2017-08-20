<template>
  <div class="columns">
    <div class="column is-4">
      <div v-if="message" class="notification" v-bind:class="{'is-success': message.type == 'success', 'is-danger': message.type == 'error'}">
        {{ message.content }}
      </div>
      <form v-if="showRegistrationForm" @submit.prevent="register()">
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              :class="{'is-danger': errors.has('name') }"
              v-validate="name"
              data-vv-rules="required|alpha_dash"
              v-model="name"
              type="text"
              placeholder="Username">
          </p>
          <p class="help is-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              :class="{'is-danger': errors.has('email') }"
              v-validate="email"
              data-vv-rules="required|email"
              v-model="email"
              type="email"
              placeholder="Email">
          </p>
          <p class="help is-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              :class="{'is-danger': errors.has('firstname') }"
              v-validate="firstname"
              data-vv-rules="required|alpha_num"
              v-model="firstname"
              type="text"
              placeholder="First name">
          </p>
          <p class="help is-danger" v-if="errors.has('firstname')">{{ errors.first('firstname') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              :class="{'is-danger': errors.has('lastname') }"
              v-validate="lastname"
              data-vv-rules="required|alpha_num"
              v-model="lastname"
              type="text"
              placeholder="Last name">
          </p>
          <p class="help is-danger" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              :class="{'is-danger': errors.has('password') }"
              v-validate="password"
              data-vv-rules="required|password"
              v-model="password"
              type="password"
              placeholder="Password">
          </p>
          <p class="help is-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              v-model="password2"
              type="password"
              placeholder="Password (repeat)">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button :disabled="isSubmitting" class="button is-success">Register</button>
          </p>
        </div>
      </form>
      <form v-if="showVerificationCodeForm">
        <div class="field">
          <p class="control">
            <input
              class="input"
              :disabled="isSubmitting"
              :class="{'is-danger': errors.has('verificationCode') }"
              v-validate="verificationCode"
              data-vv-rules="required"
              v-model="verificationCode"
              type="text"
              placeholder="Verification code">
          </p>
          <p class="help is-danger" v-if="errors.has('verificationCode')">{{ errors.first('verificationCode') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <button :disabled="isSubmitting" class="button is-success">Register</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import strength from 'strength';
Validator.extend('password', {
  getMessage: field => 'The ' + field + ' is too weak as password.',
  validate: value => strength(value) >= 2
});

Vue.use(VeeValidate, {
  locale: 'sv'
});

const UserRegistration = {
  name: 'user-registration',
  props: {
    page: { type: Object },
    parentAdministrableId: { type: Number }
  },
  data () {
    return {
      isSubmitting: false,
      showRegistrationForm: true,
      showVerificationCodeForm: false,
      name:             '',
      email:            '',
      firstname:        '',
      lastname:         '',
      password:         '',
      password2:        '',
      verificationCode: '',
      message:          null
    };
  },
  methods: {
    register: async function() {
      this.isSubmitting = true;
      try {
        let data = await this.$apollo.mutate({
          mutation: gql`mutation ($createUserInput: CreateUserInput!) {
            createUser(input: $createUserInput) {
              id, name
            }
          }`,
          variables: {
            createUserInput: {
              name:                   this.name,
              email:                  this.email,
              firstname:              this.firstname,
              lastname:               this.lastname,
              password:               this.password,
              parentAdministrableId:  this.parentAdministrableId || this.administrables[0].id
            }
          },
          update: (store, res) => {
            console.warn('Store', store);
            console.warn('res', res);
          }
        });
        this.message = {
          type: 'success',
          content: 'Registered successfully. '
            + 'An email was sent to you with a verification code. '
            + 'Enter it here, or simply click the link in the email to activate your account.'
        };
        this.showRegistrationForm = false;
        this.isSubmitting = false;
        this.showVerificationCodeForm = true;
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
    administrables () {
      return {
        query: () => {
          return gql`query ($actions: [String]!) {
            administrables(actionsAll: $actions) {
              id,
              name { lang, content }
              manifest { id }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {
          this.isLoading = isLoading;
        },
        update({ administrables }) {
          return administrables.filter(e => e.manifest == null);
        },
        result() {
          if(this.administrables) {
            // TODO: Perhaps let the user choose, if administrables.length > 1?
            this.showRegistrationForm = true;
          } else {
            this.showRegistrationForm = false;
          }
        },
        error(error) {
          this.isError = true;
        },
        variables: () => ({
          actions: ['createUser']
        }),
        skip: () => {
          return this.parentAdministrableId != null;
        }
      };
    }
  }
}

export default UserRegistration;
</script>

<style lang="sass" scoped></style>
