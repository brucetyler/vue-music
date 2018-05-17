let musicData={
	  /*获取音乐url*/
      getMusicUrl:function(self,id){
      self.$http.get('http://localhost:3000/music/url?id='+id).then(response=>{
        self.mSrc=response.data.data[0].url;
         self.$store.dispatch('set_audioEle',self.$refs.audio)
      })
      },
      /*获取歌词*/
      getMusicLyric:function(self,id){
      self.$http.get('http://localhost:3000/lyric?id='+id).then(res=>{
      	console.log(res)
        let Lyc=res.data.lrc.lyric.split('[');
        let lrcArray=[];
        Lyc.forEach(function(data,index){
          let cLyc=data.split(']')
          if(cLyc!=''&& !isNaN(cLyc[0].split(':')[0])){
          lrcArray.push({'time':cLyc[0],'text':cLyc[1]})
        }
        })
        self.$store.dispatch('set_currentLyric',lrcArray)
       })
       },
       /*获取歌曲详情*/
      getMusicDetail:function(self,id){     
      self.$http.get('http://localhost:3000/song/detail?ids='+id).then(res=>{
        self.$store.dispatch('set_musicList',res.data.songs);
      })
       }
}
export default{
	musicData
}