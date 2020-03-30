<template>
  <div id="sku">
    <van-sku
      v-model="showSku"
      ref="skuData"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :show-add-cart-btn="false"
      :buy-text="buyText"
      @buy-clicked="onAddCartClicked"
    />
  </div>
</template>

<script>
  import { addCarts } from "network/home"
  import { Notify } from 'vant';

  export default {
    name: "Sku",
    props: ["show", "productSku"],
    data() {
      return {
        showSku: this.show,
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '颜色', // skuKeyName：规格类目名称
              v: [
                {
                  id: '30349', // skuValueId：规格值 id
                  name: '红色' // skuValueName：规格值名称
                },
                {
                  id: '1215',
                  name: '蓝色'
                }
              ],
              k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
              stock_num: 110 // 当前 sku 组合对应的库存
            }
          ],
          price: null, // 默认价格（单位元）
          stock_num: null, // 商品总库存
          collection_id: null, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          hide_stock: false // 是否隐藏剩余库存
        },
        goods: {
          // 数据结构见下方文档
          picture: ''
        },
        goodsId: null,
        buyText: "加入购物车"
      };
    },
    methods: {
      onAddCartClicked() {
        // 获取选择的商品规格数据
        const goodsSku = this.$refs.skuData.getSkuData();
        let options = {};
        options.productId = goodsSku.goodsId;
        options.count = goodsSku.selectedNum;
        options.attr = goodsSku.selectedSkuComb.id.key;
        // 发送请求, 将商品添加到购物车
        addCarts(options)
        .then(result => {
          if (result.code == 0) {
            this.showSku = false;
            Notify({ type: 'success', message: result.message });
          } else {
            Notify({ type: 'danger', message: '添加购物车失败, 刷新再试' });
          }
        })
        .catch(err => {
          Notify({ type: 'danger', message: '网络错误, 稍后再试 !' });
        })

      }
    },
    watch: { // 监听父组件传入的数据变化
      show(newVal, oldVal) {
        this.showSku = true
      },
      productSku(newVal) {
        const attrs = newVal.attrs;
        const skuTree = this.sku.tree;
        let attrArr = [];
        let attrsList = [];
        let skuList = this.sku.list;
        for (let i = 0; i < attrs.length; i++) {
          for (let j = 0; j < skuTree.length; j++) {
            let attrValue = attrs[i].value.split(",");
            let skuTreeValue = skuTree[j].v;
            // 每次加载属性值的时候, 先清理一下上一个商品的属性值
            skuTreeValue.splice(0,skuTreeValue.length);
            skuList.splice(0,skuList.length);
            skuTree[j].k = attrs[i].key;
            for (let t = 0; t < attrValue.length; t++) {
              attrArr.push({
                id: t,
                name: attrValue[t],
                imgUrl: newVal.mainImage,
                previewImgUrl: newVal.mainImage
              });
              skuTreeValue[t] = attrArr[t];
              attrsList.push({
                id: attrs[i], // skuId，下单时后端需要
                price: newVal.price * 100, // 价格（单位分）
                s1: t, // 规格类目 k_s 为 s1 的对应规格值 id
                stock_num: newVal.stock // 当前 sku 组合对应的库存
              })
              skuList[t] = attrsList[t]
            }
          }
        }
        this.sku.price = newVal.price;
        this.sku.stock_num = newVal.stock;
        this.sku.collection_id = newVal._id;
        this.goods.picture = newVal.mainImage;
        this.goodsId = newVal._id;
        // console.log("newVal::::::::::::",newVal);
        // console.log("sku::::::::::::::",this.sku)
      }
    }
  }


</script>

<style scoped>

</style>
