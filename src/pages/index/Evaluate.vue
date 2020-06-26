<template>
  <div id="evaluate_box">
    <!-- 评分 -->
    <div class="grade">
      <div class="left">
        <p class="left_p1">4.5</p>
        <p class="left_p2">综合评分</p>
        <p class="left_p3">高于周边商家96.6%</p>
      </div>
      <div class="right">
        <div class="right_div">
          <span>服务态度</span>
          <van-rate
            class="right_grade1"
            v-model="value1"
            allow-half
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <span>{{value1}}</span>
        </div>
        <div class="right_div">
          <span>服务态度</span>
          <van-rate
            class="right_grade2"
            v-model="value2"
            allow-half
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <span>{{value2}}</span>
        </div>
        <div class="right_div">
          <p class="span1">送达时间</p>
          <p class="span2">44分钟</p>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="rule"></div>

    <!-- 用户评价 -->
    <div class="usereve">
      <!-- 按钮 -->
      <div class="btn">
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
          全部
          <span class="num">57</span>
        </van-button>
        <van-button color="linear-gradient(to right, #fd9c00, #e5e8e8)">
          满意
          <span class="num">47</span>
        </van-button>
        <van-button color="linear-gradient(to right, #333, #f6f6f6)">
          不满意
          <span class="num">10</span>
        </van-button>
      </div>
      <!-- 只看有内容的评价 -->
      <div class="readonly">
        <div class="checkbox">
          <van-checkbox v-model="checked" icon-size="24px">只看有内容的评价</van-checkbox>
        </div>
      </div>
      <!-- 内容 -->
      <div class="bigmain">
        <van-row v-for="(v,i) in this.data" :key="i" class="conts">
          <van-col span="4" class="userimg">
            <img :src="v.avatar" alt />
          </van-col>
          <van-col span="20" class="usertxt">
            <p class="usertime">
              <span class="username">{{v.username}}</span>
              <span class="rateTime">{{v.rateTime}}</span>
            </p>
            <p class="howtime">
              <van-rate v-model="value3" allow-half void-icon="star" void-color="#eee" readonly />
              <span>{{v.deliveryTime}}分钟</span>
            </p>
            <p class="content-text">{{v.text}}</p>
            <p class="recommend">
              <!-- <Icon type="ios-thumbs-up" /> -->
              <span v-for="(x,i) in v.recommend" :key="i">{{x}}</span>
            </p>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { api_shopRatings } from "@/api/apis.js";
export default {
  data() {
    return {
      value1: 4.5, //评分星星
      value2: 4.5, //评分星星
      value3: 4.5, //评分星星

      checked: true, //只看评价

      data: {}
    };
  },

  created() {
    /* 初始化请求 */
    api_shopRatings().then(res => {
      this.data = res.data.data;
      console.log(res.data.data);
      this.data.forEach(function(v) {
        //   v.rateTime=new Date(parseInt(v.rateTime) * 1000).toLocaleString().replace(/年|月/g, "/").replace(/日/g, " ");
        function newtime(sjx) {
          var sj = new Date(sjx);
          var year = sj.getFullYear();
          var month = sj.getMonth() + 1;
          if (month < 10) {
            month = "0" + month;
          }
          var day = sj.getDate();
          if (day < 10) {
            day = "0" + day;
          }
          var hours = sj.getHours();
          if (hours < 10) {
            hours = "0" + hours;
          }
          var minutes = sj.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var seconds = sj.getSeconds();
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        v.rateTime = newtime(v.rateTime);
      });
    });
  },

  computed: {
    changeName() {
      return this.$store.state.name;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#evaluate_box {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  // display: flex;
  // height: 300px;
  // height: 100%;

  /* 评分 */
  .grade {
    width: 100%;
    display: flex;
    border-bottom: 2px solid #e8e8e8;
    padding: 20px;
    .left {
      text-align: center;
      border-right: 2px solid #e8e8e8;
      padding-right: 18px;
      .left_p1 {
        font-size: 30px;
        color: #fd9c00;
      }
      .left_p2 {
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      .left_p3 {
        font-size: 12px;
        color: #9a9a9d;
        font-weight: 600;
      }
    }

    .right {
      margin-left: 10px;
      .right_div {
        display: flex;
        margin-top: 5px;
        span:first-of-type {
          margin-right: 5px;
          font-size: 14px;
        }
        /* 评分 */
        .van-rate /deep/ {
          .van-rate__item {
            padding-right: 0px;
          }
        }
        span:last-of-type {
          margin-left: 5px;
          color: #fd9c00;
        }
        .span1 {
          margin-right: 5px;
          font-size: 14px;
        }
        .span2 {
          font-size: 14px;
          margin-left: 5px;
          color: #9a9a9d;
        }
      }
    }
  }

  /* 分割线 */
  .rule {
    width: 100%;
    height: 15px;
    background: #f3f6f6;
    // border-top: 1px solid #e5e8e8;
    border-bottom: 2px solid #e5e8e8;
  }

  /* 用户评价 */
  .usereve {
    /* 按钮 */
    .btn {
      padding: 20px;
      .van-button {
        width: 90px;
        margin-right: 10px;
        .num {
          font-size: 10px;
        }
      }
    }
    /* 只看有内容的评价 */
    .readonly /deep/ {
      width: 100%;
      padding: 0 20px;
      border-bottom: 2px solid #e8e8e8;
      .checkbox {
        border-top: 1px solid #e8e8e8;
        width: 90%;
        padding: 20px 0;
        .van-checkbox {
          .van-checkbox__label {
            color: #979b9f;
          }
        }
      }
    }

    /* 内容 */
    .bigmain /deep/ {
      width: 100%;
      padding: 0 20px;
      .conts {
        height: 100%;
        width: 90%;
        border-bottom: 1px solid #e8e8e8;
        /* 用户头像 */
        .userimg {
          margin-top: 20px;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        /* 文字内容 */
        .usertxt {
          margin-top: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
          // border-bottom: 1px solid #e8e8e8;
          .usertime {
            .rateTime {
              font-size: 12px;
              margin-left: 60px;
              color: #91999e;
            }
          }
          .howtime {
            font-size: 12px;
            color: #91999e;
            .van-rate {
              .van-rate__icon{
                font-size: 12px;
              }
            }
          }
          .content-text{
            font-size: 12px;
          }
          .recommend {
            .ivu-icon-ios-thumbs-up {
              color: #00a1dc;
              line-height: 14px;
              font-size: 18px;
              vertical-align: middle;
            }
            span {
              display: inline-block;
              margin-left: 5px;
              margin-top: 3px;
              padding: 3px;
              font-size: 14px;
              height: 20px;
              line-height: 14px;
              max-width: 75px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              border: 1px solid #ccc;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>