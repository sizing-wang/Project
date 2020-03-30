<template>
  <div class="profile">
    <!-- 顶部导航栏 -->
    <nav-bar title="个人中心" :arrow="leftArrow"/>
    <!-- 滚动组件 -->
    <scroll class="contentWrapper">
      <div class="header" v-bind:class="{'status':isH5Plus}">
        <div class="userinfo" v-show="usernameShow">
          <div class="face"><img :src="userinfo.face" /></div>
          <div class="info">
            <div class="username">{{userinfo.username}}</div>
            <div class="integral">积分:{{userinfo.integral}}</div>
          </div>
        </div>
        <div class="loginPanel" v-show="loginPanel">
          <span class="login" @click="$router.push('/login')">登录</span>
          <span class="register" @click="$router.push('/register')">注册</span>
        </div>
        <div class="logout"><span @click="logout">退出</span></div>
      </div>
      <div class="orders">
        <div class="box">
          <div class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover">
            <div class="icon">
              <img :src="row.icon" />
            </div>
            {{row.name}}
          </div>
        </div>
      </div>
      <div class="list"
           v-for="(list,list_i) in severList"
           :key="list_i"
      >
        <div class="li"
             v-for="(li,li_i) in list"
             :key="li.name"
             @click="goOrderList(li_i)"
        >
          <div class="icon"><img :src="li.icon" /></div>
          <div class="text" ref="listItem">{{li.name}}</div>
          <img class="to" src="./img/to.png" />
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import NavBar from "../../components/common/navbar/NavBar";
  import { getUsername } from "network/home"
  import * as type from "./store/actionsType"
  import { Dialog, Notify } from 'vant';

  export default {
    name: "Profile",
    components: {
      Scroll,
      NavBar
    },
    data() {
      return {
        usernameShow: false,
        loginPanel: true,
        leftArrow: false,
        //#ifdef APP-PLUS
        isH5Plus:true,
        //#endif
        //#ifndef APP-PLUS
        isH5Plus:false,
        //#endif
        userinfo:{},
        orderTypeLise:[
          //name-标题 icon-图标 badge-角标
          {name:'待付款',icon:'./img/l1.png'},
          {name:'待发货',icon:'./img/l2.png'},
          {name:'待收货',icon:'./img/l3.png'},
          {name:'已完成',icon:'./img/l4.png'},
          {name:'退换货',icon:'./img/l5.png'}
        ],
        severList:[
          [
            {name:'我的订单',icon:'./img/sever/point.png'},
            {name:'优惠券',icon:'./img/sever/quan.png'},
            {name:'红包',icon:'./img/sever/momey.png'},
            {name:'任务',icon:'./img/sever/renw.png'},
          ]
        ],
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        // 发送请求, 加载用户名
        getUsername()
        .then(result => {
          if (result.code == 0) {
            this.loginPanel = false;
            this.usernameShow = true;
            const username = result.data.username;
            //用户信息
            this.userinfo={
              face:'./img/face.jpeg',
              username: username,
              integral:"1635"
            }
          } else {
            this.loginPanel = true;
            this.usernameShow = false;
            Notify({message: "加载用户名失败, 请稍后再试 !"})
          }
        })
        .catch(() => {
          Notify({message: "网络错误, 请稍后再试 !"})
        })
      },
      logout() {
        Dialog.confirm({
          message: '确定退出当前用户吗?'
        })
        .then(() => {
          // 派发actions, 发送请求, 退出登录
          this.$store.dispatch(type.GET_USER_LOGOUT)
        })
        .catch(() => {
          return
        })
      },
      goOrderList (index) {
        const listText = this.severList[0][index].name;
        if (listText == '我的订单') {
          // 路由跳转到订单列表页
          this.$router.push("/orderList")
        }
      }
    }
  }
</script>

<style lang="scss">
  .profile{
    width: 100%;
    height: 100vh;
    position: relative;
    /*background-color: #f1f1f1;*/
    .contentWrapper {
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow: hidden;
    }
  }
  .header{
    position: relative;
    &.status{
      padding-top:var(--status-bar-height);
    }
    background-color:#ff6364;
    width:100%;
    height:30vw;
    padding:0 4%;
    display:flex;
    align-items:center;
    .userinfo{
      width:90%;
      display:flex;
      .face{flex-shrink:0;
        width:15vw;
        height:15vw;
        img{
          width:100%;
          height:100%;
          border-radius:100%
        }
      }
      .info{
        display:flex;
        flex-flow:wrap;
        padding-left:20px;
        .username{
          width:100%;
          color:#fff;
          font-size:20px
        }
        .integral{
          display:flex;
          align-items:center;
          padding:0 10px;
          height:25px;
          color:#fff;
          background-color:rgba(0,0,0,0.1);
          border-radius:20px;
          font-size:14px
        }
      }
    }
    .logout{
      width:50px;
      height:50px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      span {
        color: #eee;
        line-height: 50px;
      }
    }
    .loginPanel {
      color: #eee;
      .login {
        margin-right: 10px;
      }
    }
  }
  .hover{
    background-color:#eee
  }
  .orders{
    background-color:#ff6364;
    width:100%;
    height:11vw;
    padding:0 4%;
    margin-bottom:calc(11vw + 40px);
    display:flex;
    align-items:flex-start;
    border-radius:0 0 100% 100%;
    margin-top: -1upx;
    .box{
      width:98%;
      padding:0 1%;
      height:22vw;
      background-color:#fefefe;
      border-radius:24px;
      box-shadow:0 0 20px rgba(0,0,0,0.15);
      margin-bottom:40px;
      display:flex;
      align-items:center;
      justify-content:center;
      .label{
        display:flex;
        align-items:center;
        justify-content:center;
        flex-flow:wrap;
        width:100%;
        height:16vw;
        color:#666666;
        font-size:14px;
        .icon{
          position:relative;
          width:7vw;
          height:7vw;
          margin:0 1vw;
          .badge{
            position:absolute;
            width:4vw;
            height:4vw;
            background-color:#ec6d2c;
            top:-1vw;
            right:-1vw;
            border-radius:100%;
            font-size:20px;
            color:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            z-index: 10;
          }
          img{
            width:7vw;
            height:7vw;
            z-index: 9;
          }
        }
      }
    }
  }
  .list{
    width:100%;
    /*border-bottom:solid 26px #f1f1f1;*/
    .li{
      width:100%;
      height:50px;
      padding:0 4%;
      border-bottom:solid 1px #e7e7e7;
      display:flex;
      align-items:center;
      &.noborder{
        border-bottom:0
      }
      .icon{
        flex-shrink:0;
        width:25px;
        height:25px;
        img{
          width:25px;
          height:25px
        }
      }
      .text{
        padding-left:20px;
        width:100%;
        color:#666
      }
      .to{
        flex-shrink:0;
        width:20px;
        height:20px
      }
    }
  }
</style>
