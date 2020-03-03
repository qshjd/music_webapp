<template>
  <transition name="fade">
    <div class="rank">
      <Back @back="back" :headerTitle="title"/>
      <cube-scroll :data="ranks">
        <ul class="ran-box">
          <li v-for="item in ranks" :key="item.id" class="rank-list">
            <img :src="item.coverImgUrl" class="cover">
            <ul class="songs" @click="gotoRankDetailPage(item)">
              <li v-for="(song,index) in item.topthree" :key="index" class="song-item">
                <span>{{index + 1}}.</span>
                <span>{{song.name}} - {{song.ar[0].name}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <Loading :topHeight="loadingPosition" v-show="showLoading" ref="loading"/> -->
      </cube-scroll>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import { getRank } from "../api/rank";
import { SUCCESS_CODE } from "../utils/config";
// import Loading from "@/components/Loading.vue";
import Back from "@/components/Back.vue";
import { mapMutations } from "vuex";
const IDXS = [0, 1, 2, 3, 4, 22, 23];
export default {
  name: "",
  data() {
    return {
      title: "排行榜",
      ranks: [],
      loadingPosition: "top:30%",
      // showLoading: true
    };
  },
  components: {
    // Loading,
    Back
  },
  created() {
    this._getRank();
  },
  methods: {
    ...mapMutations({ setRankList: "SET_RANK_LIST_INFO" }),
    _getRank() {
      IDXS.forEach(idx => {
        getRank(idx).then(res => {
          if (res.data.code === SUCCESS_CODE) {
            let list = res.data.playlist;
            list.topthree = res.data.playlist.tracks.slice(0, 3);
            this.ranks.push(list);
          }
          // if (this.ranks.length === 7) {
          //   this.showLoading = false;
          // }
        });
      });
    },
    //详情页
    gotoRankDetailPage(item) {
      this.$router.push({ path: `/rank/${item.id}` });
      this.setRankList(item)
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
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
.rank {
  background: $bg_color;
  position: fixed;
  z-index: 200;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .ran-box {
    margin-top: 60px;
    // overflow: hidden;
    .rank-list {
      padding: 10px;
      display: flex;
      align-items: center;
      .cover {
        width: 120px;
        height: 120px;
        border-radius: 5px;
        overflow: hidden;
      }
      .songs {
        width: 50%;
        height: 100px;

        .song-item {
          padding-left: 20px;
          line-height: 35px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: $font_size_middle;
          height: 35px;
          color: $font_color;
        }
      }
    }
  }
}
</style>
