<template>
  <div>
    <transition name="slide-fade">
      <div v-show="shopcarShow" class="shopcar-board">
        <p class="title">购物车</p>
        <div v-for="item in shopcarslist" :key="item.id" class="shopfoods">
          <div class="foods">
            <p class="foods_name">{{ item.name }}</p>
            <p class="foods_price">{{ (item.price * item.num).toFixed(2) }}</p>
            <div class="btnbox">
              <button v-show="item.num>0" class="remove" @click="clickChangenum(item.id,-1)">-</button>
              <span v-show="item.num>0">{{item.num}}</span>
              <button class="add" @click="clickChangenum(item.id,1)">+</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div @click="shopcarShow = !shopcarShow" class="shopcar-bar">
      <div class="shopcar-box1">
        <img :src="iconsrc" />
        <span class="price">总计:{{totalPrice}}</span>
        <span class="song">配送费￥4元</span>
      </div>

      <div v-if="this.$store.getters.shopcarslist.length > 0" class="shopcar-box3">去结算</div>
      <div v-else class="shopcar-box2">￥20起送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopcarShow: false //是否显示购物车板子
    };
  },
  methods: {
    //商品数量的添加和删除
    clickChangenum(id, val) {
      // console.log(111);

      this.$store.commit("changeNum", { id, val });
    }
    //购物车数量大于1的时候，改变文字
  },
  computed: {
    shopcarslist() {
      return this.$store.getters.shopcarslist;
    },

    iconsrc() {
      if (this.$store.getters.shopcarslist.length > 0)
        return require("@/assets/imgs/shop_icon_light.png");

      return require("@/assets/imgs/shop_icon.png");
    },
    totalPrice() {
      let total = 0;
      for (let obj of this.$store.getters.shopcarslist) {
        total += obj.num * obj.price;
      }
      return total.toFixed(2);
    }

    // totaltext() {
    //   if (this.$store.getters.shopcarslist.length > 0) {
    //     return this.newtext;
    //   } else {
    //     return this.text;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
/* 购物车 */
.shopcar-bar {
  // position: fixed;
  // bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba($color: #141c27, $alpha: 0.8);
  display: flex;
  justify-content: space-between;
  .shopcar-box1 {
    width: 80%;
    height: 30px;
    padding: 15px 0px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    position: relative;
    img {
      width: 55px;
      height: 55px;
      position: absolute;
      left: 20px;
      top: -16px;
      border: 5px solid rgba($color: #141c27, $alpha: 0.8);
      border-radius: 50%;
    }
    .price {
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      border-right: 1px solid gray;
      margin-left: 80px;
      padding-right: 10px;
    }
    .song {
      display: inline-block;
      width: 70px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .shopcar-box2 {
    width: 30%;
    height: 60px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 60px;
    color: rgba(146, 146, 146, 0.8);
    background: rgba(58, 57, 57, 0.8);
  }
  .shopcar-box3 {
    width: 30%;
    height: 60px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 60px;
    color: #fff;
    background: #f60;
  }
}
/* 购物车板子 */
.shopcar-board {
  position: fixed;
  max-height: 200px;
  overflow: hidden;
  overflow: scroll;
  width: 100%;
  bottom: 60px;
  background-color: rgba($color: #fff, $alpha: 1);
  .title {
    height: 20px;
    background: #e8e8e8;
    padding: 5px;
    font-weight: bolder;
  }
  .shopfoods {
    padding: 10px;
    .foods {
      display: flex;
      justify-content: space-between;
      p {
        display: inline-block;
      }
      .foods_name {
        width: 200px;
      }
      .foods_price {
        // width: 200px;
        color: red;
        font-size: 14px;
        font-weight: bolder;
      }
      /* 加减号 */
      .btnbox {
        width: 80px;
        display: flex;
        justify-content: space-between;
        .add {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 10px;
          border: 0;
          outline: none;
          background-color: #00a1dc;
          color: #fff;
          font-size: 20px;
          margin: 0;
        }
        span {
          margin: 0;
        }
        .remove {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 5px;
          border-radius: 10px;
          border: 1px solid #00a1dc;
          background-color: #fff;
          outline: none;
          color: #00a1dc;
          font-size: 20px;
          margin: 0;
        }
      }
    }
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition:/*  */ all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>
