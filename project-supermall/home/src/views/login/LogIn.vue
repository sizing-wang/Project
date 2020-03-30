<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <nav-bar title="用户登录" class="nav-bar"/>
    <van-form>
      <!-- 用户名 -->
      <van-field v-model="username"
                 class="username"
                 type="number"
                 label="用户名"
                 :rules="[{ required: true, message: '用户名不能为空' }]"
      />
      <!-- 输入密码 -->
      <van-field v-model="password"
                 class="password"
                 type="password"
                 label="密码"
                 :rules="[{ required: true, message: '密码不能为空' }]"
      />
      <!-- 图形验证码 -->
      <div class="captcha-box" :style="{display: 'flex', width: '100%', marginTop: '20px'}">
        <van-field v-model="captcha"
                   class="captchaInput"
                   label="验证码"
                   :style="{width: '100px', flex: '1'}"
                   :rules="[{ required: true, message: '验证码不能为空' }]"
        />
        <span class="captcha" v-html="captchaCode" @click="getCaptcha"></span>
      </div>
    </van-form>

    <!-- 登录按钮 -->
    <div class="btn-box" style="margin: 16px;">
      <van-button
        class="loginBtn"
        type="info"
        round
        block
        @click="onSubmit"
      >登录</van-button>
    </div>
    <!-- 注册按钮 -->
    <div class="register-box">
      <van-button
        class="registerBtn"
        type="info"
        size="mini"
        @click="goRegister"
      >用户注册</van-button>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import * as type from "./store/actionsType"
  import { mapGetters } from "vuex"
  import {Dialog} from "vant";

  export default {
    name: "Login",
    components: {
      NavBar
    },
    data() {
      return {
        username: '',
        password: '',
        captcha: ''
      };
    },
    created() {
      // 组件创建完毕, 派发actions, 获取图形验证码
      this.$store.dispatch(type.GET_CAPTCHA);
      const redirect = this.$route.query.redirect;
      // 派发actions, 将刚才的页面路由地址保存下来, 登录完毕之后, 自动跳转到刚才想要进入的页面
      this.$store.dispatch(type.GET_REDIRECT_PATH, {redirect})
    },
    methods: {
      onSubmit() {
        // 1. 获取表单中的数据
        const username = this.username;
        const password = this.password;
        const captchaCode = this.captcha;
        // 2. 验证数据合法性
        const phoneReg =/^[1][3,4,5,7,8][0-9]{9}$/;
        if ((!phoneReg.test(username)) && username != '') {
          Dialog({ message: '手机号码格式不正确' });
          return
        } else if (username == '') return;
        // 判断验证码是否为空
        if (captchaCode == '') return;
        // 校验密码：只能输入6-20个字母、数字、下划线
        const passwordReg = /^(\w){6,20}$/;
        if ((!passwordReg.test(password)) && password != '') {
          Dialog({ title: '密码格式不正确', message: '请以6-20个字母、数字、下划线' });
          return
        } else if (password == '') return;

        // 3. 数据合法, 派发actions, 将表单中的数据提交到服务器, 进行登录
        this.$store.dispatch(type.GET_USER_LOGIN, {username, password, captchaCode})

      },
      goRegister() {
        this.$router.push("/register")
      },
      getCaptcha() {
        this.$store.dispatch(type.GET_CAPTCHA)
      }
    },
    computed: {
      ...mapGetters([
        "captchaCode",
        "redirect"
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
  .btn-box .loginBtn {
    font-size: 18px;
  }
  .register-box {
    width: 100%;
    height: 50px;
  }
  .register-box .registerBtn {
    float: right;
    margin-right: 16px;
  }
  .captcha-box .captcha {
    display: inline-block;
    width: 120px;
    height: 100%;
  }
  .captcha-box .captcha >>> svg { /* >>> 能获取到动态生成的html标签, 然后给它设置样式 */
    width: 100%;
    height: 100%;
  }
</style>
