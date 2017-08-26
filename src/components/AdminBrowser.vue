<template>
  <div class="admin-browser">
    <div v-if="parent">
      <h2 class="h2">
        {{ parent.name }}
      </h2>
      <table class="table">
        <tr>
          <th>Administrable</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
        <tr v-for="child in children">
          <th>
            {{ child.name }}
          </th>
          <td v-if="child.manifest">{{ child.manifest.type }}</td>
          <td v-else>FOLDER</td>
          <td>
            <admin-actions
              v-bind:administrable-id="child.id"
              v-bind:actions="child._actions"
            />
          </td>
        </tr>
      </table>
      <div v-if="children.length > 0">
      </div>
    </div>

  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';

const AdminBrowser = {
  name: 'admin-browser',
  data: () => {
    return {
      parent:     null,
      children:   [],
      ancestorId: 1,
      skipQuery:  false,
    };
  },
  props: {

  },
  computed: {
    title: function() {
      return Util.getTranslation(this.parent.name, 'en');
    }
  },
  apollo: {
    parent() {
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
          return {
            ...administrables[0],
            name: Util.getTranslation(administrables[0].name, 'en')
          };
        },
        result() {
          console.warn('RESULT!', this.parent);
        },
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          ancestorId: this.ancestorId,
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
          console.warn('RESULT!', this.parent);
        },
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          ancestorId: this.ancestorId,
        }),
        skip: () => {
          return this.skipQuery;
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
