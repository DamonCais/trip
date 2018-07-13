<template>
	<div class="addressSel">
		<van-nav-bar class="nav" title="收货地址" left-text="返回" left-arrow @click-left="onSel" />

		<van-radio-group v-model="chosenAddressId" @change="setDefaultAddress">
			<van-cell-group v-for="item in address" :key="item._id" class="addressGroup">
				<van-cell icon="location" :title="item.name+' '+item.mobilePhone" :label="item|fullAddress" />

				<van-cell>
					<van-radio class="dRadio" slot="title" :name="item._id" @change="setDefaultAddress(item._id)">
						<span :class="item._id===chosenAddressId && 'red'">{{item._id===chosenAddressId ? '当前选中' : '选中'}}</span>
					</van-radio>
					<div>
						<router-link tag="span" :to="{ path: '/me/addresses/' + item._id}" style="margin-right: 10px;">
							<van-icon name="edit-data" /> 编辑
						</router-link>
						<span @click="del(item._id)">
							<van-icon name="delete" /> 删除
						</span>
					</div>
				</van-cell>

			</van-cell-group>
		</van-radio-group>

		<van-button class="bottom_btn" @click="setNewAddress" type="primary" bottomAction>
			添加地址
		</van-button>
		<!-- <van-button class="bottom_btn" @click="onAdd" type="primary" bottomAction>
			添加地址
		</van-button> -->
	</div>
</template>

<script>
import { Toast } from 'Vant'
import { doPost } from '@/api/api2'

export default {

	data() {
		return {
			chosenAddressId: '',
			address: [],
		}
	},
	mounted() {
		this.addressGet();
	},
	methods: {
		onSel() {
			this.$emit('onSel', this.address.filter(add => add._id === this.chosenAddressId)[0]);
		},
		addressGet() {
			doPost('/UserAddress.find').then(res => {
				this.address = res;
				doPost('/UserAddress.getLastUsed').then(res => {
					if (!res) { return; }
					this.chosenAddressId = res._id;
				})
			})
		},
		setDefaultAddress(id) {
			this.chosenAddressId = id;
		},
		setNewAddress() {
			this.$router.push({ path: '/user/address-edit/-1' })
		},
		del(id) {
			doPost('UserAddress.remove', { userAddressId: id }).then(res => {
				if (res.status === 'okay') {
					this.addressGet();
				}
			})
		}
	},
	filters: {
		fullAddress(item) {
			return `${item.province.split('/')[1]} ${item.city.split('/')[1]} ${item.district.split('/')[1] || ''} ${item.street.split('/')[1] || ''}`;
		}
	}

}
</script>

<style lang="scss">
.dRadio {
  .van-radio__input,
  .van-radio__label {
    vertical-align: baseline;
  }
}
.red {
  color: red;
}
</style>
<style lang="scss" scoped>
.addressSel {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
  .addressGroup {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .bottom_btn {
    position: fixed;
    bottom: 0;
    z-index: 10000;
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>