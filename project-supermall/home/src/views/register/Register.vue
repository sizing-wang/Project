<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <nav-bar title="用户注册" class="nav-bar"/>
    <van-form>
      <!-- 用户名(手机号) -->
      <van-field v-model="username"
                 class="username"
                 name="username"
                 type="number"
                 placeholder="请输入手机号码"
                 autocomplete="off"
                 :rules="[{ required: true, message: '手机号码不能为空' }]"
      />

      <!-- 验证码输入框 -->
      <van-field
        v-model="sms"
        name="sms"
        center
        clearable
        placeholder="请输入短信验证码"
        autocomplete="off"
        :rules="[{ required: true, message: '验证码不能为空' }]"
      >
        <van-button slot="button" size="small" type="primary" @click.stop="getCaptcha">发送验证码</van-button>
      </van-field>
      <!-- 图形验证码弹出层 -->
      <van-popup v-model="show">
        <van-field v-model="captchaVal" placeholder="请输入验证码" />
        <van-field v-html=captcha @click="getCaptcha" />
        <van-button block type="primary" @click="getVerifyCode">发送验证码</van-button>
      </van-popup>

      <!-- 输入密码 -->
      <van-field v-model="password"
                 class="password"
                 name="password"
                 type="password"
                 placeholder="请输入密码"
                 autocomplete="off"
                 :rules="[{ required: true, message: '密码不能为空' }]"
      />

      <!-- 再次确认密码 -->
      <van-field v-model="rePassword"
                 class="rePassword"
                 name="rePassword"
                 type="password"
                 placeholder="请再次输入密码"
                 autocomplete="off"
                 :rules="[{ required: true, message: '密码不能为空' }]"
      />

      <!-- 注册按钮 -->
      <div class="btn-box" style="margin: 16px;">
        <van-button
          class="registerBtn"
          type="info"
          round
          block
          @click="onSubmit"
        >注册</van-button>
      </div>
    </van-form>

    <!-- 登录按钮 -->
    <div class="login-box">
      <van-button
        class="loginBtn"
        type="info"
        size="mini"
        @click="goLogin"
      >已有账号,去登陆</van-button>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import { Dialog } from "vant"
  import * as type from "./store/actionsType"
  import { mapGetters } from "vuex"

  export default {
    name: "Login",
    components: {
      NavBar
    },
    data() {
      return {
        username: '',
        sms: '',
        password: '',
        rePassword: '',
        show: false,
        captchaVal: ''
      };
    },
    methods: {
      onSubmit() {
        // 1. 获取到表单中的数据,
        const phone = this.username;
        const password = this.password;
        const rePassword = this.rePassword;
        const verifyCode = this.sms;

        // 2. 校验数据合法性
        const phoneReg =/^[1][3,4,5,7,8][0-9]{9}$/;
        if ((!phoneReg.test(phone)) && phone != '') {
          Dialog({ message: '手机号码格式不正确' });
          return
        } else if (phone == '') return;
        // 判断验证码是否为空
        if (verifyCode == '') return;
        // 校验密码：只能输入6-20个字母、数字、下划线
        const passwordReg = /^(\w){6,20}$/;
        if ((!passwordReg.test(password)) && password != '') {
          Dialog({ title: '密码格式不正确', message: '请以6-20个字母、数字、下划线' });
          return
        } else if (password == '') return;
        // 判断再次输入密码和输入密码是否一致
        if (password != rePassword) {
          Dialog({message: '两次密码输入不一致'});
          return
        } else if (rePassword == '') return;

        // 3. 数据合法, 派发actions, 将表单中的数据, 提交到数据库, 注册新用户
        this.$store.dispatch(type.GET_USER_REGISTER, {phone,verifyCode,password})
      },
      goLogin() {
        this.$router.push("/login")
      },
      getCaptcha() {
        // 显示图形验证码弹出层
        this.show = true;
        // 派发actions, 发送请求, 获取图形验证码
        this.$store.dispatch(type.GET_CAPTCHA);
      },
      getVerifyCode() {
        const phone = this.username;
        const captchaCode = this.captchaVal;
        // 派发actions, 发送请求, 获取手机短信验证码
        this.$store.dispatch(type.GET_VERIFY_CODE, { phone, captchaCode})
        // 隐藏图形验证码弹出层
        this.show = false;
      }
    },
    computed: {
      ...mapGetters([
        "captcha",
        "verifyMessage"
      ])
    }
  }
</script>

<style scoped>
  .nav-bar {
    margin-bottom: 80px;
  }
  .username,.password {
    margin-top: 20px;
  }
  .btn-box .registerBtn {
    font-size: 18px;
  }
  .login-box {
    width: 100%;
    height: 50px;
  }
  .login-box .loginBtn {
    float: right;
    margin-right: 16px;
  }
</style>
