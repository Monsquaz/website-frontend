<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item home" to="/">
        <img src="images/favicon-32x32.png" class="logo" /> &nbsp;
        Monsquaz.org
      </router-link>
      <div class="navbar-burger burger" v-on:click="isActive = !isActive">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="navMenubd-example" class="navbar-menu" v-bind:class="{'is-active': isActive}">
      <div class="navbar-start">
        <div
          class="navbar-item"
          v-for="item in menuItemsTreeMerged"
          v-bind:class="{
            'has-dropdown': item.children,
            'is-hoverable': item.children
          }">
          <router-link class="navbar-link" v-bind:to="item.page.slug['en']">{{ item.title['en'] }}</router-link>
          <div v-if="item.children" class="navbar-dropdown">
            <router-link
              class="navbar-link"
              v-for="subitem in item.children"
              v-bind:to="subitem.page.slug['en']">
              {{ subitem.title['en'] }}
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="!user" class="navbar-end">
        <router-link class="navbar-item" to="login">Login</router-link>
        <router-link class="navbar-item" to="register">Register</router-link>
      </div>
      <div v-if="user" class="navbar-end">
        <router-link class="navbar-item" to="profile">
          <img class="gravatar" v-bind:src="user.gravatar" />
          {{ user.name }}
        </router-link>
        <a class="navbar-item" v-on:click.stop="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';
import { mapGetters } from 'vuex';

const HorizontalMenu = {
  name: 'horizontal-menu',
  props: {
    data: Object
  },
  data () {
    return {
      isActive: false,
      menu: null,
      menuItemsTree: []
    };
  },
  computed: {
    ...mapGetters(['user']),
    menuItemsTreeMerged: function() {
      if(this.menu && this.menuItemsTree) {
        return Util.mapTree(this.menu.items, this.menuItemsTree);
      } else {
        return null;
      }
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout');
      this.$router.push('/');
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

export default HorizontalMenu;
</script>

<style lang="sass" scoped>
  .navbar {
    position: relative;
    z-index: 6;
  }
  .logo {

  }
  .home {
    letter-spacing: 1px;
  }
  .gravatar {
    margin-right: 10px;
  }
</style>
