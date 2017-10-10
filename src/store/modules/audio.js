const state={
     audioEle:'',
     musicSrc:'',
     musicName:'',
     artist:'',
     playing:false,
     isShowDetail:false,
     musicList:[],
     currentIndex:0,
     playType: 1,
     musicDuration: 0,
     currentTime:0,
     currentLryic:[],
     currentLryicIndex:0
}
const getters={
	getMusicList: state => state.musicList,
	getCurrentMusic: state => state.musicList[state.currentIndex],
	getIsPlaying: state => state.playing,
	getMusicType: sate => state.playType,
	getMusicDuration: state => state.musicDuration,
	getMusicCurrentTime: sate => state.currentTime,
	getCurrentLyric: state => state.currentLryic,
	getCurrentLyricIndex: state => state.currentLryicIndex
}
const mutations={
	setAudioEle(state, ele){
		state.audioEle=ele;
	},
	setMusicPlaySrc(state,src){
		console.log(src)
		state.audioEle.src=src;
	},
	setMusicList(state, songInfo){
		state.musicList=songInfo;
        state.musicSrc=songInfo[0].al.picUrl;
        state.musicName=songInfo[0].name;
        state.artist=songInfo[0].ar[0].name;
        console.log(state.musicList)
	},
	showMusicDetail(state,inf){
		state.isShowDetail=inf.isShow;
	},
	togglePlay(state){
		if(state.playing){
			state.playing=false;
			state.audioEle.pause();
		}
		else{
			state.playing=true;
			state.audioEle.play();
		}
	},
    toggleMusicType(state){
    	if(state.playType==3){
    		state.playType=1;
    	}
    	else {
    		state.playType++;
    	}
    },
    setMusicDuration(state,obj){
    	state.musicDuration=obj.duration;
    },
    setMusicCurrentTime(state,obj){
        state.currentTime=obj.time;
    },
    setCurrentLyric(state,obj){
    	state.currentLryic=obj;
    },
    setLytriIndex(state,obj){
        state.currentLryicIndex=obj.index
    },
    playCurrent(){
    	state.playing=true;
		state.audioEle.play();
    }
}
const actions={
	set_musicList({commit}, ele){
        commit('setMusicList',ele);
	},
	set_audioEle({commit}, ele){
         commit('setAudioEle',ele);
	},
	set_MusicPlaySrc({commit},src){
		 commit('setMusicPlaySrc',src)
	},
	show_musicDetail({commit}, inf){
		commit('showMusicDetail',inf)
	},
	toggle_play({commit}){
		commit('togglePlay')
	},
	toggle_MusicType({commit}){
		commit('toggleMusicType')
	},
	set_MusicDuration({commit},obj){
        commit('setMusicDuration',obj)
	},
	/*获取音乐进度条当前时间*/
	set_MusicCurrentTime({commit},obj){
		commit('setMusicCurrentTime',obj)
	},
	/*设置歌词*/
	set_currentLyric({commit},obj){
        commit('setCurrentLyric',obj)
	},
	play_current({commit}){
		commit('playCurrent')
	}
}
export default{
	state,
	getters,
	mutations,
	actions
}