/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
    var config = {
        IS_DEBUG: false,// 是否调试模式,线上为 false
        APP_ID: 10001,
        ACCESS_TOKEN: "sj5JanMJgkd5zq+Yj83p7ExIrf3LpTy/LIk2OAfipcaFhiBD1Ro4+Q5lue7byD/z5ZRS+AUG9tJrMHtFVolygA==",
        API_GATEWAY: 'http://api.mildland.cn',
        ALI_OSS_GATEWAY: 'http://alioss.mildland.cn',
        COOKIE_DOMAIN: ".mildland.cn",
        PAGE_SIZE: 10
    };

    if (config.IS_DEBUG) {
        // 配置测试相关信息
        config.API_GATEWAY = 'http://api.mildland.cn';
        //config.API_GATEWAY = 'http://localhost:8080';
        config.COOKIE_DOMAIN = null;
        config.USER_TOKEN = "wUkMhTchUyqBA+gO5NSQwdVVDOJ9Kdv2D7qF0PHjITaxXz+YMyfDYGjLwJDbJ49f";
    }
    window.config = config;


    var loading = $("#xedu-loading");
    function ajaxSend(options) {
        $.ajax({
            type : options.type,
            url : options.url,
            dataType : 'json',
            data: JSON.stringify(options.data),
            contentType : 'application/json',
            processData : false,
            beforeSend : function(XMLHttpRequest) {
                console.log($.cookie('utk'));
                console.log($.cookie('utk') || (config.IS_DEBUG ? config.USER_TOKEN : null));
                XMLHttpRequest.setRequestHeader("utk",$.cookie('utk') || (config.IS_DEBUG ? config.USER_TOKEN : null));
                XMLHttpRequest.setRequestHeader("appId", config.APP_ID);
                XMLHttpRequest.setRequestHeader("atk", config.ACCESS_TOKEN);
                if (options.showLoading) {
                    loading.show();
                }
                if (options.el) {
                    $(options.el).hide();
                }
            },
            success : options.callback,
            error : function(xhr, status, error) {
                console.log("status: " + status + ", error: " + error);
            },
            complete : function(xhr, status) {
                if (options.showLoading) {
                    setTimeout(function() {
                        loading.hide();
                    }, 100);
                }
                if (options.el) {
                    $(options.el).show();
                }
            }
        });
    }

    var Api = {
        get : function(url, callback, el, showLoading) {
            var options = {
                "type" : "GET",
                "url" : url,
                "callback" : callback,
                "showLoading" : showLoading == null ? true : showLoading,
                "el": el
            }
            ajaxSend(options);
        },
        put : function(url, data, callback, el, showLoading) {
            var options = {
                "type" : "PUT",
                "url" : url,
                "callback" : callback,
                "data": data,
                "showLoading" : showLoading == null ? true : showLoading,
                "el": el
            }
            ajaxSend(options);
        },
        post : function(url, data, callback, el, showLoading) {
            var options = {
                "type" : "POST",
                "url" : url,
                "callback" : callback,
                "data":data,
                "showLoading" : showLoading == null ? true : showLoading,
                "el": el
            }
            ajaxSend(options);
        },
        del : function(url, callback, el, showLoading) {
            var options = {
                "type" : "DELETE",
                "url" : url,
                "callback" : callback,
                "showLoading" : showLoading == null ? true : showLoading,
                "el": el
            }
            ajaxSend(options);
        },
        upload: function(url, form, callback, showLoading) {
            var formData = null;
            if (form instanceof FormData) {
                formData = form;
            } else {
                formData = new FormData($(form)[0]);
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend : function(XMLHttpRequest) {
                    //XMLHttpRequest.setRequestHeader("utk", $.cookie("utk"));
                    XMLHttpRequest.setRequestHeader("utk",$.cookie('utk') || (config.IS_DEBUG ? config.USER_TOKEN : null));
                    XMLHttpRequest.setRequestHeader("appId", config.APP_ID);
                    XMLHttpRequest.setRequestHeader("atk", config.ACCESS_TOKEN);
                    if (showLoading) {
                        loading.show();
                    }
                },
                success: function (e) {
                    callback(e);
                },
                error: function (e) {
                    console.log(e);
                },
                complete : function(xhr, status) {
                    if (showLoading) {
                        setTimeout(function() {
                            loading.hide();
                        }, 100);
                    }
                }
            });
        },
        changetime:function (shijianchuo) { //时间戳转换成时间
            function add0(m){return m<10?'0'+m:m };
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+'-'+add0(mm)+'-'+add0(s);
        },
        changetime1:function (shijianchuo) { //时间戳转换成时间
            function add0(m){return m<10?'0'+m:m };
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+add0(d);
        },
        changetime2:function (shijianchuo) {//mm-dd hh:mm
            function add0(m){return m<10?'0'+m:m };
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
        }
    }

