<script>

// const SERVER_URL = 'http://59.60.10.174:53080' // 正式环境
// const SERVER_URL = 'http://59.60.10.174:47880' // 测试环境
// const SERVER_URL = 'http://192.168.173.78:8080' // 内网测试环境
const SERVER_URL = 'app' // 本地调试

// app外网上线端口
const SERVER_USER = {
  LOGIN: SERVER_URL + '/api/biz/login',
  USER_INFO: SERVER_URL + '/api/getUserInfo',
  UPLOAD_FILE: SERVER_URL + '/app/file/add',
  SAVE_REGISTRATION_ID: SERVER_URL + '/api/saveJPushRegistrationId', // 保存极光推送的registrationId (定点设备推送使用)
  JPUSH_PUSH: 'https://api.jpush.cn/v3/push'
}
const SERVER_BANQUET = {
  GET_ADDRESS: SERVER_URL + '/api/bizBanquet/getAddress', // 获取地区
  GET_BANQUET_NO: SERVER_URL + '/api/bizBanquet/getBanquetNo', // 获取宴会编号
  SAVE_BANQUET: SERVER_URL + '/api/bizBanquet/saveBanquet', // 保存宴会信息
  GET_BANQUET_BY_ID: SERVER_URL + '/api/bizBanquet/getBanquetById', // 根据宴会Id获取宴会信息
  GET_BANQUET_TPYE: SERVER_URL + '/api/bizBanquet/getBanquetType', // 获取宴会类型
  GET_BANQUET_GROUP: SERVER_URL + '/api/bizBanquet/getBanquetGroup', // 获取小组长
  GET_BANQUET_LIST: SERVER_URL + '/api/bizBanquet/getBanquetList', // 获取宴会列表
  CONFIRM_BANQUET: SERVER_URL + '/api/bizBanquet/confirmBanquet', // 确认宴会
  DELETE_BANQUET: SERVER_URL + '/api/bizBanquet/deleteBanquet', // 删除宴会
  GET_BANQUETS_BY_STATE: SERVER_URL + '/api/bizBanquet/getBanquetsByState', // 根据宴会状态获取宴会数
  BANQUET_FOR_WINE: SERVER_URL + '/api/bizBanquet/banquetForWin', // 宴会备酒
  BANQUET_REVIEW: SERVER_URL + '/api/bizBanquet/review' // 宴会复核
}
const SERVER_BANQUET_WINE = {
  GET_BANQUET_WINE_TPYE: SERVER_URL + '/api/bizBanquetWine/getWineType', // 获取酒类类型
  GET_STANDARDQTY: SERVER_URL + '/api/bizBanquetWine/getStandardQty', // 获取标准瓶数
  SAVE_BANQUET_WINE: SERVER_URL + '/api/bizBanquetWine/saveBanquetWine', // 保存宴会用酒
  GET_BANQUET_WINE_LIST: SERVER_URL + '/api/bizBanquetWine/getBanquetWineList', // 获取宴会用酒列表
  GET_BANUQETWINE_BY_ID: SERVER_URL + '/api/bizBanquetWine/getBanuqetWineById', // 根据宴会用酒Id获取宴会用酒
  DELETE_BANQUET_WINE: SERVER_URL + '/api/bizBanquetWine/deleteBanquetWine', // 删除宴会用酒
  SAVE_BANQUET_WINE_LIST: SERVER_URL + '/api/bizBanquetWine/saveBanquetWineList' // 保存宴会用酒列表
}
const SERVER_MESSAGE = {
  GET_MESSAGE_LIST: SERVER_URL + '/api/bizBanquetMsg/getMsgList', // 获取消息列表
  UPDATE_READ_FLAG: SERVER_URL + '/api/bizBanquetMsg/updateReadFlag' // 更新消息已读状态
}
const SERVER_BANQUET_PERSON = {
  GET_BANQUET_PERSON_LIST: SERVER_URL + '/api/bizBanquetPerson/getBanquetPersonList', // 获取宴会人员列表
  GET_PERSONS: SERVER_URL + '/api/bizBanquetPerson/getPersons', // 获取人员列表
  GET_PERSONTYPES: SERVER_URL + '/api/bizBanquetPerson/getPersonTypes', //  获取人员类型列表
  SAVE_BANQUET_PERSON: SERVER_URL + '/api/bizBanquetPerson/saveBanquetPerson', // 保存宴会人员
  GET_BANQUET_PERSON_BY_ID: SERVER_URL + '/api/bizBanquetPerson/getBanquetPersonById', // 根据宴会人员获取宴会人员
  DELETE_BANQUET_PERSON: SERVER_URL + '/api/bizBanquetPerson/deleteBanquetPerson', // 删除宴会人员
  SEND_MESSAGE: SERVER_URL + '/api/bizBanquetPerson/sendMessage' // 发送短信
}
const SERVER_BANQUET_COST = {
  GET_BANQUET_COST_LIST: SERVER_URL + '/api/bizBanquetCost/getBanquetCostList', // 获取宴会费用列表
  GET_BANQUET_COST_BY_ID: SERVER_URL + '/api/bizBanquetCost/getBanquetCostById', // 根据id获取宴会费用
  GET_BANQUET_COST_TYPE_LIST: SERVER_URL + '/api/bizBanquetCost/getBanquetCostTypeList', // 获取宴会费用类型列表
  SAVE_BANQUET_COST: SERVER_URL + '/api/bizBanquetCost/saveBanquetCost', // 保存宴会费用
  SALARY_ACCOUNT: SERVER_URL + '/api/bizBanquetCost/salaryAccount', // 工资结算
  PERSON_AWARD: SERVER_URL + '/api/bizBanquetCost/personAward', // 人员奖励
  DELETE_BANQUET_COST: SERVER_URL + '/api/bizBanquetCost/deleteBanquetCost' // 删除宴会费用
}
const SERVER_BANQUET_PHOTO = {
  PHOTO_SCENE: SERVER_URL + '/apiNolog/bizBanquetPhoto/photoScene', // 现场照片
  SAVE_PHOTO_SCENE: SERVER_URL + '/apiNolog/bizBanquetPhoto/savePhotoScene' // 保存现场照片
}

