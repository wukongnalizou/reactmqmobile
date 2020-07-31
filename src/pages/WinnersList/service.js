import request from '@/utils/request';

export async function getWinnersList(param) {
  return request(
    `duanwu/api/v1/exchangeAward/showAwardRecordListAll`,
    { method: 'post', data: param.payload },
    param.type,
  );
}