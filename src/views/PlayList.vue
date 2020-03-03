<template>
  <transition name="fade">
    <div class="play-list">
      <Back @back="back" :headerTitle="title"/>
      <cube-scroll-nav-bar
        :current="current"
        :labels="labels"
        @change="changeHandler"
        class="nav-bar"
      />
      <div class="nav-ctt">
        <List :playList="playList" @gotoMusicList="gotoMusicList"/>
      </div>
      <!-- <Loading v-show="isLoading"/> -->
    </div>
  </transition>
</template>

<script>
import { getPlayListCategorys, getPlayListByCat } from "../api/playlist";
import Back from "@/components/Back.vue";
import List from "@/components/List.vue";
// import Loading from "@/components/Loading.vue";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      title:"歌单",
      current: "",
      labels: [],
      playList: [],
      limit: 30,
      isLoading: true
    };
  },
  computed: {},
  mounted() {
    
  },
  components: {
    Back,
    List
    // Loading
  },
  created() {
    this._getPlayListCategorys();
  },
  methods: {
    ...mapMutations({
      setMusicList: "SET_MUSIC_LIST_INFO"
    }),
    scrollToTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log('x',scrollTop);
    },
    back() {
      this.$router.back();
    },
    _getPlayListCategorys() {
      getPlayListCategorys()
        .then(res => {
          this.labels = res.data.sub.slice(0, 7).map(item => {
            return item.name;
          });
          this.current = this.labels[0];
          // return this.labels
        })
        .then(() => {
          // console.log(labels[0])
          this._getPlayListByCat();
        });
    },
    _getPlayListByCat() {
      getPlayListByCat(this.limit, this.current).then(res => {
        window.addEventListener("scroll", this.scrollToTop);
        this.playList = res.data.playlists.map(item => {
          let obj = {};
          obj.id = item.id;
          obj.name = item.name;
          obj.picUrl = item.coverImgUrl;
          obj.playCount = item.playCount;
          this.isLoading = false;
          return obj;
        });
      });
    },
    changeHandler(cur) {
      this.$createToast({
        txt: "加载中",
        time: 500,
        mask: true
      }).show();
      this.current = cur;
      this._getPlayListByCat();
    },
    //进入歌单详情页
    gotoMusicList(item) {
      console.log("click");
      this.$router.push({ path: `/find/${item.id}` });
      //存到store
      this.setMusicList(item);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/var.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
.play-list {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $bg_color;
  z-index: 100;
  .nav-bar {
    top: 50px;
    z-index: 500;
  }
  .nav-ctt {
    width: 92%;
    position: fixed;
    top: 110px;
    left: 4%;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
