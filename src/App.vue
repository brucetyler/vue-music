<template>
  <div id="app">
  <audio id="myaudio" ref="audio" :src='mSrc' @canplay='setDuration' @timeupdate="musicTimeUpdate" @ended="musicEnded"></audio>
  <!-- 头部导航栏 -->
  <v-header></v-header>
  <!-- 侧边栏 -->
  <side-bar :child-msg="isActive"></side-bar>
  <!--底部歌曲栏 -->
  <bottom-bar></bottom-bar>
  <!--音乐播放详情栏-->
  <music-detail></music-detail>
  <!--音乐播放列表-->
  <music-list></music-list>
  </div>
</template>
<script>
import headers from './components/header.vue'
import sidebar from './components/sidebar.vue'
import bottombar from './components/bottombar.vue'
import musicdetail from './components/musicdetail.vue'
import range from './components/range.vue'
import musiclist from './components/musiclist.vue'
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import store from './store'
import common from '../static/js/common.js'
Vue.prototype.$http = axios;

export default {
  name: 'app',
  data(){
    return {
      isActive:false,
      mSrc:'',
      musicLrcIndex:0
    }
  },
  methods:{
       setDuration(){
        var _this=this;
          store.dispatch({
            type:'set_MusicDuration',
            duration:Math.floor(_this.$refs.audio.duration)
          })
       },
       musicTimeUpdate(){
        store.dispatch({
          type:'set_MusicCurrentTime',
          time: Math.floor(this.$refs.audio.currentTime)
        })
        let musicLrc=this.$store.getters.getCurrentLyric;
        let currentTime = Math.floor(this.$refs.audio.currentTime)
        // console.log(musicLrc)
        // console.log(this.musicLrcIndex)
        // console.log(musicLrc[this.musicLrcIndex])
         for(let i=0;i<musicLrc.length;i++){
          if(this.musicLrcIndex==musicLrc.length){
             this.musicLrcIndex=musicLrc.length-1;
             store.commit({
              'type':'setLytriIndex',
              'index':this.musicLrcIndex
              })
             break;
          }
          let lyricTime=musicLrc[this.musicLrcIndex].time.split(':')[0]*60+Math.floor(musicLrc[this.musicLrcIndex].time.split(':')[1])
          if(currentTime>=lyricTime&&this.musicLrcIndex<musicLrc.length){
            this.musicLrcIndex++;
            continue;
          }
          else if(this.musicLrcIndex>0){
             this.musicLrcIndex--;
            }
         store.commit({
          'type':'setLytriIndex',
          'index':this.musicLrcIndex
         })
        }
       },
       musicEnded(){
        console.log('over')
        this.musicLrcIndex=0;
        let playType=this.$store.getters.getMusicType ? this.$store.getters.getMusicType : '-1';
        if(playType==1){//顺序播放
            store.dispatch({
              type:'set_currentIndex',
              index:this.$store.getters.getCurrentIndex+1
             })
            let m=this.$store.getters.getCurrentPlay
            console.log(m)
          common.musicData.getMusicDetail(this,m.id)
          common.musicData.getMusicLyric(this,m.id)
             /*获取音乐url*/
         this.$http.get('http://localhost:3000/music/url?id='+m.id).then(response=>{
         store.dispatch('set_MusicPlaySrc',response.data.data[0].url)
         store.dispatch('play_current')
       })
   
        }
        
       } 
  },
  created(){
      common.musicData.getMusicDetail(this,'108965')
      common.musicData.getMusicUrl(this,'108965')
      common.musicData.getMusicLyric(this,'108965')
      /*获取歌单*/
      this.$http.get('http://localhost:3000/playlist/detail?id=143293719').then(res=>{
        console.log(res.data)
        store.dispatch('set_musicAllList',res.data.result.tracks)
      })
      
  },
  components:{
    'v-header': headers,
    'side-bar': sidebar,
    'bottom-bar': bottombar,
    'music-detail': musicdetail,
    range,
    'music-list':musiclist
  }
}
</script>

<style>
@import "/static/font-icon/style.css"
</style>
