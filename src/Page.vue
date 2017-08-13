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
      graphQLUpdateRequested: false,
      layoutComponent: 'basic-layout',
      layoutData: {},
      typeComponent: 'basic-type',
      typeData: {},
      content: 'test'
    }
  },
  apollo: {
    page: {
      query: () => {
        return gql`query fetchPage ($path: String!) {
          pages(path: $path) {
            id
          }
        }`
      },
      update(pages) {
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
        Page.graphQLUpdateRequested = false;
      },
      variables: {
        path: '/'
      },
      skip: () => {
        return !Page.graphQLUpdateRequested;
      }
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
