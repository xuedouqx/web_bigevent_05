$(function() {
    $("#link_reg").on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $("#link_login").on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pass = $("#repwdxd").val()
                // console.log(pass);
            if (value !== pass) {
                return '两次密码输入不一致';
            }
        }
    });

    // 注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                // 模拟人的点击事件
                $('#link_login').click();
                // 重置表单
                $('#form_reg')[0].reset();
            }
        });
    })


    // 登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜你，登录成功！');
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台首页
                location.href = '/index.html';
            }
        });
    })
})