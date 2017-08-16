<template>
  <div class="layout-view green">
    <div style="width:100%;height:100%" class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>

const LoadingLayout = {
  name: 'loading-layout',
  props: {
    page: { type: Object },
  },
  data () {
    return {}
  },
  apollo: {

  }
}

export default LoadingLayout ;
</script>

<style lang="sass">
  
  $size: 150px;

  @-webkit-keyframes lds-ripple {
    0% {
      top: 90px;
      left: 90px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 15px;
      left: 15px;
      width: 150px;
      height: 150px;
      opacity: 0;
    }
  }
  @keyframes lds-ripple {
    0% {
      top: 90px;
      left: 90px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 15px;
      left: 15px;
      width: 150px;
      height: 150px;
      opacity: 0;
    }
  }
  .lds-ripple {
    position: relative;
  }
  .lds-ripple div {
    box-sizing: content-box;
    position: absolute;
    border-width: 10px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(1) {
    border-color: #000000;
  }
  .lds-ripple div:nth-child(2) {
    border-color: #000000;
    animation-delay: -0.5s;
  }
</style>
