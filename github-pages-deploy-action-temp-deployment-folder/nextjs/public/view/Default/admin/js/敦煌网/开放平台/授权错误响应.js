'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        this.a02();
    },
    a02: function () {
        Tool.header02.a01(obj.arr[3], this.a03, this);
    },
    a03: function (header, fromid, username, token) {
        let html = header + '\
        <div class="p-2">\
        <table class="table table-hover">\
          <thead class="table-light">\
            <tr>\
              <th>错误码</th>\
              <th>错误详细描述</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>exception_oauth_service</td>\
              <td>oauth2.0授权服务异常,请联系管理员!</td>\
            </tr>\
            <tr>\
              <td>expired_access_token</td>\
              <td>提供的Access Token无效或已过期</td>\
            </tr>\
            <tr>\
              <td>expired_refresh_token</td>\
              <td>提供的Refresh Token已过期或者无效</td>\
            </tr>\
            <tr>\
              <td>invalid_authorization_code</td>\
              <td>Authorization Code无效(一个授权码只能使用一次)或者与获取Authorization Code时提供的不一致或者已经过期</td>\
            </tr>\
            <tr>\
              <td>invalid_client</td>\
              <td>请检查client_id是否存在，或者client_secret是否正确!</td>\
            </tr>\
            <tr>\
              <td>invalid_clientid</td>\
              <td>无效的client_id，请检查提供的client_id是否正确!</td>\
            </tr>\
            <tr>\
              <td>invalid_http_protocol</td>\
              <td>非法请求协议,请使用https请求协议</td>\
            </tr>\
            <tr>\
              <td>invalid_http_server</td>\
              <td>非法请求地址，请使用https://secure.dhgate.com</td>\
            </tr>\
            <tr>\
              <td>invalid_redirect_uri</td>\
              <td>redirect_uri所在的根域与开发者注册应用时所填写的根域名不匹配</td>\
            </tr>\
            <tr>\
              <td>invalid_request</td>\
              <td>请检查请求参数是否包含一个不支持的参数或参数值，或者格式不正确!</td>\
            </tr>\
            <tr>\
              <td>invalid_scope</td>\
              <td>请求的scope参数是无效的、未知的、格式不正确的、或所请求的权限范围超过了数据拥有者所授予的权限范围</td>\
            </tr>\
            <tr>\
              <td>invalid_user</td>\
              <td>用户名或密码无效，请检查是否正确!</td>\
            </tr>\
            <tr>\
              <td>unauthorized_client</td>\
              <td>应用没有被授权，无法使用所指定的grant_type</td>\
            </tr>\
            <tr>\
              <td>unsupported_grant_type</td>\
              <td>grant_type敦煌OAuth2.0授权服务不支持该参数</td>\
            </tr>\
            <tr>\
              <td>unsupported_response_type	</td>\
              <td>response_type敦煌OAuth2.0授权服务不支持该参数</td>\
            </tr>\
            <tr>\
              <td class="right">来源：</td>\
              <td><a href="https://open.dhgate.com/docs/api/auth-error-response" target="_blank">https://open.dhgate.com/docs/api/auth-error-response</a>（授权错误响应）</td>\
            </tr>\
          </tbody>\
        </table>\
        </div>'
        Tool.html(null, null, html);
    }
}
fun.a01();