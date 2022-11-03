// 在发起真正的ajax请求之前
// ajaxPrefilter函数会被调用
// 
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})