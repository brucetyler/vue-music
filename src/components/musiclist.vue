<template>
  <div class="musiclist" v-show='isShowMusicList'>
       <div class="list-container">
            <div class="list-title">播放列表</div>
            <ul class="list-wrapper">
              <li v-for='(item,index) in getAllList' @click.stop='playMusic(item.id,index)'>
              <i v-show='index==getIndex' class="playingicon icon-volume-medium"></i>
              {{item.name}}
              </li>
            </ul>
       </div>
       <div class="list-background" @click='hideMusicList'></div>
  </div>
</template>

<script>
import store from '../store'
export default {
    data(){
      return{}
    },
    methods:{
      hideMusicList(){
        store.dispatch({
          type:'show_musicList',
          isShow:false
          })
      },
      playMusic(id,index){
        store.dispatch({
          type:'set_currentIndex',
          index:index
        })
        /*获取音乐url*/
        this.$http.get('http://localhost:3000/music/url?id='+id).then(response=>{
         store.dispatch('set_MusicPlaySrc',response.data.data[0].url)
         store.dispatch('play_current')
       })
          /*获取歌曲详情*/
      this.$http.get('http://localhost:3000/song/detail?ids='+id).then(res=>{
        store.dispatch('set_musicList',res.data.songs);
      })
      /*获取歌词*/
      this.$http.get('http://localhost:3000/lyric?id='+id).then(res=>{
        let Lyc=res.data.lrc.lyric.split('[');
        let lrcArray=[];
        Lyc.forEach(function(data,index){
          let cLyc=data.split(']')
          if(cLyc!=''&& typeof(Number(cLyc[0].split(':')[0]))=='number'){
          lrcArray.push({'time':cLyc[0],'text':cLyc[1]})
        }
        })
        store.dispatch('set_currentLyric',lrcArray)
      })
      
      }
    },
    computed:{
      isShowMusicList(){
        return this.$store.getters.isShowMusicList;
      },
      getAllList(){
        return this.$store.getters.getMusicAllList;
      },
      getIndex(){
        return this.$store.getters.getCurrentIndex;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.musiclist{
 width: 100%;
 height: 100%;
}
.musiclist .list-container{
  position: fixed;
  z-index: 12;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 300px;
}
.musiclist .list-background{
  position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 11;
    opacity: 1;
    background: rgba(0,0,0,0.5);
}
.list-wrapper{
  height: 280px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}
.list-wrapper li{
  list-style: none;
  padding:10px 20px;
  color: #666;
  font-size: 14px;
  border-top:1px solid rgba(7,17,27,0.1); 
}
.list-wrapper li .playingicon{
  color: #c62f2f;
}
.list-title{
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
