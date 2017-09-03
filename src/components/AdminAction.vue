<template>
  <div class="admin-action">
    test
  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';
import { mapGetters } from 'vuex';

// TODO: Put this in its own file and include it
let actionInfo = {
  read: {
    component: null,
    title: '',
    description: ''
  },
  edit: {
    component: null,
    title: '',
    description: ''
  },
  use: {
    component: null,
    title: '',
    description: ''
  },
  assignAction: {
    component: null,
    title: '',
    description: ''
  },
  delete: {
    component: null,
    title: '',
    description: ''
  },
  move: {
    component: null,
    title: '',
    description: ''
  },
  createCategory: {
    component: null,
    title: '',
    description: ''
  },
  createPage: {
    component: null,
    title: '',
    description: ''
  },
  createView: {
    component: null,
    title: '',
    description: ''
  },
  createUser: {
    component: null,
    title: '',
    description: ''
  },
  createUsergroup: {
    component: null,
    title: '',
    description: ''
  },
  createEventlistener: {
    component: null,
    title: '',
    description: ''
  },
  createMenu: {
    component: null,
    title: '',
    description: ''
  },
  createMessageType: {
    component: null,
    title: '',
    description: ''
  },
  createMessage: {
    component: null,
    title: '',
    description: ''
  }
}

const AdminAction = {
  name: 'admin-action',
  data: () => {
    return {

    };
  },
  props: {
    administrableId: Number,
    action: String
  },
  computed: {
  },
  methods: {
  },
  apollo: {
  }
}

export default AdminAction;
</script>

<style lang="sass" scoped>
</style>
