/**
 * Created by Administrator on 2018/1/22.
 */
import React from 'react';

export  default class HttpFetchUtil extends React.Component {
    /**
     * @param server
     * @param url
     * @param params
     * @param callback
     */
    static sendGet(url, params, callback) {
        let request;
        let full_url = url;
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (full_url.search(/\?/) === -1) {
                full_url += '?' + paramsArray.join('&')
            } else {
                full_url += '&' + paramsArray.join('&')
            }
        }
        request = new Request(full_url, {
            method: 'GET',
            headers: ({
                'Content-Type': 'application/json',
            })
        });
    fetch(request)
            .then((response) => response.json())
            .then((jsonData) => {
                callback(jsonData);
            }).catch((err) => {
            if (err == 'timeout') {
                callback({statusCode: -1, message: err.message});
            } else {
                callback({statusCode: -1, message: err.message});
            }
        });
    }
}
