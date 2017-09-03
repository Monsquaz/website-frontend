<template>
  <div class="admin-action-list">
    <ul>
      <li v-for="action in actions" v-bind:title="action.name" class="action">
        <router-link :to="{ path: 'admin', query: getQuery(administrableId, action.name) }">
          <icon      v-if="action.name=='read'"                name="eye"></icon>
          <icon v-else-if="action.name=='edit'"                name="edit"></icon>
          <icon v-else-if="action.name=='use'"                 name="edit"></icon>
          <icon v-else-if="action.name=='assignAction'"        name="arrow-right"></icon>
          <icon v-else-if="action.name=='delete'"              name="edit"></icon>
          <icon v-else-if="action.name=='move'"                name="arrows"></icon>
          <icon v-else-if="action.name=='createCategory'"      name="plus"></icon>
          <icon v-else-if="action.name=='createPage'"          name="plus"></icon>
          <icon v-else-if="action.name=='createView'"          name="plus"></icon>
          <icon v-else-if="action.name=='createUser'"          name="plus"></icon>
          <icon v-else-if="action.name=='createUsergroup'"     name="plus"></icon>
          <icon v-else-if="action.name=='createEventlistener'" name="plus"></icon>
          <icon v-else-if="action.name=='createMenu'"          name="plus"></icon>
          <icon v-else-if="action.name=='createMessageType'"   name="plus"></icon>
          <icon v-else-if="action.name=='createMessage'"       name="plus"></icon>
          {{ action.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';
import { mapGetters } from 'vuex';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/arrows';
import 'vue-awesome/icons/arrow-right';

const AdminActionList = {
  name: 'admin-action-list',
  data: () => {
    return {

    };
  },
  props: {
    administrableId: Number,
    actions: Array
  },
  computed: {
    ...mapGetters(['locationInfo']),
    query: function() {
      return this.$store.getters.locationInfo.query || {};
    }
  },
  methods: {
    // We can't do spread directly in vue templates.
    getQuery: function(id, actionName) {
      return { ...this.query, id, action: actionName }
    }
  },
  apollo: {
  }
}

export default AdminActionList;
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
