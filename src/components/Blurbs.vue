<template>
  <div class="blurbs">
    <div class="columns">
      <div v-for="blurb in data.blurbs" class="column">
        <div class="blurb">
          <router-link class="link" v-bind:to="'/'+blurb['en'].pageId">
            <icon class="icon" v-bind:name="blurb['en'].icon || 'eye'"></icon>
            <h3 class="h3">{{ blurb['en'].title }}</h3>
            <p class="content">{{ blurb['en'].content }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Util from '../Util';
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/heart-o';
import 'vue-awesome/icons/music';
import 'vue-awesome/icons/spinner';

const Blurbs = {
  name: 'blurbs',
  props: { data: { type: Object} },
  data: () => ({

  }),
  computed: {},
  apollo: {}
}

export default Blurbs;
</script>

<style lang="sass" scoped>
  .h3 {
    font-weight: 600;
    font-size: 1.1em;
    border-bottom: 1px solid #c0c0c0;
    margin-bottom: 5px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  .column:not(:first-child) {
    .blurb {
      border-left: 1px solid #c0c0c0;
      height: 100%;
    }
  }
  .blurb {
    padding: 25px;
    padding-right: 5%;
    padding-left: 5%;
    line-height: 160%;

    &:hover {
      .link {
        color: #009172;
      }
    }
  }
  .link {
    color: #000;
  }
  .icon {
    width: 100%;
    text-align: center;
    transform: scale(2);
  }
  .content {
    padding: 10px;
  }
</style>
