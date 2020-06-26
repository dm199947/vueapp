<template>
  <div id="index_box">
    <div class="header">
      <!-- 商家信息 -->
      <div class="index_head">
        <!-- 遮罩层 -->
        <van-overlay class="overlay" :show="show" @click="show = false">
          <div class="wrapper" default>
            <!-- 标题 -->
            <p class="p_1">{{data.name}}</p>
            <!-- 评分 -->
            <van-rate
              class="grade"
              v-model="value"
              allow-half
              void-icon="star"
              void-color="#eee"
              readonly
            />
            <!-- 优惠信息 -->
            <div class="special">
              <!-- 标题 -->
              <van-divider
                class="special_title"
                :style="{ color: '#fff', borderColor: '#62696f ', padding: '10px 30px',fontSize:'16px',fontWeight:'bolder' }"
              >优惠信息</van-divider>
              <!-- 优惠内容 -->
              <p class="special_p">
                <img src="../assets/imgs/decrease_1@2x.png" alt />
                <span>{{supports[2]}}</span>
              </p>
              <p class="special_p">
                <img src="../assets/imgs/discount_1@2x.png" alt />
                <span>{{supports[0]}}</span>
              </p>
              <p class="special_p">
                <img src="../assets/imgs/discount_1@2x.png" alt />
                <span>{{supports[1]}}</span>
              </p>
              <p class="special_p">
                <img src="../assets/imgs/special_1@2x.png" alt />
                <span>{{supports[3]}}</span>
              </p>
              <p class="special_p">
                <img src="../assets/imgs/special_1@2x.png" alt />
                <span>{{supports[4]}}</span>
              </p>
            </div>

            <!-- 商家公告 -->
            <div class="affiche">
              <!-- 标题 -->
              <van-divider
                class="special_title"
                :style="{ color: '#fff', borderColor: '#62696f ', padding: '10px 30px',fontSize:'16px',fontWeight:'bolder' }"
              >商家公告</van-divider>
              <!-- 公告内容 -->
              <p>{{data.bulletin}}</p>
            </div>
          </div>
        </van-overlay>
        <!-- 背景图 -->
        <div class="headbg" :style="{background:'url('+imgUrl+')'}"></div>
        <!-- 商家信息内容 -->
        <van-row type="flex" justify="space-around" class="headmain" @click="show = true">
          <!-- 商家头像 -->
          <van-col span="4" class="headleft">
            <img :src="imgUrl" alt />
          </van-col>
          <!-- 商家信息 -->
          <van-col span="10" class="headcenter">
            <!-- 店名 -->
            <p class="p_1">
              <img src="../assets/imgs/brand@2x.png" alt />
              <span>{{data.name}}</span>
            </p>
            <!-- 外卖转送+时间 -->
            <p class="p_2">
              <span>{{data.description}}</span> /
              <span>{{data.deliveryTime}}分钟送达</span>
            </p>
            <!-- 满减 -->
            <p class="p_3">
              <img src="../assets/imgs/decrease_1@2x.png" alt />
              <span>{{supports[2]}}</span>
            </p>
          </van-col>
          <van-col span="2" class="headright">
            <div class="fivebox">5个 ></div>
          </van-col>

          <!-- 公告 -->
          <div class="notice">
            <van-notice-bar class="notice_box" left-icon="volume-o" :text="data.bulletin" />
          </div>
        </van-row>
      </div>
      <div class="router-link-div">
        <!-- <van-tabs v-model="active">
        <router-link to="/">
          <van-tab title="商品"></van-tab>
        </router-link>
        <router-link to="/evaluate">
          <van-tab title="评价"></van-tab>
        </router-link>
        <router-link to="/merchant">
          <van-tab title="商家"></van-tab>
        </router-link>
        </van-tabs>-->
        <router-link to="/">商品</router-link>
        <router-link to="/evaluate">评价</router-link>
        <router-link to="/merchant">商家</router-link>
      </div>
    </div>

    <!-- 中间内容 -->
    <!-- <div id="main_box"> -->
      <router-view></router-view>
    <!-- </div> -->

    <!-- <div @click="shopcarShow = !shopcarShow" class="shopcar-bar">
      <div class="shopcar-box1">
        <img src="../assets/imgs/car.png" />
        <span class="price">￥0</span>
        <span class="song">另需配送费￥4元</span>
      </div>
      <div class="shopcar-box2">￥20起送</div>
    </div> -->

    <!-- <div class="">

    </div> -->
  </div>
</template>

