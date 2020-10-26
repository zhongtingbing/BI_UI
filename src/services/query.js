import { getJson, postJson } from "../utils/request";
const isDevelopment = process.env.NODE_ENV === "development";
// const GLOBAL_GET_URL = isDevelopment ? "api/emp/app" : `/emp/app`;
// const _href = window.location.href;
// const queryStr = _href.split("?")[1];

// export function worksCondition2Service() {
//   return getJson(`${GLOBAL_GET_URL}/labour/company/labourInfos?${queryStr}`);
// }

console.log(isDevelopment, "isDevelopment");
const LoginUrl = isDevelopment
  ? "http://api.site.dev.axlcloud.cn/labor/Account/SignIn"
  : "http://api.labor.axlyun.com/Account/SignIn";

const GLOBAL_URL = isDevelopment
  ? "http://api.bis.dev.axlcloud.cn"
  : "http://api.bi.axlyun.com";

export function loginService(params) {
  return postJson(LoginUrl, params);
}

export function getProjectService(params) {
  // return getJson(`http://api.bis.dev.axlcloud.cn/Project/GetPrjMaps`, params);
  return getJson(`${GLOBAL_URL}/Project/GetPrjMaps`, params);
}

export function getVideoDeviceServive(params) {
  return getJson(
    // `http://api.bis.dev.axlcloud.cn/Device/GetVideoDevices`,
    `${GLOBAL_URL}/Device/GetVideoDevices`,

    params
  );
}
