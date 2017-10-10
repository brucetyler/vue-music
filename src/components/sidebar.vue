<template>
  <div class="sidebar">
    <transition name="fade" @touchmove.stop.prevent>
  	<div class="menu-wrapper" v-show="isReallShow" @click="hideMenu"></div>
      </transition>
    <transition name="side">
    <div class="menu-content" v-show="isReallShow">
      sidebar
      </div>
      </transition>
  </div>
</template>

<script>
  import store from '../store'
export default {
  name: 'sidebar',
  data () {
    return {
//      'isShow':false
    }
  },
  methods:{
    hideMenu () {
      store.dispatch({
        type: 'hideSideBar'
      })
    }
  },
  computed: {
    // 显示
    isReallShow () {
      return store.state.sideBar.isShow
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sidebar .menu-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 1;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);

  }
  .sidebar .menu-wrapper.fade-enter-to,.sidebar .menu-wrapper.fade-leave-to{
    transition: opacity 0.3s
  }
  .sidebar .menu-wrapper.fade-enter,.sidebar .menu-wrapper.fade-leave-to{
    opacity: 0
  }
  .menu-content {
    position: fixed;
    width: 286px;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 11;
    overflow-y: auto;
    background: #fff;
    -webkit-overflow-scrolling: touch
  }
  .menu-content.side-enter-to, .menu-content.side-leave-to {
    transition: transform 0.3s
  }
  .menu-content.side-enter,.menu-content.side-leave-to{
    transform: translate3d(-286px, 0, 0)
  }
</style>