// vue.filter('formatatImg96x30',function(value){
//   if(value){
//        return config.ALI_OSS_GATEWAY + '/' + value + '?x-oss-process=image/resize,w_96,h_30';
//   }
// });

    window.Api = Api;

    var Utils = {
        getUrlParam: function (key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    }

    window.Utils = Utils;

    // 微信分享
    // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
    var WxShare = {
        doShare: function(title, desc, url, img) {
            var curl = window.location.href.split("#")[0]; //当前url
            url = url || curl; // 如果未传入目标url,默认为分享当前url
            title = title || $("title").text();
            desc = desc || "MILDLAND公益商城,一家主做公益的商城";
            img = img || config.ALI_OSS_GATEWAY + "/201803301356375163?x-oss-process=image/resize,w_80,h_80";
            Api.get(config.API_GATEWAY + "/share/wx/jsapi?url=" + encodeURIComponent(url), function(e) {
                if (e.code == 0) {
                    wx.config({
                        debug: false,
                        appId: e.data.appId,
                        timestamp: e.data.timestamp,
                        nonceStr: e.data.nonceStr,
                        signature: e.data.signature,
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
                            'onMenuShareWeibo', 'onMenuShareQZone']
                    });
                    var share = {
                        'imgUrl': img,
                        'desc': desc,
                        'title': title,
                        'link': url,
                        'success': function(e) {

                        },
                        'cancel': function(e) {

                        }
                    };
                    wx.ready(function() {// 微信验证成功
                        wx.onMenuShareTimeline(share);
                        wx.onMenuShareAppMessage(share);
                        wx.onMenuShareQQ(share);
                        wx.onMenuShareWeibo(share);
                        wx.onMenuShareQZone(share);
                    });

                    wx.error(function(err) {// 微信验证失败
                        console.warn(err);
                    })
                }
            })
        }
    }

    window.WxShare = WxShare;

    // 微信公众号登录
    var tk = $.cookie("utk");
    if (config.IS_DEBUG && !tk) { // 本地开发模式且无token
        tk = config.USER_TOKEN
    }
    if (tk) { // 如果存在用户token,则无需经公众号登录
        return;
    } else { // 用户尚未登录，经公众号验证登录
        var path = encodeURIComponent(window.location.pathname);
        if (path.indexOf("accoutRefister") > 0 && Utils.getUrlParam("code")) { // 微信公众号同手机绑定页
            return;
        } else { // 非绑定页
            var turl = encodeURIComponent(window.location.href);
            $.cookie("turl", turl); // 将目标页放入cookie,登录成功后去往目标页
            var ruri = "http://m.mildland.cn/html/login/accoutRefister.html"; // 微信公众号授权成功后回调页
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx77f59c4a09b426c5"
                + "&redirect_uri=" + ruri + "&response_type=code&scope=snsapi_userinfo&state=" + new Date().getTime();
            window.location = url;
        }
    }

})();
