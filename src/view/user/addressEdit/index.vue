<template>
	<div>
		<van-nav-bar :title="$t('ME_ADDRESS_EDIT_TITLE')" :left-text="$t('NAV_BACK')" left-arrow @click-left="goBack" />

		<van-field v-model="name" :label="$t('ME_ADDRESS_NAME')" :placeholder="$t('ME_ADDRESS_NAME')" required />
		<van-field v-model="phone" :label="$t('ME_ADDRESS_PHONE')" :placeholder="$t('ME_ADDRESS_PHONE')" required />
		<van-field v-model="zone[0].name" :label="$t('ME_ADDRESS_PROVINCE')" :placeholder="$t('ME_ADDRESS_PROVINCE')" @focus="onFocus" :data-id="0" required />
		<van-field v-show="zone[0].name" v-model="zone[1].name" :label="$t('ME_ADDRESS_CITY')" :placeholder="$t('ME_ADDRESS_CITY')" @focus="onFocus" :data-id="1" required />
		<van-field v-show="zone[1].name" v-model="zone[2].name" :label="$t('ME_ADDRESS_DISTRICT')" :placeholder="$t('ME_ADDRESS_DISTRICT')" @focus="onFocus" :data-id="2" />
		<van-field v-show="zone[2].name" v-model="zone[3].name" :label="$t('ME_ADDRESS_STREET')" :placeholder="$t('ME_ADDRESS_STREET')" @focus="onFocus" :data-id="3" />
		<van-field v-model="address" :label="$t('ME_ADDRESS_ADDRESS')" :placeholder="$t('ME_ADDRESS_ADDRESS')" required />
		<div style="padding:10px;">
			<van-button @click="onSubmit" size="large">{{$t('ME_ADDRESS_SUBMIT')}}</van-button>
		</div>

		<!-- 选择器 -->
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-picker value-key="text" show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
		</van-popup>

	</div>
</template>

<script>

import { findProvince, findCity, findDistrict, findStreet, findZone } from '@/api/mpApi';
import { doPost } from '@/api/api2'
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['userAddress']),
	},
	name: "address-edit",


	data() {
		return {
			address: '',
			name: '',
			phone: '',
			province: '',
			city: '',
			street: '',
			district: '',
			zone: [{ name: '' }, { name: '' }, { name: '' }, { name: '' }],
			show: false,
			areaList: [],
			currentIndex: 0,
			zoneIndex: ['provinceId', 'cityId', 'districtId', 'streetId'],
			columns: [],
			addressId: '',
		};
	},
	methods: {
		addressGetById() {
			doPost('/UserAddress.get', { userAddressId: this.$route.params.id }).then(res => {
				this.address = res.address;
				this.name = res.name;
				this.phone = res.mobilePhone;
				this.zone = [
					{ name: res.province, id: res.provinceId },
					{ name: res.city, id: res.cityId },
					{ name: res.district, id: res.districtId },
					{ name: res.street, id: res.streetId }
				],
					this.areaList
			})
		},
		onConfirm(values) {
			for (var index = this.currentIndex; index <= 3; index++) {
				this.zone[index] = { name: '' };
			}
			this.zone[this.currentIndex] = values;
			this.show = false;
		},
		onCancel() {
			this.show = false;
		},
		onFocus(e) {
			this.currentIndex = e.target.dataset.id;
			this.columns = [];
			if (this.currentIndex !== '0') {
				findZone(this.zone[this.currentIndex - 1]['id'], parseInt(this.currentIndex)).then(res => {
					let arr = [];
					this.areaList[this.currentIndex] = Object.values(res.data);
					this.columns = this.areaList[this.currentIndex].map(this.langFilter);
				})
			} else {
				this.getZone();
			}
			this.show = true;
			e.target.blur();
		},
		getZone() {
			findProvince().then(res => {
				let arr = [];
				this.areaList[0] = Object.values(res.data);
				this.columns = this.areaList[0].map(this.langFilter)
			})
		},
		langFilter(obj) {
			var robj = obj;
			let index = this.language === 'en' ? 0 : 1;
			if (robj.name) {
				robj.text = robj.name.split('/')[index];
				robj.id = robj[this.zoneIndex[this.currentIndex]]
			}
			return robj;
		},
		onSubmit() {
			let obj = {
				address: this.address,
				city: this.zone[1].name,
				cityId: this.zone[1]['id'],
				country: 'CHN',
				district: this.zone[2].name,
				districtId: this.zone[2]['id'],
				mobilePhone: this.phone,
				mobilePhoneCountry: '+86',
				name: this.name,
				postalCode: '',
				province: this.zone[0].name,
				provinceId: this.zone[0]['id'],
				street: this.zone[3].name,
				streetId: this.zone[3]['id'],
			}
			if (this.$route.params.id !== '-1') {
				obj.userAddressId = this.$route.params.id;
				doPost('/UserAddress.update', obj).then(res => {
					this.goBack();
				})
			} else {
				doPost('/UserAddress.create', obj).then(res => {
					this.goBack();
				})
			}


		}
	},

	mounted() {
		if (this.$route.params.id !== 'new') {
			this.addressGetById();
		}

	},

}
</script>