<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="updateChecked(cart.skuId, cart.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              <span>{{ cart.skuName }}</span>
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <span>
              <a
                href="javascript:void(0)"
                class="mins"
                @click="handler(-1, cart)"
                >-</a
              >
              <input
                autocomplete="off"
                type="text"
                :value="cart.skuNum"
                minnum="1"
                class="itxt"
                @change="
                  handler(parseInt($event.target.value - cart.skuNum), cart)
                "
              />
              <a
                href="javascript:void(0)"
                class="plus"
                @click="handler(1, cart)"
                >+</a
              >
            </span>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#" class="sindelet" @click.prevent="deleteById(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updateAllCartChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#" @click.prevent="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          <em>已选择:</em>
          <i class="summoney">&nbsp;{{ totalNum }}&nbsp;</i>
          <em>件商品</em>
        </div>
        <div class="sumprice">
          <em>总价(不含运费):</em>
          <i class="summoney">&nbsp;{{ totalPrice }}&nbsp;</i>
          <em>元</em>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  computed: {
    ...mapGetters("shopCart", ["cartListObj"]),
    cartInfoList() {
      return this.cartListObj.cartInfoList || [];
    },
    totalPrice() {
      let res = 0;
      this.cartInfoList.forEach((element) => {
        if (element.isChecked === 1) {
          res += element.skuNum * element.skuPrice;
        }
      });
      return res;
    },
    totalNum() {
      let res = 0;
      this.cartInfoList.forEach((element) => {
        if (element.isChecked === 1) {
          res += element.skuNum;
        }
      });
      return res;
    },
    isAllChecked() {
      return this.cartInfoList.every((element) => element.isChecked === 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("shopCart/getCartList");
    },
    //防止出bug（用户操作太快，后台数据跟不上），添加节流
    handler: throttle(async function (val, cart) {
      //商品数量最小为1
      if (cart.skuNum + val <= 1 || isNaN(val)) {
        val = 1 - cart.skuNum;
      }
      try {
        await this.$store.dispatch("detail/getAddToCart", {
          skuId: cart.skuId,
          skuNum: val,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    async deleteById(skuId) {
      try {
        await this.$store.dispatch("shopCart/deleteCartListBySkuId", skuId);
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    async updateChecked(id, isChecked) {
      try {
        await this.$store.dispatch("shopCart/updateChecked", {
          skuId: id,
          isChecked: isChecked === 1 ? 0 : 1,
        });
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    async deleteAllCheckedCart(){
      try {
        await this.$store.dispatch('shopCart/deleteAllCheckedCart'),
        this.getData()
      } catch (error) {
        alert(error)
      }
    },
    async updateAllCartChecked(event){
      try {
        let checked=event.target.checked?1:0
        await this.$store.dispatch('shopCart/updateAllCartChecked',checked)
        this.getData()
      } catch (error) {
        alert.apply(error)
      }
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 20%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 33%;
      }

      .cart-th3 {
        width: 14.5%;
      }
      .cart-th4 {
        width: 11%;
      }
      .cart-th5 {
        width: 13.5%;
      }
      .cart-th6 {
        width: 5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 11%;
          height: 82px;
          padding-left: 10px;
          line-height: 82px;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            height: 82px;
            margin: 0 10px;
            line-height: 18px;
            span {
              display: inline-block;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }

        .cart-list-con3 {
          width: 10%;
          height: 82px;
          line-height: 82px;
          text-align: center;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 17%;
          height: 82px;
          line-height: 82px;
          text-align: center;
        }

        .cart-list-con5 {
          width: 10%;
          height: 82px;
          text-align: center;

          span {
            display: inline-block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 22px;
            height: 33px;
            line-height: 33px;
            text-align: center;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 22px;
            height: 33px;
            line-height: 33px;
            text-align: center;
          }
        }

        .cart-list-con6 {
          width: 13%;
          height: 82px;
          line-height: 82px;
          text-align: center;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;
          height: 82px;
          line-height: 82px;
          text-align: center;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    height: 56px;
    margin-bottom: 15px;
    line-height: 56px;

    .select-all {
      padding: 0 20px;
      margin-right: 40px;
      overflow: hidden;
      float: left;

      span {
        padding-left: 10px;
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 0 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;
      height: 56px;
      line-height: 56px;

      .chosed {
        height: 56px;
        line-height: 56px;
        float: left;
        padding: 0 10px;
        .summoney {
          color: #c81623;
          font-size: 14px;
        }
      }

      .sumprice {
        width: 200px;
        height: 56px;
        line-height: 56px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 14px;
        }
      }

      .sumbtn {
        float: right;
        height: 56px;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 55px;
          line-height: 55px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>