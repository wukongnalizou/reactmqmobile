import request from '@/utils/request';
export async function userLogin(param) {
  return request(
    `duanwu/wx/user/login`,
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
export async function thirdLogin(param) {
  return request(
    `duanwu/wx/user/loginByWeChat`,
    { method: 'post', data: param.payload },
    param.type,
  );
}