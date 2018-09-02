/**
 * Created by jarjune on 2018/8/31.
 */

/**
 * 获取接口数据
 * @param dispatch
 * @param type
 * @param page
 * @param rows
 * @returns {Promise.<TResult>}
 */
export const getData = async (dispatch, type, temp = '', page = 1, size = 10) => {
  return await fetch(`http://www.sdwhcredit.gov.cn/out/v2/data.json?dispatch=${ dispatch }&page=${ page }&size=${ size }&type=${ type }&temp=${ temp }`, {
  	mode: 'cors'
  })
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const search = async (qymc) => {
  return await fetch(`http://www.sdwhcredit.gov.cn/out/v2/data.json?dispatch=getQyList&page=1&size=10&qymc=${qymc}`, {
  	mode: 'cors'
  })
    .then((response) => response.json())
    .then((json) => json['result'])
}

export const getScreenEnterprise = async (id) => {
  return await fetch(`http://www.sdwhcredit.gov.cn/out/v2/data.json?dispatch=getScreenEnterprise&enterpriseId=${id}`, {
  	mode: 'cors'
  })
    .then((response) => response.json())
    .then((json) => json['result'])
}

/**
 * 图标1的颜色
 * @type {Array}
 */
export const ZDRQ_COLOR = ['#22af6a', '#ceb800', '#7640e4', '#155ae4', '#00befc']
