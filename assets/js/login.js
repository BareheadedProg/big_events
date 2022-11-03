$(function () {
    // 绑定点击 去注册 事件
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 绑定点击 去登录 事件
    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form
    let layer = layui.layer
    // 自定义表单验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value拿到表单内的值
            // 判断password是否一致
            // 如果不一致则返回消息
            let pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次输入不一致'
            }
        }
    })

    // 发起注册用户的ajax请求
    // 绑定提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起POST请求
        let data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            // 模拟点击 去登陆
            $('#link_login').click()
        })
    })

    // 发起登录的ajax请求
    // 绑定提交登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                // 将token字符串存到本地
                localStorage.setItem('token', token)
                // 跳转后台主页
                location.href = './index.html'
            }
        })
    })

})