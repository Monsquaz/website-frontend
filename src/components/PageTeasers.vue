<template>
  <div class="page-teasers">
    <div v-for="row in pages" class="columns">
      <div v-for="page in row" class="column">
      </div>
    </div>
  </div>
</template>

<script>

import Util from '../Util';

let getLayout = (n) => {
  let result = [];
  while(n > 0) {
    switch(n) {
      case 0:   break;
      case 1:   result.unshift(1);    n -= 1; break;
      case 2:   result.unshift(2);    n -= 2; break;
      case 3:   result.unshift(1, 2); n -= 3; break;
      case 4:   result.unshift(2, 2); n -= 4; break;
      case 5:   result.unshift(2, 3); n -= 5; break;
      case 6:   result.unshift(3, 3); n -= 6; break;
      case 7:   result.unshift(3, 4); n -= 7; break;
      case 8:   result.unshift(4, 4); n -= 8; break;
      default:  result.unshift(4);    n -= 4; break;
    }
  }
  return result;
};

const PageTeasers = {
  name: 'page-teasers',
  props: {
    data: { type: Object }
  },
  data: () => ({

  }),
  computed: {
    pages: function(){
      if(!data.pages) return [];
      let _pages = data.pages.slice(0);
      let layout = getLayout(_pages.length);
      let result = [];
      for(let numPages of layout) {
        result.push(_pages.splice(0, numPages))
      }
      return result;
    }
  },
  apollo: {}
}

export default PageTeasers;
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
