$(function () {
    let form = layui.form
    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧相同'
            }
        },
        confirm: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '密码不一致'
            }
        }
    })

    // 重置表单
    $('#btnRst').click(function (e) {
        e.preventDefault()
        $('.layui-form')[0].reset()
    })

    // 发起修改密码请求
    $('.layui-form').on('submit', function (e) {
        // 表单提交一定要阻止默认行为！！！！！！
        // 一定要加形参e！！！！！！
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})