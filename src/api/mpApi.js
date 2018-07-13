import axios from 'axios';
export function findProvince() {
  return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findProvince');
}

export function findCity(id) {
  return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findCity', { provinceId: id });
}

export function findDistrict(id) {
  return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findDistrict', { cityId: id });
}

export function findStreet(id) {
  return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findStreet', { districtId: id });
}

export function findZone(id, index) {
  switch (index) {
    case 1:
      return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findCity', { provinceId: id });
    case 2:
      return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findDistrict', { cityId: id });
    case 3:
      return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findStreet', { districtId: id });
    default:
      return axios.post('https://mp-dev.guzzu.cn/api/2/Zone.findProvince');
  }
}
