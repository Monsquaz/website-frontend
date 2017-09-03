<template>
  <div class="admin-browser">
    <div v-if="thisNode">
      <h2 class="h2">
        {{ thisNode.name }}
        <router-link v-if="parent" :to="{ path: 'admin', query: { id: parent.id }}">
          [ .. {{ parent.name }}]
        </router-link>
      </h2>
      <table v-if="!('action' in this.query)" class="table">
        <tr>
          <th>Administrable</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
        <tr v-for="child in children">
          <th v-if="!child.manifest">
            <router-link :to="{ path: 'admin', query: { id: child.id }}">
              {{ child.name }}
            </router-link>
          </th>
          <th v-else>
            {{ child.name }}
          </th>
          <td v-if="child.manifest">{{ child.manifest.type }}</td>
          <td v-else>FOLDER</td>
          <td>
            <admin-action-list
              v-bind:administrable-id="child.id"
              v-bind:actions="child._actions"
            />
          </td>
        </tr>
      </table>
      <div v-else>
        {{ this.query.action }}
        <admin-action
          v-bind:administrable-id="thisNode.id"
          v-bind:action="this.query.action"
        />
      </div>
      <div v-if="children.length > 0">
      </div>
    </div>

  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';
import { mapGetters } from 'vuex';

const AdminBrowser = {
  name: 'admin-browser',
  data: () => {
    return {
      thisNode:     null,
      children:   [],
      skipQuery:  false,
    };
  },
  props: {
    page: { type: Object }
  },
  computed: {
    ...mapGetters(['locationInfo']),
    id: function() {
      return this.$store.getters.locationInfo.query.id
        || 1; // Root
    },
    query: function(){
      return this.$store.getters.locationInfo.query;
    },
    title: function() {
      return Util.getTranslation(this.thisNode.name, 'en');
    }
  },
  apollo: {
    parent () {
      return {
        query: () => {
          return gql`query ($descendantId: Int) {
            administrablesTree (descendantId: $descendantId) {
              ancestor {
                id,
                name {
                  lang,
                  content
                }
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {},
        update({administrablesTree}) {
          if(administrablesTree.length == 0) return null;
          return {
            ...administrablesTree[0].ancestor,
            name: Util.getTranslation(administrablesTree[0].ancestor.name, 'en')
          };
        },
        result() {
          console.warn('PARENT RESULT!', this.parent);
        },
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          descendantId: this.id,
        }),
        skip: () => {
          return this.skipQuery;
        }
      };
    },
    thisNode() {
      return {
        query: () => {
          return gql`query ($ancestorId: Int) {
            administrables (id: $ancestorId) {
              id,
              name {
                lang,
                content
              },
              manifest {
                type
              },
              _actions {
                name
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {},
        update({administrables}) {
          if(administrables.length == 0) return null;
          return {
            ...administrables[0],
            name: Util.getTranslation(administrables[0].name, 'en')
          };
        },
        result() {
          console.warn('thisNode RESULT!', this.thisNode);
        },
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          ancestorId: this.id,
        }),
        skip: () => {
          return false;
        }
      };
    },
    children () {
      return {
        query: () => {
          return gql`query ($ancestorId: Int) {
            administrablesTree (ancestorId: $ancestorId) {
              descendant {
                id,
                name {
                  lang,
                  content
                },
                manifest {
                  type
                },
                _actions {
                  name
                }
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {},
        update({administrablesTree}) {
          return administrablesTree.map(e => ({
            ...e.descendant,
            name: Util.getTranslation(e.descendant.name, 'en')
          }));
        },
        result() {
          console.warn('CHILDREN RESULT!', this.children);
        },
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          ancestorId: this.id,
        }),
        skip: () => {
          return 'action' in this.query;
        }
      };
    }
  }
}

export default AdminBrowser;
</script>

<style lang="sass" scoped>
  .h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #c0c0c0;
  }
</style>
