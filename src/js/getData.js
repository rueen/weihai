/**
 * Created by jarjune on 2018/8/31.
 */

/**
 * 获取接口数据
 * @param dispatch
 * @param type
 * @param page
 * @param size
 * @returns {Promise.<TResult>}
 */
export const delay = 1000 * 60 * 10;

// var url = 'http://www.sdwhcredit.gov.cn';
var url = 'http://59.224.26.192:9066/credit/search/v2/';
// export const getData = async (dispatch, type, temp = '', page = 1, size = 10) => {
//   return await fetch(`${url}/out/v2/data.json?dispatch=${ dispatch }&page=${ page }&size=${ size }&type=${ type }&temp=${ temp }`)
//     .then((response) => response.json())
//     .then((json) => json['result'])
// }
//
// export const getData2 = async (dispatch, type, type2, temp = '', page = 1, size = 10) => {
//   return await fetch(`${url}/out/v2/data.json?dispatch=${ dispatch }&page=${ page }&size=${ size }&type=${ type }&type2=${ type2 }&temp=${ temp }`)
//     .then((response) => response.json())
//     .then((json) => json['result'])
// }
//
// export const search = async (qymc) => {
//   return await fetch(`${url}/out/v2/data.json?dispatch=getQyList&page=1&size=10&qymc=${qymc}`)
//     .then((response) => response.json())
//     .then((json) => json['result'])
// }
//
// export const getDetail = async (id) => {
//   return await fetch(`${url}/out/v2/data.json?dispatch=getQyList&enterpriseId=${id}`)
//     .then((response) => response.json())
//     .then((json) => json['result'])
// }
//
// export const getScreenEnterprise = async (id) => {
//   return await fetch(`${url}/out/v2/data.json?dispatch=getScreenEnterprise&enterpriseId=${id}`)
//     .then((response) => response.json())
//     .then((json) => json['result'])
// }
//
// export const getScreenEnterpriseByFr = async (id, frmc) => {
//   return await fetch(`${url}/out/v2/data.json?dispatch=getScreenEnterpriseByFr&enterpriseId=${id}&frmc=${frmc}`)
//     .then((response) => response.json())
//     .then((json) => json['result'])
// }
export const getData = async (dispatch, type, temp = '', page = 1, size = 10) => {
  return await fetch(`${url}${ dispatch }?page=${ page }&size=${ size }&type=${ type }&temp=${ temp }`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const getData2 = async (dispatch, type, type2, temp = '', page = 1, size = 10) => {
  return await fetch(`${url}${ dispatch }?page=${ page }&size=${ size }&type=${ type }&type2=${ type2 }&temp=${ temp }`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const search = async (qymc) => {
  return await fetch(`${url}getQyList?page=1&size=10&qymc=${qymc}`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const getDetail = async (id) => {
  return await fetch(`${url}getQyList?enterpriseId=${id}`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const getScreenEnterprise = async (id) => {
  return await fetch(`${url}getScreenEnterprise?enterpriseId=${id}`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const getScreenEnterpriseByFr = async (id, frmc) => {
  return await fetch(`${url}getScreenEnterpriseByFr?enterpriseId=${id}&frmc=${frmc}`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

/**
 * 图标1的颜色
 * @type {Array}
 */
export const ZDRQ_COLOR = ['#22af6a', '#ceb800', '#7640e4', '#155ae4', '#00befc']
