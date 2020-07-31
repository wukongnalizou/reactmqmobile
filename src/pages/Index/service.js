import request from '@/utils/request';
export async function getHomepageActivityUserInfo(param) {
  return request(
    `duanwu/app/v1/activity/user/getHomepageActivityUserInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function drawCard(param) {
  return request(
    `duanwu//app/v1/activity/card/activityDateTime/drawCard`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function showAwardRecordList(param) {
  return request(
    `duanwu/api/v1/exchangeAward/showAwardRecordList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function bindByWeChat(param) {
  return request(
    `duanwu/wx/user/bindByWeChat`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function bindByWeChatWithTelNum(param) {
  return request(
    `duanwu/wx/user/bindByWeChatWithTelNum`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function getCode(param) {
  return request(
    `sms/app/v1/sms/register`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function shareInfo(param) {
  return request(
    `duanwu/wx/user/share`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function receivedRegisterAndConcernAward(param) {
  return request(
    `duanwu/app/v1/activity/user/receivedRegisterAndConcernAward`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function getActivityConfig(param) {
  return request(
    `duanwu/app/v1/activity/config/getConfigCache`,
    { method: 'post', data: param.payload },
    param.type,
  );
}