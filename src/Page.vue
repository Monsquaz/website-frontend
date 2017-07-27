<template>
  <component
    :is="layoutComponent"
    v-bind:type-component="typeComponent"
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
      typeComponent: 'basic-type',
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
          console.warn('404 :(');
        }
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
