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
    selectItem(index,item){
      this.$emit('select',index,item)
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/var.scss';
.song-list {
  margin-bottom: 100px;
  .item {
    font-size: 30px;
    height: 100px;
    border-bottom: 1px solid rgb(228, 228, 228);
    display: flex;
    align-items: center;
    
    .count{
        font-size: 28px;
        color:$font_gray;
        width: 10%;
        padding-left:30px; 
    }
    .content{
        height: 80%;
        width: 80%;
        .name{
          font-size: 28px;
          height: 60%;
          color: $font_color;
          overflow: hidden;
          line-height: 48px;
        }
        .singer{
          font-size: 22px;
          color: $font_gray;
          height: 40%;
          line-height: 32px;
          letter-spacing: 0.8px;
        }
    }
  }
}
</style>
