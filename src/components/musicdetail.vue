<template>
<transition name="sliderUpHideRight">
  <div class="musicdetail" v-show='isShowMusicDetail'>
      <div class="background_Image" :style="{background : 'url(' + this.getCurrentMusic.al.picUrl + ')', backgroundSize : 'cover' , backgroundPosition : 'center center'}"></div>
      <div class="musicdetailContent">
      <div class="musicdetail-head">
         <i class="back icon-back" @click="hideMusicDetail"></i>
         <div class="music-info">
         <p class="music-name">{{this.$store.state.audioInfo.musicName}}</p>
         <p class="music-artist">{{this.$store.state.audioInfo.artist}}</p>
         </div>
      </div>
      <transition name="fade">
      <div class="musicdetail-content">
        <div class="lyc-wrapper" v-show='!showCD' @click.stop='isShowCD'>
           <div class="div-lyc" :scroll-top.prop='scrollTop' ref='divLyc'>
             <p v-for='(lyc,index) in getCurrentLyric' :data-index='index' :data-time='lyc.time' :class='lyricIndex==index?"lyricActive":""'>{{lyc.time}}--{{lyc.text}}</p>
           </div>
        </div>
        <div class="music-cd" v-show='showCD' @click.stop='isShowCD'>
        <div class="split">
          <div class="triger" :class="isPlaying ? '' : 'pause'"></div>
        </div>
        <div class="wrapper" ref="cd">
          <div class="cd-content" ref="cdcontent" :class="isPlaying ? 'animate' :''">
          <div class="cd-bg"></div>
          <img :src="getCurrentMusic.al.picUrl" class="cd-img">
          </div>
          </div>
          <div class="musicDo">
              <i class="icon icon-like"></i>
              <i class="icon icon-download"></i>
              <i class="icon icon-msg"></i>
              <i class="icon icon-list-circle-small"></i>
            </div>
        </div>
      </div>
      </transition>
      <div class="musicdetail-footer">
          <div class="music-range">
            <range></range>
          </div>
          <div class="musicDetailCtrl">
            <i class="playType" :class='getMusicType' @click.stop='toggleType'></i>
            <i class="prev icon-prevdetail"></i>
            <i class="playPause" :class="isPlaying?'icon-pause-detail':'icon-playdetail'" @click.stop='playOrPause'></i>
            <i class="next icon-nextdetail"></i>
            <i class="menu icon-list-music"></i>
          </div>
      </div>
      </div>
  </div>
  </transition>
</template>

<script>
import store from '../store'
import range from './range'
export default {
    data(){
      return {
           musicAllInfo:{
             al:{
              picUrl:''
            }
           },
           isPlay:false,
           showCD:true,
           scrollTop:0
      }
    },
    methods:{
      hideMusicDetail(){
        store.dispatch({
          type: 'show_musicDetail',
          isShow: false
        })
      },
      playOrPause(){
        store.dispatch('toggle_play')
      },
      toggleType(){
        store.dispatch('toggle_MusicType')
      },
      isShowCD(){
        this.showCD=!this.showCD;
      }
    },
    computed:{
      isPlaying () {
        this.isPlay = this.$store.getters.getIsPlaying
        return this.$store.getters.getIsPlaying ? this.$store.getters.getIsPlaying : ''
      },
      lyricIndex(){
        return this.$store.getters.getCurrentLyricIndex;
      },
      isShowMusicDetail(){
        return this.$store.state.audioInfo.isShowDetail;
      },
      getCurrentMusic(){
        return this.$store.getters.getCurrentMusic
        },
      getCurrentLyric(){
        return this.$store.getters.getCurrentLyric;
      },
      getMusicType(){
        let mType=this.$store.getters.getMusicType ? this.$store.getters.getMusicType : '-1';
        let className='';
        switch (mType) {
          case 1:
            className='icon-music-shunxu'
            break;
          case 2:
            className='icon-music-danqu1'
            break;
          case 3:
            className='icon-music-random'
            break;
          default:
            className=''
        }
        return className
      }
      },
      watch:{
        isPlay: function (newisPlay, oldisPlay) {
        if (newisPlay !== true) {
          let contentTrans = getComputedStyle(this.$refs.cdcontent).transform
          let cdTrans = getComputedStyle(this.$refs.cd).transform
          this.$refs.cd.style.transform = cdTrans === 'none' ? contentTrans : contentTrans.concat('', cdTrans)
        }
      },
      lyricIndex: function(newVal,oldValue){
        let top=this.$refs.divLyc.offsetTop;
        this.scrollTop=top+newVal*37;
      }
      },
      mounted(){
      
      },
      components:{
        range
      }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/css/musicdetail.css'
</style>
