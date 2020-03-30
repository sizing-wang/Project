<template>
  <div class="order-confirm">
    <!-- 顶部导航栏 -->
    <nav-bar title="订单确认" :arrow="true" right="删除所选" @clickRight="delAddress" />
    <!-- 滚动组件 -->
    <scroll class="content">
      <!-- 添加收货人地址面板 -->
      <van-contact-card
        add-text="新增收货地址"
        ref="saveAddressBtn"
        @click="saveAddressBtn"
      />
      <!-- 折叠面板 -->
      <van-collapse v-model="activeNames">
        <van-collapse-item title="选择收货地址" name="1">
          <!-- 收货地址列表 -->
          <div class="addressList"
               v-for="(item, index) in addressList"
               :key="index"
               :id="item._id"
               @click="getAddressId($event)"
          >
            <van-radio-group v-model="addressRadio">
              <van-radio :name="index">
                <div class="addressItem">
                  <div class="name-box">
                    <span class="name">{{item.name}}</span>
                    <span class="phone">{{item.phone}}</span>
                  </div>
                  <div class="addressDesc">
                    <span>{{item.province}}, {{item.city}}, {{item.county}}</span>
                  </div>
                  <div class="icon-box">
                    <van-icon name="edit" class="iconEdit" @click="showSaveAddress" />
                  </div>
                </div>
              </van-radio>
            </van-radio-group>
          </div>
        </van-collapse-item>
        <van-collapse-item title="选择支付方式" name="2">
          <!-- 支付方式 -->
          <van-radio-group v-model="paymentRadio">
            <van-cell-group>
              <van-cell title="支付宝" clickable @click="paymentRadio = '1'">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell title="微信" clickable @click="paymentRadio = '2'">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-collapse-item>

        <van-collapse-item title="查看所选商品" name="3">
          <!-- 商品订单列表 -->
          <div class="product-item" v-for="(item, index) in orderProducts.cartList" :key="index" >
            <van-card
              :num=item.count
              :price=item.totalPrice
              :title=item.product.name
              :thumb=item.product.mainImage
            >
              <!-- 商品属性 -->
              <template #tags>
                <van-tag plain>{{item.attr}}</van-tag>
              </template>
            </van-card>
          </div>
        </van-collapse-item>
      </van-collapse>
    </scroll>
    <!-- 底部结账导航栏 -->
    <div class="paymentBar-box">
      <div class="totalPrice-box">
        <div class="totalPricePanel">
          <span class="totalText">合计: <span class="unit">¥ <span class="totalPrice">{{orderProducts.totalCartPrice}}</span></span></span>
        </div>
      </div>
      <div class="submit-box">
        <van-button round type="info"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    class="submit"
                    @click="goPayment"
        >
          结算
        </van-button>
      </div>
    </div>
    <!-- 新增/编辑地址面板 -->
    <van-overlay :show="show" @click="hideAddressMask" class="addressWrapper">
      <div @click.stop>
        <div class="mask">
          <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-postal
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
          />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import NavBar from "../../components/common/navbar/NavBar";
  import areaList from "components/common/area/area"
  import * as type from "./store/actionsType"
  import { Dialog } from 'vant';
  import { mapGetters } from "vuex"

  export default {
    name: "Orderconfirm",
    components: {
      Scroll,
      NavBar
    },
    data() {
      return {
        addressRadio: '',
        paymentRadio: '1',
        activeNames: ['1'],
        areaList: areaList,
        addressInfo: {},
        addressId: null,
        show: false
      };
    },
    created() {
      // 派发actions, 获取当前登录用户的收货地址列表
      this.$store.dispatch(type.GET_ADDRESS_LIST);
      // 派发actions, 获取生成订单的商品列表
      this.$store.dispatch(type.GET_ORDER_PRODUCTS)
    },
    methods: {
      onSave(val) {
        if (this.addressDetail._id) { // 编辑地址
          const addressId = this.addressDetail._id;
          // 派发actions, 将编辑地址数据, 提交到服务器中
          this.$store.dispatch(type.GET_SAVE_ADDRESS, {val, addressId});
        } else { // 新增地址
          // 派发actions, 将新增地址数据, 提交到服务器中
          this.$store.dispatch(type.GET_SAVE_ADDRESS, {val});
        }
        this.show = false;
        this.addressInfo = {}
      },
      saveAddressBtn() {
        this.show = true;
        this.addressDetail._id = null; // 将选中地址的id为空, 解决编辑和新增地址的误判
      },
      getAddressId(e) {
        this.addressId = e.currentTarget.id;
        const addressId = this.addressId;
        // 派发actions, 获取当前收获地址的详情, 并回填
        this.$store.dispatch(type.GET_ADDRESS_DETAIL, {addressId})
      },
      delAddress() {
        Dialog.confirm({
          message: "确定删除该条地址吗?"
        })
        .then(() => {
          const addressId = this.addressId;
          // 派发actions, 发送请求, 删除选中收货地址
          this.$store.dispatch(type.HANDLE_DELETE_ADDRESS, {addressId})
        })
        .catch(() => {})
      },
      showSaveAddress() {
        this.show = true;
        const addressDetail = this.addressDetail;
        this.addressInfo = {
          id: addressDetail._id,
          name: addressDetail.name,
          tel: addressDetail.phone,
          province: addressDetail.province,
          city: addressDetail.city,
          county: addressDetail.county,
          addressDetail: addressDetail.address,
          areaCode: addressDetail.areaCode
        }

      },
      hideAddressMask() {
        this.show = false;
        this.addressInfo = {}
      },
      goPayment() {
        if (this.addressRadio === '') {
          Dialog({message: '请选择收货地址'});
          return
        }
        const shippingId = this.addressId;
        let paymentType = 0;
        if (this.paymentRadio == '1') {
          paymentType = "10"
        } else if (this.paymentRadio == '2') {
          paymentType = "20"
        }
        // 派发actions, 创建订单, 进行支付
        this.$store.dispatch(type.GET_ORDER_CONFIRM, {shippingId, paymentType})
      },
    },
    computed: {
      ...mapGetters([
        "addressList",
        "orderProducts",
        "addressDetail"
      ])
    }
  }
