<template>
  <div class="faq">
    {{ content }}
    <ul>
      <li class="question" v-for="question in questions">
        <p><strong>Q</strong>: {{ question.q }}</p>
        <p><strong>A</strong>: {{ question.a}}</p>
      </li>
    </ul>
    Still confused? Send an email and we'll answer your question.
  </div>
</template>

<script>
// TODO! Use vue-masonry for this.
import Util from '../Util';
import gql from 'graphql-tag';
import { mapGetters } from 'vuex';

const FAQ = {
  name: 'faq',
  props: {
    page: { type: Object }
  },
  data () {
    return {};
  },
  computed: {
    content: function() {
      return Util.getTranslation(this.page.content, 'en'); // TODO: use lang from vuex state
    },
    questions: function() {
      return JSON.parse(this.page.typeView.data).questions;
    }
  },
  methods: {

  },
  apollo: {

  }
}

export default FAQ;
</script>

<style lang="sass" scoped>
  .question {
    padding: 15px;
    display: inline-block;
    width: calc(50% - 7.5px);
    border: 1px solid #c0c0c0;

    &:nth-child(2n) {
      margin-left: 15px;
    }

    &:not(:first-child) {
      margin-top: 15px;
    }
  }
</style>
