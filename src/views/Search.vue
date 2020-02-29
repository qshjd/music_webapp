<template>
  <transition name="fade">
    <div class="search">
      <Back @back="back" headerTitle>
        <cube-input v-model="value" :clearable="clearable" placeholder="请输入歌名或歌手" class="c-input"></cube-input>
      </Back>
      <cube-scroll>
        <div class="search-ctt">
          <div class="hot-search">
            <p class="title">热门搜索</p>
            <div class="list">
              <span v-for="(item,index) in hosts" :key="index" class="item">{{item.first}}</span>
            </div>
            <p class="title">搜索历史</p>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import Back from "@/components/Back.vue";
import { getHotList } from "../api/search";
export default {
  name: "",
  data() {
    return {
      value: "",
      clearable: {
        visible: true,
        blurHidden: true
      },
      hosts: []
    };
  },
  components: {
    Back
  },
  created() {
    this._getHotList();
  },
  methods: {
    back() {
      this.$router.back();
    },
    //热搜列表
    _getHotList() {
      getHotList().then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.hosts = res.data.result.hots;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}

.search {
  background-color: $bg_color;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  .c-input {
    height: 60%;
    width: 72%;
    font-size: $font_size_big;
    overflow: hidden;
  }
  .search-ctt {
    width: 92%;
    margin-top: 140px;
    // height: 300px;
    margin-left: 4%;
    // border: 1px solid #000;
    .hot-search {
      .title {
        line-height: 80px;
        font-size: $font_size_middle;
        color: $font_gray;
      }
      .list {
        width: 80%;
        .item {
          display: inline-block;
          font-size: $font_size_big;
          color: $font_color;
          border: 1px solid $border_color_gray;
          padding: 10px;
          border-radius: 10px;
          margin: 10px 10px 10px 0;
        }
      }
    }
  }
}
</style>
