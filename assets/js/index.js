$(function () {
    // 渲染用户基本信息
    getUserInfo()

    let layer = layui.layer
    // 实现退出功能
    $('#btnLogout').click(function (e) {
        e.preventDefault()

        layer.confirm('is not?', function (index) {
            //do something
            // 清空token字符串
            localStorage.removeItem('token')
            // 退回登陆界面
            location.href = './login.html'
            layer.close(index);
        });
    })

    
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // // 添加headers验证
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像信息
            // console.log(res.data);
            renderAvatar(res.data)    
        },
        // // 控制用户访问权限，不管success还是error
        // // 都会调用complete
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         // 清空token字符串
        //         localStorage.removeItem('token')
        //         // 强制跳转登录界面
        //         location.href = './login.html'
        //     }
        // } 
    })
}

// 定义渲染用户头像函数
function renderAvatar(user) {
    // 1.获取用户的名称
    let name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎' + name)
    // 3.渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文字头像
        let first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar')
            .html(first)
            .show()
    }
}