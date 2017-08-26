<template>
  <div class="admin-actions">
    <ul>
      <li v-for="action in actions" v-bind:title="action.name" class="action">
        <a class="a" v-if="action.name == 'read'">
          <icon name="eye"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'edit'">
          <icon name="edit"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'use'">
          <icon name="edit"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'assignAction'">
          <icon name="arrow-right"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'delete'">
          <icon name="edit"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'move'">
          <icon name="arrows"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createCategory'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createPage'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createView'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createViewType'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createUser'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createUsergroup'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createEventlistener'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createMenu'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createMessageType'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
        <a class="a" v-else-if="action.name == 'createMessage'">
          <icon name="plus"></icon>
          {{ action.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/arrows';
import 'vue-awesome/icons/arrow-right';

const AdminActions = {
  name: 'admin-actions',
  data: () => {
    return {

    };
  },
  props: {
    administrableId: Number,
    actions: Array
  },
  computed: {

  },
  apollo: {
  }
}

export default AdminActions;
</script>

<style lang="sass" scoped>
  .action {
    display: inline-block;
    padding: 5px;
    color: #000;
    font-size: 0.88em;
  }
  .a {
    color: #000;
  }
</style>
