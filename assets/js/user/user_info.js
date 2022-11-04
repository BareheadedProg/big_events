$(function () {
    let layer = layui.layer
    let form = layui.form
    // 自定义校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '1-6'
            }
        }
    })


    initUserInfo()
    // 获取用户基本信息
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 实现表单的重置效果
    $('#btnRst').click(function (e) {
        // 阻止表单的默认行为
        e.preventDefault()
        // 重新渲染表单
        initUserInfo()
    })

    // 发起更新用户信息的请求
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg('fail')
                }
                layer.msg('ok')
                // 重新渲染用户头像
                // 调用父页面节点的函数
                window.parent.getUserInfo()
            }
        })
    })

})