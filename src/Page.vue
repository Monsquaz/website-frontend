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
          if(this.page) {
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
          } else {
            this.$router.push('/404')
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
/*
    &.green {
      background: linear-gradient(to bottom,  #a8fdd1 0%,#2efd94 50%,#003214 100%) no-repeat center center fixed;
      background-size: cover;
    }
*/
    &.green {
      background: linear-gradient(
        to bottom,
        #bbffdd 0.00%,  #bbffdd 1.35%,
        #aaffd5 1.35%,  #aaffd5 5.93%,
        #99ffcc 5.93%,  #99ffcc 9.70%,
        #88ffc4 9.70%,  #88ffc4 13.75%,
        #77ffbb 13.75%, #77ffbb 17.52%,
        #66ffb3 17.52%, #66ffb3 22.10%,
        #55ffaa 22.10%, #55ffaa 26.15%,
        #44ffa2 26.15%, #44ffa2 29.92%,
        #33ff99 29.92%, #33ff99 33.96%,
        #22ff91 33.96%, #22ff91 38.54%,
        #11ff88 38.54%, #11ff88 42.59%,
        #00ff80 42.59%, #00ff80 46.36%,
        #00ee77 46.36%, #00ee77 50.40%,
        #00dd6f 50.40%, #00dd6f 54.18%,
        #00cc66 54.18%, #00cc66 58.76%,
        #00bb5e 58.76%, #00bb5e 62.80%,
        #00aa55 62.80%, #00aa55 66.58%,
        #00994d 66.58%, #00994d 70.62%,
        #008844 70.62%, #008844 75.20%,
        #00773c 75.20%, #00773c 78.98%,
        #006633 78.98%, #006633 83.02%,
        #00552b 83.02%, #00552b 87.06%,
        #004422 87.06%, #004422 91.64%,
        #00331a 91.64%, #00331a 95.42%,
        #002211 95.42%, #002211 99.46%,
        #001109 99.46%, #001109 100.00%
      ) no-repeat center center fixed;
      background-size: cover;
    }

    &.pink {
      background: linear-gradient(
        to bottom,
        #ffeef6 0.00%,  #ffeef6 1.35%,
        #ffddee 1.35%,  #ffddee 5.93%,
        #ffcce5 5.93%,  #ffcce5 9.70%,
        #ffbbdd 9.70%,  #ffbbdd 13.75%,
        #ffaad4 13.75%, #ffaad4 17.52%,
        #ff99cc 17.52%, #ff99cc 22.10%,
        #ff88c3 22.10%, #FF88c3 26.15%,
        #ff77bb 26.15%, #ff77bb 29.92%,
        #ff66b2 29.92%, #ff66b2 33.96%,
        #ff55aa 33.96%, #ff55aa 38.54%,
        #ff44a1 38.54%, #ff44a1 42.59%,
        #ff3399 42.59%, #ff3399 46.36%,
        #ff2290 46.36%, #ff2290 50.40%,
        #ff1188 50.40%, #ff1188 54.18%,
        #ff007f 54.18%, #ff007f 58.76%,
        #ee0077 58.76%, #ee0077 62.80%,
        #ff006e 62.80%, #dd006e 66.58%,
        #cc0066 66.58%, #cc0066 70.62%,
        #bb005d 70.62%, #bb005d 75.20%,
        #aa0055 75.20%, #aa0055 78.98%,
        #99004c 78.98%, #99004c 83.02%,
        #880044 83.02%, #880044 87.06%,
        #77003b 87.06%, #77003b 91.64%,
        #660033 91.64%, #660033 95.42%,
        #55002a 95.42%, #55002a 99.46%,
        #440022 99.46%, #440022 100.00%
      ) no-repeat center center fixed;
      background-size: cover;
    }
  }
</style>
