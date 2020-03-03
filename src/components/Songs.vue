<template>
    <div class="song-list">
        <ul>
            <li v-for="(item,index) in songs" :key="index" class="item" @click="selectItem(index,item)">
                <span class="count">{{index + 1}}</span>
                <div class="content">
                    <div class="name">{{item.name}}</div>
                    <span class="singer">{{item.singer}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {saveCurrent} from "../common/cache"
import {mapMutations} from "vuex"
export default {
  props: {
    songs: {
      type: Array
    }
  },
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapMutations({updateLove:'UPDATE_LOVE',updateCurrent:"UPDATE_CURRENT"}),
    selectItem(index,item){
      saveCurrent(item)
      this.updateLove(item)
      this.updateCurrent()
      this.$emit('select',index,item)
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/var.scss';
@import '../assets/css/mixin.scss';
.song-list {
  margin-bottom: 50px;
  .item {
    font-size: $font_size_big;
    height: 50px;
    border-bottom: 1px solid rgb(228, 228, 228);
    display: flex;
    align-items: center;
    .count{
        font-size: $font_size_middle;
        color:$font_gray;
        width: 10%;
        padding-left:20px; 
    }
    .content{
        height: 80%;
        width: 60%;
        .name{
          font-size: $font_size_middle;
          height: 60%;
          color: $font_color;
          overflow: hidden;
          line-height: 24px;
          @include font-hidden()
        }
        .singer{
          font-size: $font_size_small;
          color: $font_gray;
          height: 40%;
          line-height: 16px;
        }
    }
  }
}
</style>
