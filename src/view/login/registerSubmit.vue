<template>
	<div class="register_view">
		<div style="margin-bottom:15px;padding:0 15px;">我们将发送验证码到您的手机</div>
		<van-cell-group>
			<van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="errorMsg" />

		</van-cell-group>

		<div class="register_submit">
			<van-button size="large" type="danger" @click="submitCode">下一步</van-button>
		</div>

		<div class="register_footer">
			已有账号?
			<router-link to="/login" class="red">登录</router-link>
		</div>
	</div>
</template>

<script>
export default {

	data() {
		return {
			phone: "",
			errorMsg: ''
		}
	},

	methods: {
		submitCode() {
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.phone)) {
				this.errorMsg = "请输入正确的手机号";
				return;
			} else {
				this.$router.push({ name: "registerSubmit" })
			}
		}
	},

}
</script>

<style lang="scss" scoped>
.register_view {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 30px 0;
  box-sizing: border-box;
  font-size: 14px;
  .register_submit {
    padding: 15px;
  }
  .register_footer {
    float: right;
    padding: 0 20px;
  }
}
</style>
