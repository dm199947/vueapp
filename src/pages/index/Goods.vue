<template>
  <div id="goods_box">
    <div class="goods_list">
      <!-- 左侧DIV -->
      <div id="goods-left-box" class="left-div">
        <ul class="content">
          <!-- 之前要滚动的内容 -->

          <!-- :class="{样式名A: 是否开启, 样式名2:是否开启,.......}" -->
          <!-- :class="{category:true,selectActive:curSelected == i}"  判断curSelected等于对应的索引后，才激活样式 -->
          <div
            v-for="(v,i) in goodslist"
            :key="i"
            :class="{category:true,selectActive:curSelected == i}"
            @click="clickLeftTitle(i)"
          >
            <div class="category_box">
              <span>{{ v.name }}</span>
            </div>
          </div>
        </ul>
      </div>

      <!-- 右侧DIV -->
      <div id="goods-right-box" class="right-div">
        <div class="content">
          <div :id="i" v-for="(v,i) in goodslist" :key="i" class="right_type">
            <!-- 标题 -->
            <p class="solo">{{v.name}}</p>
            <!-- 标题下方的儿子 -->
            <!-- <img :src="arrimg[0]" alt=""> -->
            <!-- <img :src="arrimg" alt=""> -->
            <div v-for="child in v.foods" :key="child.id" class="right-show">
              <van-row>
                <van-col span="6" class="goodsimg">
                  <img :src="child.imgUrl" />
                </van-col>
                <van-col span="18" class="goodstxt">
                  <p class="name">{{child.name}}</p>
                  <p class="sell">
                    月销售{{child.sellCount}}份
                    <span>好评率{{child.rating}}%</span>
                  </p>
                  <van-row class="pay">
                    <van-col span="16">
                      <span class="money01">￥{{child.price}}</span>
                      <span class="money02">
                        <del>￥99</del>
                      </span>
                    </van-col>
                    <van-col span="8" class="btnbox">
                      <button
                        v-show="child.num>0"
                        class="remove"
                        @click="clickChangenum(child.id,-1)"
                      >-</button>
                      <span v-show="child.num>0">{{child.num}}</span>
                      <button class="add" @click="clickChangenum(child.id,1)">+</button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
      <img v-show="!isloading" src="@/assets/imgs/default.jpg" style="width: 100%" />
    </div>
    <ShopCar></ShopCar>
  </div>
</template>

<script>
import { api_goodsList, base_ip } from "@/api/apis";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件
import ShopCar from "../Shopcar";

// 1. 先监听右侧面板的滚动距离
// 2. 判断滚动距离属于右侧哪个div内（因为右侧div和左侧索引有关联）

// 怎么用api里封装的函数?
export default {
  data() {
    return {
      curSelected: 0, //当前选项卡选中的索引

      isloading: false, //没有加载下来数据 true数据加载完毕 false数据还在加载
      
      // arrimg: ""
    };
  },
  created() {
    //同步（逐行执行）  异步（定时器，ajax）
    //异步回调函数 异步的回调函数会放在所有主线程同步代码执行完以后才执行
    api_goodsList().then(res => {
      // console.log(res.data.goodsList);
      // this.goodsList = res.data.goodsList;

      //为了让图片在手机上能看到
      // console.log(res.data.goodsList[i]);
      this.isloading = true;
      var goodslist = res.data.goodsList.map(v => {
        // console.log(v.foods);
        v.foods.map(e => {
          // console.log(res.imgUrl);
          e.imgUrl = e.imgUrl.replace("http://127.0.0.1:5000", base_ip);
          // console.log(e);
          e.num = 0;
          return e;
        });
        return v;
      });

      //触发vuex里面的内容
      this.$store.commit("initgoodslist", goodslist);

      // console.log(this.goodslist);
      /* this.arrimg = this.arrimg.map(ele => {
        // console.log(ele.toString());
        // console.log(ele.toString().replace("http://127.0.0.1:5000", base_ip));

        return ele.toString().replace("http://127.0.0.1:5000", base_ip);
      });

      console.log(this.goodsList); */

      // console.log(this.arrimg);

      // console.log(JSON.stringify(this.arrimg));
      // console.log(this.arrimg);
      // this.arrimg = this.arrimg;

      // console.log(this.arrimg);
    });
  },

  mounted() {
    /* 左边德芙 */
    var bsleft = new BScroll(document.querySelector("#goods-left-box"), {
      click: true //允许被点击
    });
    console.log(bsleft);
    /* 右边德芙 */
    this.bsright = new BScroll(document.querySelector("#goods-right-box"), {
      probeType: 3
    });

    // console.log(this.bsright);
    this.bsright.on("scroll", obj => {
      // console.log(obj.y);
      let right_y = Math.abs(obj.y);

      // console.log(right_y);

      //循环坐标数组，对比right_y在哪个区间段内，就选中左侧对应的索引
      for (let divobj of this.getDivMath) {
        //根据计算完毕的DIV对象，判断right_y的区间端，如果处于某一个区间端，那么就吧左侧索引设置为对应的位置
        if (right_y >= divobj.min && right_y < divobj.max) {
          this.curSelected = divobj.index;
          return; //结束剩下的所有循环
        }
      }
    });
  },

  methods: {
    //点击菜单
    clickLeftTitle(i) {
      this.curSelected = i;
      //点击左侧某个选项卡，跳转到右侧对应div
      this.bsright.scrollToElement(document.getElementById(i), 600);
    },

    //商品数量的添加和删除
    clickChangenum(id, val) {
      // console.log(111);

      this.$store.commit("changeNum", { id, val });
    }
  },

  //计算属性：会进行运算结果缓存，取10次或者1万次，它都是读取第一次运算完的缓存结果
  //计算属性因为是属性，所以没法传值。计算属性必须有return。不能作为事件句柄去绑定。
  //性能比methods高n倍，因为他不会重复运算。除非内部引用的数据发生了变化，才会重新计算一次
  computed: {
    getDivMath() {
      // console.log(1111);
      let heightArr = [];
      let totalHeight = 0; //之前div所有高度的累计
      //获取所有div的高度
      for (let i = 0; i < this.goodslist.length; i++) {
        let divHeight = document.getElementById(i).offsetHeight; //获取当前div高度
        // console.log(divHeight);

        //把获取到的div高度push到heightArr里面
        heightArr.push({
          index: i,
          max: totalHeight + divHeight, //最大高度
          min: totalHeight //最小高度
        });

        totalHeight += divHeight; //累加高度
      }

      return heightArr;
    },

    //获取vuex中的共享数据
    goodslist() {
      return this.$store.state.goodslist;
    }
  },

  components: {
    ShopCar
  }
};
</script>

