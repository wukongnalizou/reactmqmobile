import request from '@/utils/request';

export async function getMyGiftList(param) {
  return request(
    `duanwu/api/v1/exchangeAward/selectMyAwardRecord`,
    { method: 'post', data: param.payload },
    param.type,
  );
}