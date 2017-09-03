<template>
  <div class="page-teasers">
    <div class="teaser-row" v-for="row in rows">
      <div class="columns">
        <div v-for="page in row" class="page column">
          <div class="teaser">
            <router-link class="link" v-bind:to="'/'+page.id">
              <h3 class="h3">{{ page.title['en'] }}</h3>
              <div class="meta">
                <img v-if="page.author" class="gravatar" v-bind:src="page.author.gravatar + '?s=32'" />
                <span v-if="page.author" class="author">{{ page.author.name }}</span>
                <span class="date">{{ formatDate(page.publishDate) }}</span>
              </div>
              <img class="img" v-if="page.images[0]" v-bind:src="page.images[0].url" />
              <p class="content">{{ page.teaser['en'] }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Util from '../Util';
import gql from 'graphql-tag';

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
    page: {id: 5}
  }),
  computed: {
    rows: function(){
      if(!this.relatedPages) return [];
      let _pages = this.relatedPages.slice(0);
      let layout = getLayout(_pages.length);
      let result = [];
      for(let numPages of layout) {
        result.push(_pages.splice(0, numPages))
      }
      return result;
    }
  },
  methods: {
    formatDate: function(d){
      if(!d) return null;
      return (new Date(d)).toISOString().split('T')[0];
    }
  },
  apollo: {
    relatedPages () {
      return {
        query: () => {
          return gql`query ($pageId: Int!) {
            pages(id: $pageId) {
              relatedByCategory {
                id,
                images { url },
                title {
                  lang, content
                },
                teaser {
                  lang, content
                },
                publishDate,
                author {
                  id,
                  name,
                  gravatar,
                  page {
                    paths {
                      lang,
                      path
                    }
                  }
                }
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {},
        update({ pages }) {console.warn('pages', pages[0].relatedByCategory.map((e) => {
          return {
            ...e,
            title:  Util.mapTranslations(e.title),
            teaser: Util.mapTranslations(e.teaser),
          }
        }));
          if(pages.length == 0) {
            this.$store.dispatch('setFlashNotification', {
              type: 'error',
              content: `Could not load related pages.`
            });
          }
          return pages[0].relatedByCategory.map((e) => {
            return {
              ...e,
              title:  Util.mapTranslations(e.title),
              teaser: Util.mapTranslations(e.teaser),
            }
          });
        },
        result() {
          if(this.page) {

          }
        },
        error(error) {
          // TODO: Show some service is down component
          this.isError = true;
        },
        variables: () => ({
          pageId: this.page.id
        }),
        skip: () => {
          return false;
        }
      };
    }
  }
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
  .page:not(:first-child) {
    .teaser {
      border-left: 1px solid #c0c0c0;
      height: 100%;
    }
  }
  .teaser-row {
    &:not(:first-child) {
      border-top: 1px solid #c0c0c0;
    }
  }
  .teaser {
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
  .test {
    border-top: 1px solid black;
  }
  .img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
