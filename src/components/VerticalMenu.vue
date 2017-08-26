<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a class="is-active">Manage Your Team</a>
        <ul>
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
    </ul>
    <p class="menu-label">
      Transactions
    </p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
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