<style lang="scss" scoped>
/* 树菜单激活样式 */
.selectActive {
  background: #fff;
}
#goods_box {
  // flex: 1;
  // overflow-y: scroll;
  // position: relative;
  // overflow-y: hidden;
  height: 100%;
  padding-bottom: 60px;
  overflow-y: hidden;
  .goods_list {
    display: flex;
    overflow: hidden;
    height: 100%;
    .left-div {
      width: 6rem;
      background-color: #f3f6f6;
      // height: 30rem;
      height: 100%;
      overflow-y: scroll;
      // overflow-x: hidden;
      // padding-bottom: 150px;
      .content {
        .category {
          padding: 20px 8px 0;
          .category_box {
            width: 90%;
            padding-bottom: 20px;
            text-align: center;
            border-bottom: 1px solid #dcdfdf;
            span {
              font-size: 16px;
            }
          }
        }
      }
    }

    .right-div {
      flex: 1; //撑满父容器
      // background-color: tomato;
      // height: 30rem;
      height: 100%;
      overflow-y: scroll;
      // padding-bottom: 60px;
      .content {
        // padding-bottom: 100px !important;
        .right_type {
          .solo {
            height: 100%;
            line-height: 30px;
            text-indent: 1em;
            background-color: #f3f6f6;
            border-left: 4px solid #e4e4e5;
            color: #8e959b;
          }
          .right-show {
            height: 100%;
            padding: 20px 10px 0;
            .van-row {
              padding-bottom: 20px;
              border-bottom: 1px solid #dbdede;
              /* 商品图片 */
              .goodsimg {
                img {
                  width: 90%;
                }
              }
              /* 商品描述 */
              .goodstxt {
                .name {
                  font-size: 16px;
                  color: #000;
                  font-weight: bolder;
                }
                .sell {
                  font-size: 12px;
                  color: #a6a9a9;
                  margin-top: 5px;
                }
                /* 商品价格 */
                .pay {
                  border: 0;
                  padding-bottom: 0;
                  .money01 {
                    color: red;
                    font-size: 14px;
                    font-weight: bolder;
                  }
                  .money02 {
                    font-size: 14px;
                    color: #a6a9a9;
                    margin-left: 5px;
                  }
                  /* 加减号 */
                  .btnbox {
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
                      margin: auto;
                    }
                    span {
                      margin: auto;
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
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

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
      width: 70%;
      height: 30px;
      padding: 15px 0px;
      font-weight: bold;
      text-align: center;
      line-height: 30px;
      position: relative;
      img {
        width: 60px;
        height: 60px;
        position: absolute;
        left: 20px;
        top: -16px;
        border: 5px solid rgba($color: #141c27, $alpha: 0.8);
        border-radius: 50%;
      }
      .price {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        border-right: 1px solid gray;
        margin-left: 50px;
      }
      .song {
        display: inline-block;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 13px;
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
  }
  /* 购物车板子 */
  .shopcar-board {
    position: fixed;
    height: 100px;
    width: 100%;
    bottom: 60px;
    background-color: skyblue;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>