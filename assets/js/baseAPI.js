// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
var baseURL = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function(options) {

    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = baseURL + options.url
        // console.log(options.url);


    // 需要权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //判断身份
    options.complete = function(res) {
        // console.log(res);
        // console.log('执行了回调函数complete');
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem("token");
            location.href = '/login.js';
        }

    }
});