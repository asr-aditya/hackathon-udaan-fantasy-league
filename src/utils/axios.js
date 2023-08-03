const { slug } = require('../config/config');

const apiMethods = {
  get: 'get',
  put: 'put',
  patch: 'patch',
  post: 'post',
};

const subUrls = {
  getOneUser: 'other-app/',
  accessTokenVerification: 'other-app/access-token',
  getOneVendor: 'vendor/',
  getUserWithAdditionalRole: 'other-app/fetch-users-by-batch',
};

const getAxiosConfig = (headers, method, url, body, params) => {
  const config = { headers: {} };
  if (headers) {
    config.headers = headers;
  }
  config.headers.slug = slug;
  if (method) {
    config.method = method;
  }
  if (url) {
    config.url = url;
  }
  if (body) {
    config.data = body;
  }
  if (params) {
    const query = Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
    config.url = `${config.url}?${query}`;
  }

  return config;
};

module.exports = { apiMethods, subUrls, getAxiosConfig };
