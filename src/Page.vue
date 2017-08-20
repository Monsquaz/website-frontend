<template>
  <div class="page">
    <component
      v-if="page && !isError"
      :is="page.layoutView.type.component"
      v-bind:page="page" />
    <loading-layout v-else-if="isLoading && !isError" />
    <error-page v-else-if="isError" v-bind:="error" />
  </div>
</template>

<script>
import Util from './Util';
import gql from 'graphql-tag';
import Config from '../config';

let reactToRouteChange = (instance, from, to) => {
  instance.path = to.path;
  instance.skipQuery = false;
}

const Page = {
  name: 'page',
  data () {
    return {
      path: '/',
      page: null,
      skipQuery: false,
      isLoading: true,
      isError: false,
      error: ''
    }
  },
  apollo: {
    page () {
      return {
        query: () => {
          return gql`query ($path: String!) {
            pages(path: $path) {
              id,
              category {
                title {
                  lang
                  content
                }
              },
              categoriesBreadcrumbs {
                id, depth, ancestor {
                  id, title {
                    lang
                    content
                  },
                  page {
                    title {
                      lang
                      content
                    }
                    slug {
                      lang
                      content
                    }
                  }
                },
              }
              tags {
                name {
                  lang
                  content
                }
              },
              canonical {
                paths {
                  lang
                  path
                }
              },
              comments,
              layoutView {
                type {
                  component
                },
                data
              },
              typeView {
                type {
                  component
                },
                data
              },
              slug {
                lang
                content
              },
              title {
                lang
                content
              },
              content {
                lang
                content
              },
              paths {
                lang
                path
              }
            }
          }`
        },
        watchLoading(isLoading, countModifier) {
          this.isLoading = isLoading;
        },
        update({ pages }) {
          if(pages.length == 0) {
            // TODO: Go to 404 page!
            // this.$router.push('/404')
            // this.$route.router.go('/404');
            console.warn('404 :(');
          }
          /*
            TODO: Identify which language the user is visiting based on
            the matched slug, and later use that to display the content in the correct language.
            + add a language switcher if the page has content in other languages

            UNTIL THIS IS DONE, WE COULD ASSUME THE LANGUAGE IS 'en' EVERYWHERE

            TODO: Use vuex for that!
          */
          return pages[0];
        },
        result() {
          this.skipQuery = true;
          document.title = Util.getTranslation(this.page.title, 'en'); // TODO
          // TODO: Save element so it doesn't have to be queried next time?
          let canonical = document.querySelector('link[rel="canonical"]');
          if(this.page.canonical) {
            canonical.href = Config.baseUri
              + Util.getTranslation(this.page.canonical.paths, 'en', 'path');
          } else {
            canonical.href = Config.baseUri
              + Util.getTranslation(this.page.paths, 'en', 'path');
          }
        },
        error(error) {
          // TODO: Show some service is down component
          this.isError = true;
        },
        variables: () => ({
          path: this.path
        }),
        skip: () => {
          return this.skipQuery;
        }
      };
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      reactToRouteChange(vm, from, to);
    });
  },
  beforeRouteUpdate (to, from, next) {
    reactToRouteChange(this, from, to);
    next();
  }
}

export default Page;
</script>

<style lang="sass">

  .layout-view {

    &.green {
      background: linear-gradient(to bottom,  #a8fdd1 0%,#2efd94 50%,#003214 100%) no-repeat center center fixed;
      background-size: cover;
    }

  }
</style>
