import * as request from "./request";

let baseUrl = "https://abc.mmyxyz.xyz";

// 1.管理员登陆
export function login(useData:any) {
  return request.post(baseUrl + "/adm/LoginAuth",useData);
}

// 2.获取待审核的文章
export function posts() {
  return request.get(baseUrl + "/msg/reviewlist");
}

// 3.审核留言通过
export function pass(msgId: string) {
  return request.get(baseUrl + "/msg/reviewPass" + msgId);
}

// 4.审核留言不通过
export function noPass(msgId: string) {
  return request.get(baseUrl + "/msg/reviewdel?msgid=2" + msgId);
}

// 5.统计点星总数
export function total() {
  return request.get(baseUrl + "/count/total");
}
