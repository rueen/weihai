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
export const getData = async (dispatch, type, temp = '', page = 1, rows = 10) => {
  return await fetch(`apis/whcredit_test/out/v2/data.json?dispatch=${ dispatch }&page=${ page }&rows=${ rows }&type=${ type }&temp=${ temp }`)
    .then((response) => response.json())
    .then((json) => json['result'])
}

/**
 * 图标1的颜色
 * @type {Array}
 */
export const ZDRQ_COLOR = ['#22af6a', '#ceb800', '#7640e4', '#155ae4', '#00befc']
