'use strict';
var fun =
{
    a01: function (username, password) {
        $('#inputuin').val(username)
        $('#pp').val(password)
        $("#auto_login_in_five_days_pwd").prop("checked", true); 
        $('#btlogin').click()
    }   
}