// 正则表达式
const REGEX = {
  IS_INTEGER: /^[1-9][0-9]*$/, // 只能为正整数
  IS_NUMBER: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, // 只能为正数(包括小数)
  IS_PHONE: /^[1][3,4,5,7,8][0-9]{9}$/ // 手机号码
}

// 角色id t_role表
const ROLE = {
  PFS: '4', // 批发商
  ADMIN: '7', // 管理员
  GROUP_LEADER: '8', // 执行公司_小组长
  PERNOD_RICARD: '10' // 保乐力加

}
// 宴会状态
const BANQUET_STATE = {
  BANQUET_STATE_ZC: '0', // 暂存
  BANQUET_STATE_DQR: '1', // 待确认
  BANQUET_STATE_DBJ: '2', // 待备酒
  BANQUET_STATE_YBJ: '3', // 已备酒
  BANQUET_STATE_JL: '4' // 奖励
}

// 晋南六镇
const JING_NAN_SIX_TOWN = ['英林镇', '金井镇', '龙湖镇', '深沪镇', '东石镇', '永和镇']

// 晋江
const JIN_JIANG = {
  SIX_TOWN: '晋南六镇',
  OTHER: '晋江其它'
}
export default {
  SERVER_USER,
  SERVER_BANQUET,
  SERVER_BANQUET_WINE,
  SERVER_MESSAGE,
  SERVER_BANQUET_PERSON,
  SERVER_BANQUET_PHOTO,
  SERVER_BANQUET_COST,
  BANQUET_STATE,
  REGEX,
  ROLE,
  JING_NAN_SIX_TOWN,
  JIN_JIANG
}
</script>
