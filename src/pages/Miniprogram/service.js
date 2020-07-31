import request from '@/utils/request';
export async function receiveShareAward(param) {
  return request(
    `duanwu/app/v1/activity/user/receiveShareAward`,
    { method: 'post', data: param.payload },
    param.type,
  );
}