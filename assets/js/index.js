$(function() {
    getUserInfo();

    // tuichu
    var layer = layui.layer;
    $("#btnLogout").on("click", function() {

        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = '/login.html';
            layer.close(index);
        });
    })
});


// 获取用户信息
function getUserInfo() {
    // fasong  ajax 
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功，渲染用户头像
            renderAvatar(res.data);
        }
    })
}

// 封装用户头像渲染函数
function renderAvatar(user) {
    // huoqu 用户名
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    // touxiang 
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic);
        $(".user-avatar").hide();
    } else {
        // wu
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}