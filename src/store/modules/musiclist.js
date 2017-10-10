const state={
	isShowList:false,
	musicAllLIst:[],
   currentIndex:-1
}
const getters={
	isShowMusicList:state=>state.isShowList,
	getMusicAllList:state=>state.musicAllLIst,
   getCurrentIndex:state=>state.currentIndex,
   getCurrentPlay:state=>state.musicAllLIst[state.currentIndex]
}
const mutations={
   showList(state,obj){
      state.isShowList=obj.isShow;
   },
   setMusicAllList(state,arr){
   	state.musicAllLIst=arr;
   },
   setCurrentIndex(state,obj){
      state.currentIndex=obj.index
   }
}
const actions={
   show_musicList({commit},obj){
   	 commit('showList',obj)
   },
   set_musicAllList({commit},arr){
      console.log(arr)
   	 commit('setMusicAllList',arr)
   },
   set_currentIndex({commit},obj){
       commit('setCurrentIndex',obj)
   }
}
export default{
	state,
	getters,
	mutations,
	actions
}