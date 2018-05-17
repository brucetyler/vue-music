<template>
    <div class="header">
      <div class="warpper">
        <i class="menu icon-menu" @click="showMenu"></i>
        <div class="centermenu" @click="hideMenu">
       <router-link tag="i" to="/mymusic"><i class="music icon-music"></i></router-link>
			<router-link tag="i" to="/findmusic"><i class="find icon-wangyi"></i></router-link>
			<router-link tag="i" to="/community"><i class="community icon-community"></i></router-link>
				</div>
         <i class="search icon-search"></i>
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import store from '../store'
export default {
  name: 'headers',
  data(){
    return {
//      'isShow':false
    }
  },
  props: ['childMsg'],
  methods:{
    showMenu () {
      store.dispatch({
        type: 'showSideBar'
      })
    },
    hideMenu () {
      store.dispatch({
        type: 'hideSideBar'
      })
    },
  }
}
</script>
<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    z-index: 10;
    background: #c62f2f;
}
.header .warpper {
    height: 100%;
    background: #c62f2f;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.header .warpper .icon-menu, .header .warpper .icon-search {
    color: #fff;
    font-size: 26px;
    padding: 10px 15px;
}
.header .warpper .centermenu i {
    margin: 0 5px;
    color: #ccafaf;
    font-size: 22px;
}
.header .warpper .centermenu i.router-link-active i{
	color:#eee
}
</style>

