<template>
  <div class="arrows-container">
    <div class="x1"></div>
    <div class="x2"></div>
    <div class="x3"></div>
    <div class="x4"></div>
    <div class="x5"></div>
    <div class="x6"></div>
    <div class="x7"></div>
    <div class="x8"></div>
    <div class="x9"></div>
    <div class="x10"></div>
    <div class="x11"></div>
    <div class="x12"></div>
    <div class="x13"></div>
    <div class="x14"></div>
    <div class="x15"></div>
    <div class="x16"></div>
    <div class="x17"></div>
    <div class="x18"></div>
    <div class="x19"></div>
  </div>
</template>

<script>

import Util from '../Util';

const Footer = {
  name: 'footer',
  props: {},
  data () {
    return {};
  },
  apollo: {

  }
}

export default Footer;
</script>

<style lang="sass" scoped>
  .arrows-container {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  %arrow {
    position: absolute;
    background-image: url("/images/pink-arrow.png");
    width: 101px;
    height: 121px;
    top: -150px;
    overflow: hidden;
    animation-fill-mode: forwards;
    transition: top 1s;
  }
  .x1  { @extend %arrow; left: 5vw;  animation:  move-green-arrow 10.6s  linear -5.0s infinite reverse; }
  .x2  { @extend %arrow; left: 10vw; animation:  move-green-arrow 10.5s  linear -3.1s infinite reverse; }
  .x3  { @extend %arrow; left: 15vw; animation:  move-green-arrow 9.8s   linear -0.7s infinite reverse; }
  .x4  { @extend %arrow; left: 20vw; animation:  move-green-arrow 10.2s  linear -6.5s infinite reverse; }
  .x5  { @extend %arrow; left: 25vw; animation:  move-green-arrow 7s     linear -2.1s infinite reverse; }
  .x6  { @extend %arrow; left: 30vw; animation:  move-green-arrow 6.3s   linear 0.8s infinite reverse; }
  .x7  { @extend %arrow; left: 35vw; animation:  move-green-arrow 5.9s   linear -2.7s infinite reverse; }
  .x8  { @extend %arrow; left: 40vw; animation:  move-green-arrow 8.3s   linear -3.7s infinite reverse; }
  .x9  { @extend %arrow; left: 45vw; animation:  move-green-arrow 7.6s   linear -2.5s infinite reverse; }
  .x10 { @extend %arrow; left: 50vw; animation:  move-green-arrow 11.1s  linear -8.3s infinite reverse; }
  .x11 { @extend %arrow; left: 55vw; animation:  move-green-arrow 7.5s   linear -2.3s infinite reverse; }
  .x12 { @extend %arrow; left: 60vw; animation:  move-green-arrow 7s     linear -3.9s infinite reverse; }
  .x13 { @extend %arrow; left: 65vw; animation:  move-green-arrow 11.4s  linear -2.6s infinite reverse; }
  .x14 { @extend %arrow; left: 70vw; animation:  move-green-arrow 8.9s   linear -1.9s infinite reverse; }
  .x15 { @extend %arrow; left: 75vw; animation:  move-green-arrow 7.5s   linear -3.4s infinite reverse; }
  .x16 { @extend %arrow; left: 80vw; animation:  move-green-arrow 5.4s   linear -1.6s infinite reverse; }
  .x17 { @extend %arrow; left: 85vw; animation:  move-green-arrow 6.4s   linear -2.7s infinite reverse; }
  .x18 { @extend %arrow; left: 90vw; animation:  move-green-arrow 11.7s  linear -2.9s infinite reverse; }
  .x19 { @extend %arrow; left: 95vw; animation:  move-green-arrow 8.9s   linear -6.2s infinite reverse; }
  @keyframes move-green-arrow {
    0% {
      transform: translate3d(0, calc(100vh + 150px), 0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    95% {
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 0;
    }
  }
</style>