<script>
import { api_shopSeller, base_ip } from "@/api/apis.js";
export default {
  data() {
    return {
      imgUrl: "",
      //商家信息
      data: {},
      supports: [],
      value: 4.5, //评分星星
      show: false, //遮罩层开关
      active: 2
    };
  },

  created() {
    api_shopSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
      // this.supports = res.data.data.supports.join(",");
      // console.log(res.data.data.supports[2]);
      this.supports = res.data.data.supports;

      //拼接地址，让手机端能覆盖
      let arr = res.data.data.avatar.split("/");
      arr.splice(0, 3, base_ip);
      this.imgUrl = arr.join("/");
    });
  }
};
</script>

<style lang="scss">
#index_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 220px;
    /* 商家信息 */
    .index_head {
      width: 100%;
      height: 168px;
      /* 背景图 */
      .headbg {
        width: 100%;
        height: 168px;
        position: relative;
        background-size: cover !important;
        background-position: center !important;
        -webkit-filter: blur(15px);
        -moz-filter: blur(15px);
        -o-filter: blur(15px);
        -ms-filter: blur(15px);
        filter: blur(3px) !important;
      }
      /* 模态遮掩层 */
      .overlay {
        .wrapper {
          text-align: center;
          height: 100%;
          /* 标题 */
          .p_1 {
            color: #fff;
            font-size: 18px;
            letter-spacing: 2px;
            margin-top: 80px;
            font-weight: bolder;
          }
          /* 评分 */
          .van-rate {
            margin-top: 14px;
            margin-left: 20px;
            .van-rate__item {
              padding-right: 20px;
            }
          }
          /* 优惠信息 */
          .special {
            /* 优惠内容 */
            .special_p {
              display: flex;
              justify-content: flex-start;
              margin-bottom: 10px;
              img {
                margin-left: 50px;
                margin-right: 10px;
                width: 20px;
                height: 20px;
              }
              span {
                color: #fff;
                letter-spacing: -1px;
                font-size: 14px;
              }
            }
          }
          /* 商家公告 */
          .affiche {
            p {
              width: 80%;
              margin: auto;
              color: #fff;
            }
          }
        }
      }

      /* 商家信息内容 */
      .headmain {
        width: 100%;
        position: absolute;
        top: 10px;
        /* 商家头像 */
        .headleft {
          img {
            width: 80px;
            height: 80px;
            margin-top: 30px;
          }
        }
        /* 商家信息 */
        .headcenter {
          line-height: 26px;
          /* 店名 */
          .p_1 {
            width: 100%;
            margin-top: 30px;
            color: #fff;
            display: flex;
            justify-content: space-around;
            img {
              width: 35px;
              height: 20px;
            }
            span {
              font-size: 14px;
              font-weight: bolder;
            }
          }
          /* 外卖转送+时间 */
          .p_2 {
            width: 100%;
            font-size: 14px;
            color: #fff;
            letter-spacing: -1px;
          }
          /* 满减 */
          .p_3 {
            width: 100%;
            color: #fff;
            display: flex;
            margin-top: 5px;
            justify-content: space-around;
            img {
              width: 16px;
              height: 16px;
              margin-top: 2px;
            }
            span {
              font-size: 12px;
              font-weight: bolder;
              margin-left: 5px;
              line-height: 15px;
            }
          }
        }

        .headright {
          .fivebox {
            width: 40px;
            height: 26px;
            text-align: center;
            border-radius: 40px;
            line-height: 26px;
            font-size: 12px;
            background-color: rgba($color: #3e352b, $alpha: 0.5);
            color: #fff;
            margin-top: 80px;
            cursor: pointer;
          }
        }

        /* 公告 */
        .notice {
          width: 100%;
          position: absolute;
          bottom: -42px;
          .notice_box {
            height: 30px;
            color: white;
            text-align: center;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            background: rgba(5, 4, 4, 0.5);
          }
        }
      }
    }
    /* 路由 */
    /* 一级路由 */
    .router-link-div {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      line-height: 50px;
      border-bottom: 2px solid #e6e6e6;
      a {
        font-size: 18px;
        color: #000d00;
      }

      .router-link-exact-active {
        color: #f60;
      }
    }
  }

  /* #main_box {
    flex: 1;
    overflow: auto;
  } */
  /* .shopcar-bar {
    width: 100%;
    height: 60px;
    background: #141c27;
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
        border: 5px solid #141c27;
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
      color: rgb(146, 146, 146);
      background: rgb(58, 57, 57);
    }
  } */
}
</style>
