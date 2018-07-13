<template>
	<div class="login">
		<!-- header -->
		<div class="store_header">
			<div class="store_avatar">
				<img src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png" alt="头像" width="55" height="55">
			</div>
			<div class="store_name">我家的店</div>
		</div>

		<!--输入框  -->
		<van-cell-group>
			<van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="errorMsg" />
			<van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
				<van-button slot="button" size="small" type="primary">发送验证码</van-button>
			</van-field>
			<div style="padding:20px 20px 10px;">
				<van-button size="large" type="danger " :loading="isLogining " @click="loginSubmit ">登录</van-button>
			</div>

		</van-cell-group>

		<div class="register clearfix">
			<div class="float">
				<span tag="span" to="/login/registerGetCode">联系客服</span>
			</div>
			<div class="float">
				<router-link tag="span" to="/login/registerGetCode">免费注册</router-link>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			phone: "",
			password: "",
			sms: "",
			visiblePass: false,
			showKefu: false,
			isLogining: false,
			errorMsg: '',
		}
	},
	methods: {
		loginSubmit() {
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.phone)) {
				this.errorMsg = "请输入正确的手机号";
				return;
			} else {
				this.$store.commit('SET_NAME', this.phone);
				this.goBack();
				// this.$router.push({ path: '/user' });			
			}

		}
	}
}
</script>

<style lang="scss" scoped>
.login {
  background: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  .store_header {
    text-align: center;
    padding: 30px 0;
    margin-bottom: 5px;
    .store_avatar img {
      border-radius: 50%;
    }
    .store_name {
      padding-top: 5px;
      font-size: 16px;
    }
  }
  .register {
    padding-top: 40px;
    color: #999;
    .float {
      float: left;
      width: 50%;
      text-align: right;
      padding: 0 15px;
      box-sizing: border-box;
      &:last-child {
        border-left: 1px solid #999;
        text-align: left;
      }
    }
  }
}
</style>
