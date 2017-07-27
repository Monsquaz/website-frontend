<template>
  <div class="page">
    <h1>{{ path }}</h1>
    <p v-if="page">Page: {{ JSON.stringify(page) }}</p>
    <p v-else>Nope</p>
  </div>
</template>

<script>
import gql from 'graphql-tag';

let reactToRouteChange = (instance, from, to) => {
  instance.path = to.path;
  instance.graphQLUpdateRequested = true;
}

const Page = {
  data () {
    return {
      path: '',
      page: null,
      graphQLUpdateRequested: false
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
