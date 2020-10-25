import { getJson, postJson } from "../utils/request";
// const isDevelopment = process.env.NODE_ENV === "development";
// const GLOBAL_GET_URL = isDevelopment ? "api/emp/app" : `/emp/app`;
// const _href = window.location.href;
// const queryStr = _href.split("?")[1];

// export function worksCondition2Service() {
//   return getJson(`${GLOBAL_GET_URL}/labour/company/labourInfos?${queryStr}`);
// }

export function loginService(params) {
  return postJson(
    `http://api.site.dev.axlcloud.cn/labor/Account/SignIn`,
    params
  );
}

export function getProjectService(params) {
  return getJson(`http://api.bis.dev.axlcloud.cn/Project/GetPrjMaps`, params);
}

export function getVideoDeviceServive(params) {
  return getJson(
    `http://api.bis.dev.axlcloud.cn/Device/GetVideoDevices`,
    params
  );
}
