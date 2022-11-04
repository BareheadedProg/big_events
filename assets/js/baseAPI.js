// 在发起真正的ajax请求之前
// ajaxPrefilter函数会被调用
// 
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 判断是否需要添加token字符串--请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 控制用户访问权限，不管success还是error
    // 都会调用complete
    options.complete = function (res) {
        // '身份认证失败！'中带有惊叹号，而且必须是中文的字符串！！！！！！！！
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空token字符串
            localStorage.removeItem('token')
            // 强制跳转登录界面
            location.href = './login.html'
        }
    }
})