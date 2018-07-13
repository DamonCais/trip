<template>
	<div class="addressEdit">
		<van-nav-bar class="nav" :title="$t('ME_ADDRESS_TITLE')" left-arrow @click-left="goBack" />

		<van-radio-group v-model="chosenAddressId">
			<van-cell-group v-for="item in address" :key="item._id" class="addressGroup">
				<van-cell icon="location" :title="item.name+' '+item.mobilePhone" :label="item|fullAddress(language === 'en' ? 0 : 1)" />

				<van-cell>
					<!-- <van-radio class="dRadio" slot="title" :name="item.id" @change="setDefaultAddress(item.id)">
						<span :class="item.id===chosenAddressId && 'red'">{{item.id===chosenAddressId ? '默认地址' : '设为默认'}}</span>
					</van-radio> -->
					<div>
						<router-link tag="span" :to="{ path: '/me/addresses/' + item._id}" style="margin-right: 10px;">
							<van-icon name="edit-data" /> {{$t('ME_ADDRESS_EDIT')}}
						</router-link>
						<span @click="del(item._id)">
							<van-icon name="delete" /> {{$t('ME_ADDRESS_DELETE')}}
						</span>
					</div>
				</van-cell>

			</van-cell-group>
		</van-radio-group>

		<van-button class="bottom_btn" @click="addNewAddress" type="primary" bottomAction>
			{{$t('ME_ADDRESS_ADD_ADDRESS')}}
		</van-button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { doPost } from '@/api/api2'
import { Dialog } from 'vant';

export default {
	computed: {
		...mapGetters(['language'])
	},
	data() {
		return {
			chosenAddressId: 0,
			address: [],
		}
	},
	mounted() {
		this.addressGet();
	},
	methods: {
		addressGet() {
			doPost('/UserAddress.find').then(res => {
				this.address = res;
			})
		},

		addNewAddress() {
			this.$router.push({ path: '/me/addresses/new' })
		},
		del(id) {
			Dialog.confirm({
				title: '确认删除',
				message: ''
			}).then(() => {
				doPost('UserAddress.remove', { userAddressId: id }).then(res => {
					if (res.status === 'okay') {
						this.addressGet();
					}
				})
			}).catch(() => {
				// on cancel
			});

		}
	},
	filters: {
		fullAddress(item, index) {
			return `${item.province.split('/')[index]}  ${item.city.split('/')[index]}  ${item.district.split('/')[index] || ''}  ${item.street.split('/')[index] || ''}`;
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
.addressGroup {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bottom_btn {
  position: fixed;
  bottom: 0;
  max-width: 600px;
  margin: 0 auto;
}
</style>