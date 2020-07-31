import request from '@/utils/request';

export async function getExchangesList(param) {
  return request(
    `duanwu/api/v1/exchangeAward/showUserCondition`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 兑换红包
export async function exchangeCash(param) {
  return request(
    `duanwu/api/v1/exchangeAward/activityDateTime/exchangeCash`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 17 0 15 6 4
// 兑换摄影卡
export async function exchangePhotographyCard(param) {
  return request(
    `duanwu/api/v1/exchangeAward/activityDateTime/exchangePhotographyCard`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function getHomepageActivityUserInfo(param) {
  return request(
    `duanwu/app/v1/activity/user/getHomepageActivityUserInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
