<template>
  <aside class="menu">
    <ul class="menu-list">
      <li
        v-for="item in menuItemsTreeMerged"
        v-bind:key="item.id">
        <router-link v-bind:to="item.page.slug['en']">{{ item.title['en'] }}</router-link>
        <ul v-if="item.children" class="menu-list">
          <li
            v-for="subitem in item.children" v-bind:key="subitem.id">
            <router-link v-bind:to="subitem.page.slug['en']">{{ subitem.title['en'] }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';

const VerticalMenu = {
  name: 'vertical-menu',
  props: {
    data: Object
  },
  data () {
    return {};
  },
  computed: {
    menuItemsTreeMerged: function() {
      if(this.menu && this.menuItemsTree) {
        return Util.mapTree(this.menu.items, this.menuItemsTree);
      } else {
        return null;
      }
    }
  },
  apollo: {
    menuItemsTree () {
      return {
        query: () => {
          return gql`query ($menuId: Int!) {
            menuItemsTree(menuId: $menuId) {
              ancestor {
                id
              }, descendant {
                id
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {},
        update({ menuItemsTree }) {
          return menuItemsTree;
        },
        result() {},
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          menuId: this.data.id
        }),
        skip: () => {
          return false;
        }
      };
    },
    menu () {
      return {
        query: () => {
          return gql`query ($menuId: Int!) {
            menus(id: $menuId) {
              items {
                id, title {
                  lang
                  content
                }, page { slug {
                  lang
                  content
                } }
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {},
        update({ menus }) {
          if(menus.length == 0) {
            this.$store.dispatch('setFlashNotification', {
              type: 'error',
              content: `Menu ${this.data.id} not found`
            });
          }
          return {
            items: menus[0].items.map((e) => ({
              ...e,
              title: Util.mapTranslations(e.title),
              page: {
                ...e.page,
                slug: Util.mapTranslations(e.page.slug)
              }
            }))
          };
        },
        result() {},
        error(error) {
          this.$store.dispatch('setFlashNotification', {
            type: 'error',
            content: error
          });
        },
        variables: () => ({
          menuId: this.data.id
        }),
        skip: () => {
          return false;
        }
      };
    }
  }
}

export default VerticalMenu;
</script>

<style lang="sass" scoped>
  .menu {
    padding: 12px;
  }
</style>
