import http from 'http';
import Promise from 'bluebird';

export let Methods = {
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
  post: 'POST'
};

export function makeRequest(host, path, port, method, headers, data) {
  let options = {
    host: host,
    path: path,
    port: port,
    method: method,
    headers: headers
  };
  
  return new Promise((resolve) => {
    let cb = (response) => {
      var str = '';

      response.on('data', (chunk) => {
        str += chunk;
      });

      response.on('end', () => {
        resolve(str);
      });
    };

    let request = http.request(options, cb);
    if (data) request.write(data);
    request.end();
  });
}