</script>

<style scoped>
  .order-confirm {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .content {
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: hidden;
  }
  .addressList {
    position: relative;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
  }
  .addressList .addressItem {
    width: 250px;
    height: 60px;
  }
  .addressItem .icon-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .addressItem .icon-box .iconEdit {
    vertical-align: middle;
    font-size: 20px;
  }
  .addressItem .name-box {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .addressItem .name-box .name {
    margin-right: 5px;
  }
  .addressItem .addressDesc {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    font-size: 16px;
  }
  .addressWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .product-item {
    width: 100%;
    position: relative;
    background-color: #fafafa;
  }
  .product-item >>> .van-card__title {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .product-item >>> .van-checkbox__icon {
    margin-left: 10px;
  }
  .product-item >>> .van-checkbox__label {
    display: inline-block;
    width: 100%;
  }
  .paymentBar-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 100%;
    height: 50px;
  }
  .paymentBar-box .totalPrice-box {
    float: left;
    position: relative;
    width: 140px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin-left: 100px;
  }
  .paymentBar-box .totalPrice-box .totalPricePanel {
    display: inline;
    width: auto;
    margin-left: 30px;
  }
  .paymentBar-box .totalPrice-box .totalPricePanel .totalPrice {
    font-size: 20px;
    color: #f32328;
  }
  .paymentBar-box .submit-box {
    height: 50px;
    float: right;
  }
  .paymentBar-box .submit-box .submit {
    width: 120px;
    height: 100%;
    font-size: 18px;
    margin-left: 5px;
    margin-right: 10px;
  }

</style>
