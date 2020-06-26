<template>
  <div id="merchant_box">
    <!-- 商家基本信息 -->
    <div class="merchant_div">
      <!-- 上半部分 -->
      <div class="merchant_divtop">
        <div class="left">
          <p class="left_p1">金牌虾客（南湖店）</p>
          <p class="left_p2">
            <van-rate
              class="right_grade1"
              v-model="value"
              allow-half
              void-icon="star"
              void-color="#eee"
              readonly
            />
            <span>(661)</span>
            <span>月售690单</span>
          </p>
        </div>
        <div class="right">
          <div class="checkbox">
            <vant-icon :class="myicon"></vant-icon>
            <p>已收藏</p>
          </div>
        </div>
      </div>
      <!-- 下半部分 -->
      <div class="merchant_divbottom">
        <!-- 起送价 -->
        <div class="left box">
          <p>起送价</p>
          <p>20元</p>
        </div>
        <!-- 分割线 -->
        <div class="rule"></div>
        <!-- 商家配送 -->
        <div class="center box">
          <p>商家配送</p>
          <p>4元</p>
        </div>
        <!-- 分割线 -->
        <div class="rule"></div>
        <!-- 平均配送时间 -->
        <div class="right box">
          <p>平均配送时间</p>
          <p>39分钟</p>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="rule_box"></div>

    <!-- 公告与活动 -->
    <div class="notice">
      <h3>公告与活动</h3>
      <p>尊敬的客官，六一攻略： ①6月1日当天在评价区分享童年趣事赠6元无门槛红包 ②下单时在订单备注处填写【六一儿童节快乐】随机赠送“回忆杀爆款玩具”，数量有限，送完即止。 提前预祝大小宝宝节日开心。</p>
    </div>
    <!-- 活动 -->
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/decrease_3@2x.png" alt />
        <span>在线支付满28减5，满50减10</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/discount_3@2x.png" alt />
        <span>单人精彩赛</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/discount_3@2x.png" alt />
        <span>清肺雪梨汤8折抢购</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/special_3@2x.png" alt />
        <span>特价饮品八折抢购</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/special_3@2x.png" alt />
        <span>单人特色套餐</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/invoice_3@2x.png" alt />
        <span>该商家支持开发票，请在下单时填写好发票抬头</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity_box">
        <img src="../../assets/imgs/guarantee_3@2x.png" alt />
        <span>已加入"外卖保"计划，食品安全保障</span>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="rule_box"></div>

    <!-- 商家实景 -->
    <div class="live_img">
      <h3>商家实景</h3>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分割线 -->
    <div class="rule_box"></div>

    <!-- 商家信息 -->
    <div class="merchant_msg">
      <h3>商家信息</h3>
      <div class="msgbox">
        <span>该商家支持开发票，请在下单时填写好发票抬头</span>
      </div>
      <div class="msgbox">
        <span>品类：其他菜系、包子粥店</span>
      </div>
      <div class="msgbox">
        <span>地址：北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340</span>
      </div>
      <div class="msgbox">
        <span>营业时间：10：00-20：30</span>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/fonts/font_r15qugo244/iconfont.css";
export default {
  data() {
    return {
      value: 4, //评分星星
      //点击收藏
      myicon: "iconfont icon-shoucang1",

      //商家店铺图片
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },

  computed: {
    
  }
};
</script>

<style lang="scss" scoped>
#merchant_box {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  /* 商家基本信息 */
  .merchant_div {
    width: 100%;
    padding: 0 20px;
    /* 上半部分 */
    .merchant_divtop {
      border-bottom: 1px solid #e8e8e8;
      width: 90%;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      /* 左边 */
      .left {
        .left_p1 {
          font-size: 18px;
        }
        .left_p2 {
          width: 210px;
          display: flex;
          justify-content: space-between;
          /* 评分 */
          .van-rate {
            margin-top: 6px;
          }
          span {
            font-size: 12px;
            line-height: 32px;
          }
        }
      }
      /* 右边 */
      .right {
        .checkbox {
          text-align: center;
          .iconfont {
            font-size: 24px;
            color: #f01514;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
    /* 下半部分 */
    .merchant_divbottom {
      width: 90%;
      padding: 20px 0;
      display: flex;
      justify-content: space-around;
      .box {
        text-align: center;
        p:first-of-type {
          font-size: 12px;
          color: #b4b7b9;
        }
        p:last-of-type {
          font-size: 20px;
        }
      }
      /* 分割线 */
      .rule {
        width: 1px;
        background: #e8e8e8;
        border: 1px solid #e8e8e8;
      }
    }
  }
  /* 分割线 */
  .rule_box {
    width: 100%;
    height: 15px;
    background: #f3f6f6;
    border-top: 2px solid #e5e8e8;
    border-bottom: 2px solid #e5e8e8;
  }
  /* 公告与活动 */
  .notice {
    padding: 20px 20px 10px;
    p {
      padding: 10px;
      color: #ff0800;
    }
  }

  /* 活动 */
  .activity {
    padding: 0 20px;
    .activity_box {
      padding: 15px 10px;
      border-top: 1px solid #e8e8e8;
      // border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: flex-start;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }

  /* 商家实景 */
  .live_img {
    // height: 100px;
    padding: 20px;
    h3 {
      margin-bottom: 10px;
    }
    img {
      width: 100%;
      height: 150px;
    }
  }

  /* 商家信息 */
  .merchant_msg {
    padding: 20px;
    h3 {
      margin-bottom: 10px;
    }
    .msgbox {
      padding: 15px 10px;
      border-top: 1px solid #e8e8e8;
    }
  }
}
</style>