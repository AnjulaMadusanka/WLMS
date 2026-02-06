import axios from "axios";
import _ from "lodash";
const currentUrl = `${window.location.protocol}//${window.location.host}`;
;
const isLive = false;
export const baseURL = isLive ?  `https://apiv2.wlms.archnix.dev/` : `https://api.wlms.archnix.dev/`  ;
export const stripeKey = isLive?'pk_live_51MzAu1Hm19PZigrAxWqHwGVWNdkesolZmiEiYOGKr4wiEH9KHEJKD5LPz2nxhHkpvCmsmIz0r1XSij3Pmv6P2Y6S00WmZKa0Om':'pk_test_51Hh5rVAWqIpRaeXeLS0OK5TGFs4VDTgdJXUYOODZT5lkFOy5frhReIn4ng3UTJ1KImQmaqqylptpXTybgUgcgMO100pkFYywfu'
export const documentURL = isLive ?  `https://apiv2.wlms.archnix.dev` : `https://api.wlms.archnix.dev`  ;

//!important this need to change with live url deploy to live 
export const baseappURL  = currentUrl;//isLive ?  `https://live.wlms.archnix.dev` : `https://staging.wlms.archnix.dev`  ;

export default class Repository {

  url =  `${baseURL}api/`;
  IMAGE_URL = `${baseURL}storage/` ;

 
  constructor() {
    // this.API_NAME = config.API_NAME;
    // this.API=API;
  }


  data = async (method, path, data = null, user_token = '') => {
    let access_token = localStorage.getItem('token')
    if (_.isNull(access_token)) {
      access_token = '';
    }
    console.log(path,"currentserver :",currentUrl)
    const token = ''
    return axios({
      method: method,
      url:this.url + path+'?v=1',
      data: data,
      headers: {
        Authorization: access_token.length > 0 ? `Bearer ${access_token}` : `Bearer`,
        Accept: "application/json",
      }
    })
      .then((response) =>  response)
      .catch((e) => {
       
        return e.response;
      });
  };

  pathData = async (method, path, data = null, user_token = '') => {
    let access_token = localStorage.getItem('token')
    if (_.isNull(access_token)) {
      access_token = '';
    }
    console.log(path,"currentserver :",currentUrl)
    const token = ''
    return axios({
      method: method,
      url:this.url + path,
      data: data,
      headers: {
        Authorization: access_token.length > 0 ? `Bearer ${access_token}` : `Bearer`,
        Accept: "application/json",
      }
    })
      .then((response) =>  response)
      .catch((e) => {
       
        return e.response;
      });
  };

  // externalData = async (url, method, token, data = null) => {
  //   try {

  //     const config = {
  //       headers: {
  //         'content-type': 'application/json',
  //         'x-access-token': `${token}`,
  //       }
  //     }
  //     return await axios.get(url, config);
  //   } catch (error) {
  //     return { error }
  //   }
  // }


  getAxios = async (path) => {
    return axios.get(path);
  }

  getData = (path, data, token = '') => {
    return this.data("get", path, data, token);
  };

  fetchdata = (path, data, token = '') => {
    return this.pathData("get", path, data, token);
  };

  postData = (path, data, token = '') => {
    return this.data("post", path, data, token);
  };

  putData = (path, data, token = '') => {
    return this.data("put", path, data, token);
  };

  deleteData = (path, data, token = '') => {
    return this.data("delete", path, data, token);
  };

  patchData = (path, data, token = '') => {
    return this.data("patch", path, data, token);
  };

  // getExternalAPIData = (path, data, token = '') => {
  //   return this.externalData(url, method, header);
  // }

  uploadForm = async (path, fd, user_token = '') => {
    const token = localStorage.getItem('token');
    // let access_token = '';
    if (_.isNull(token)) {
      token = '';
    }
    const url = this.url + path;
    try {
      const response = await axios.post(url, fd, {
        headers: {
          Authorization: token.length > 0 ? `Bearer ${token}` : `Bearer`,
          Accept: "application/json",
        },
      });
      // let response = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: token.length > 0 ? `Bearer ${token}` : `Bearer`,
      //     Accept: "application/json",
      //   },
      //   body: fd
      // })
      return response;
    } catch (error) {
      return error.response;
    }
  }
}



