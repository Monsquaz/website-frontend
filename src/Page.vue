<template>
  <component
    :is="layoutComponent"
    v-bind:layout-data="layoutData"
    v-bind:type-component="typeComponent"
    v-bind:type-data="typeData"
    v-bind:content="content">
  </component>
</template>

<script>
import gql from 'graphql-tag';

let reactToRouteChange = (instance, from, to) => {
  instance.path = to.path;
  instance.graphQLUpdateRequested = true;
}

const Page = {
  name: 'page',
  data () {
    return {
      path: '',
      page: null,
      skipQuery: false,
      layoutComponent: 'loading-layout',
      layoutData: {},
      typeComponent: 'loading-type',
      typeData: {},
      content: []
    }
  },
  apollo: {
    page () {
      return {
        query: () => {
          return gql`query fetchPage ($path: String!) {
            pages(path: $path) {
              category {
                title {
                  lang
                  content
                }
              },
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
          */
          return pages[0];
        },
        result() {
          this.skipQuery = true;
          this.layoutComponent = this.page.layoutView.type.component;
          this.layoutData = JSON.parse(this.page.layoutView.data);
          this.typeComponent = this.page.typeView.type.component;
          this.typeData = JSON.parse(this.page.typeView.data);
          this.content = this.page.content;
        },
        variables: {
          path: '/'
        },
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

<style></style>