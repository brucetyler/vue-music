<template>
  <div class="bottombar" @click='showDeatil'>
     <div class='music-info'>
       <div class='img-box'>
       <img :src='music_src' class='m-src'>
       </div>
       <div class='desc-box'>
          <p class="song">{{this.$store.state.audioInfo.musicName}}</p>
          <p class="atrist">{{this.$store.state.audioInfo.artist}}</p>
       </div>
     </div>
     <div class='list-btn' @click.stop='showMusicList'>
       <i class="music-list icon-list-music"></i>
     </div>
     <div class='play-btn' @click.stop='playOrPause'>
         <i :class="iconPlayPause?'icon-pause':'icon-play'"></i>
     </div>
     
  </div>
</template>

<script>
import store from '../store'
export default {
    data(){
      return {

      }
    },
    methods:{
      showDeatil(){
        store.dispatch(
          {
            type:'show_musicDetail',
            isShow:true
          })
      },
      playOrPause(){
        store.dispatch('toggle_play')
      },
      showMusicList(){
        store.dispatch({
          type:'show_musicList',
          isShow:true
          })
      }
    },
    computed:{
      music_src(){
         return this.$store.state.audioInfo.musicSrc;
      },
      iconPlayPause(){
        return this.$store.state.audioInfo.playing;
      }
    }
}

</script>


<style scoped>
.bottombar{
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 4px;
  text-align: center;
  width: 100%;
  height: 45px;
  background:#fff;
  border-top:solid 1px #ccc; 
  box-sizing:border-box;
}
.music-info{
  width: 70%;
  height: 100%;
  display: flex;
  float: left;
}
.play-btn{
  float: right;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  box-sizing:border-box;
  border: 2px solid #999;
  border-radius: 50%;
  position: relative;
}
.play-btn i{
  position: absolute;
  top:50%;
  transform: translate3d(-50%, -50%, 0);
}
.icon-pause{
  left: 50%;
  color: #c62f2f;
}
.icon-play{
  left: 55%;
}
.list-btn{
  float: right;
  position: relative;
  width: 32px;
  height: 32px;
}
.list-btn i{
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 26px;
  color: #999;
}
.img-box{
  flex: 1.0;
  box-sizing:border-box;
}
.img-box img{
  height: 36px;
  width: 36px;
}
.desc-box{
  flex: 4.0;
}
.desc-box p{
  margin:0 0 0 10px;
  text-align: left;
}
.desc-box .song{
  font-size: 14px;
}
.desc-box .atrist{
  font-size: 12px;
}
</style>
