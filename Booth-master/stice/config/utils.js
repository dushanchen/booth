/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {

	Vue.filter('formatDateTime', function (value) {
        if ($.trim(value) == '') {
            return "";
        }
        return $.format.date(new Date(value), "yyyy-MM-dd HH:mm");
    });

	Vue.filter('formatDate', function (value) {
		if ($.trim(value) == '') {
			return "";
		}
	    return $.format.date(new Date(value), "yyyy-MM-dd");
	});

	Vue.filter('formatFee4Free', function (value) {
		if (value == 0) {
			return "免费"
		} else {
			return "￥" + value;
		}
	});


    Vue.filter('formatImg80x80', function (value) {
        return formatImg(value, 80, 80);
    });
    Vue.filter('formatImg96x30', function (value) {
        return formatImg(value, 96, 30);
    });
    Vue.filter('formatImg116x116', function (value) {
        return formatImg(value, 116, 116);
    });
    Vue.filter('formatImg93x178', function (value) {
        return formatImg(value, 93, 178);
    });
    Vue.filter('formatImg279x297', function (value) {
        return formatImg(value, 279, 297);
    });
    Vue.filter('formatImg370x370', function (value) {
        return formatImg(value, 370, 370);
    });
    Vue.filter('formatImg54x54', function (value) {
        return formatImg(value, 54, 54);
    });
    Vue.filter('formatImg165x167', function (value) {
        return formatImg(value, 165, 167);
    });
    Vue.filter('formatImg750x255', function (value) {
        return formatImg(value, 750, 255);
    });
    Vue.filter('formatImg220x220', function (value) {
        return formatImg(value, 220, 220);
    });
    Vue.filter('formatImg136x136', function (value) {
        return formatImg(value, 136, 136);
    });
    Vue.filter('formatImg150x150', function (value) {
        return formatImg(value, 150, 150);
    });

    Vue.filter('formatImg156x156', function (value) {
        return formatImg(value, 156, 156);
    });
    Vue.filter('formatImg73x73', function (value) {
        return formatImg(value, 73, 73);
    });
    Vue.filter('formatImg180x180', function (value) {
        return formatImg(value, 180, 180);
    });
    Vue.filter('formatImg375x375', function (value) {
        return formatImg(value, 375, 375);
    });
    Vue.filter('formatImg368x368', function (value) {
        return formatImg(value, 368, 368);
    });
    Vue.filter('formatImg750x621', function (value) {
        return formatImg(value, 750, 621);
    });
    Vue.filter('formatImg1500x1500', function (value) {
        return formatImg(value, 1500, 1500);
    });
    Vue.filter('formatImg750x274', function (value) {
        return formatImg(value, 750, 274);
    });
    Vue.filter('formatImg93x178', function (value) {
        return formatImg(value, 93, 178);
    });
    Vue.filter('formatImg160x160', function (value) {
        return formatImg(value, 160, 160);
    });
    Vue.filter("formatImg139x120", function (value) {
        return formatImg(value, 139, 120);
    });

    Vue.filter("formatImg412x180", function (value) {
        return formatImg(value, 412, 180);
    });

    Vue.filter("formatImg345x130", function (value) {
        return formatImg(value, 345, 130);
    });

    Vue.filter("formatJpg", function (value) {
        if (value) {
            return config.ALI_OSS_GATEWAY + "/" + value + "?x-oss-process=image/format,jpg";
        }
    });

    Vue.filter('formatFee', function (value) {
        if (value) {
            return (value/100).toFixed(2);
        } else {
            return 0;
        }
    });

    function formatImg(val, width, height) {
       if (!val) {
          return null;
       }
       if (val.indexOf("http") != -1) {
           return val;
       }
       var url = config.ALI_OSS_GATEWAY + "/" + val + "?x-oss-process=image/resize,";
       if (width) {
           url += "w_" + width + ",";
       }
       if (height) {
           url += "h_" + height + ",";
       }
       url = url.substring(0, url.length -1);
       return url;
    }

    Vue.filter('formatSex', function (value) {
        if (value == 0) {
            return "保密";
        }else if(value == 1){
            return "男";
		}else {
            return "女";
        }
    });

	var Utils = {
		getUrlParam: function(key) {
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		},
		auth: function(callback) {
			if ($.trim($.cookie("tk"))== '') {
				var backurl = encodeURIComponent(window.location.href);
				window.location = Utils.webGateway() + "/login.html?backurl=" + backurl;
			} else {
				callback();
			}
		},
		webGateway: function() {
			var location = window.location;
			if (config.IS_DEBUG) {
				if (location.port != '') {
					return location.protocol + "//" + location.hostname + ":" + location.port;
				}
				return location.protocol + "//" + location.hostname;
			} else {
				var location = window.location;
				return location.protocol + "//" + location.hostname;
			}
		},
		isPhone: function(phone) {
			if ($.trim(phone) == '') {
				return false;
			}
			return (/^1[34578]\d{9}$/.test(phone));
		},
		isEmail: function(email) {
			if ($.trim(email) == '') {
				return false;
			}
			var reg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
			return reg.test(email);
		},
		inputValidate: function() {
			var pass = true;
			$("input").each(function(i, el) {
				Utils.inputClean(el);
				var required = $(el).attr("required");
				if (required) {
					var value = $.trim($(el).val());
					if (value == '') {
						Utils.inputFailed(el);
						pass = false;
						return pass;
					} else {
						if ($(el).attr("type") == "email") {
							if (!Utils.isEmail(value)) {
								Utils.inputFailed(el);
								pass = false;
								return false;
							}
						}
						Utils.inputSuccess(el);
					}
				}
			});
			if (pass) {
				$("select").each(function(i, el) {
					Utils.inputClean(el);
					var required = $(el).attr("required");
					if (required) {
						var value = $.trim($(el).val());
						if (value == '' || value == '-1') {
							var other = $(el).closest("div").find(".other-input");
							if (other && $.trim(other.val()) == '') {
								$(el).closest(".form-group").addClass("has-error");
								$(el).closest(".form-group").find(".help-block").show();
								$(el).focus();
								$("#api-help-block").text($(el).find("option:selected").text());
								$("#api-help-block").css("color", "red");
								$("#api-help-block").show();
								pass = false;
								return pass;
							}
						}
					}
				});
			}
			if (pass) {
				$("textarea").each(function(i, el) {
					Utils.inputClean(el);
					var required = $(el).attr("required");
					if (required) {
						var value = $.trim($(el).val());
						if (value == '') {
							$(el).closest(".form-group").addClass("has-error");
							$(el).closest(".form-group").find(".help-block").show();
							$(el).focus();
							pass = false;
							return pass;
						}
					}
				});
			}
			return pass;
		},
		inputChange: function(e) {
			var input = null;
			if (e instanceof Event) {
				input = $(e.target);
			} else {
				input = $(e);
			}
			Utils.inputClean(input);
			if (input.attr("required")) {
				if ($.trim(input.val())== '') {
					Utils.inputFailed(input);
					return false;
				} else {
					if (input.attr("type") == "email") {
						if (!Utils.isEmail($.trim(input.val()))) {
							Utils.inputFailed(input);
							return false;
						}
					}
					Utils.inputSuccess(input);
					return true;
				}
			}
		},
		inputSuccess: function(input) {
			var i = $(input).closest("span").find("i");
			i.removeClass("fa-times-circle");
			i.addClass("fa-check-circle");
			i.css("color", "green");
		},
		inputFailed: function(input) {
			var i = $(input).closest("span").find("i");
			i.removeClass("fa-check-circle");
			i.addClass("fa-times-circle");
			i.css("color", "red");
			i.closest(".form-group").addClass("has-error");
			i.closest(".form-group").find(".help-block").show();
			$(input).focus();
		},
		inputClean: function(input) {
			var i = $(input).closest("span").find("i");
			if (i) {
				i.removeClass("fa-times-circle");
				i.removeClass("fa-check-circle");
			}
			$(input).closest(".form-group").removeClass("has-error");
			$(input).closest(".form-group").find(".help-block").hide();
		},
        formatImg: function(val, width, height) {
            if (!val) {
                return null;
            }
            if (val.indexOf("http") != -1) {
                return val;
            }
            var url = config.ALI_OSS_GATEWAY + "/" + val + "?x-oss-process=image/resize,";
            if (width) {
                url += "w_" + width + ",";
            }
            if (height) {
                url += "h_" + height + ",";
            }
            url = url.substring(0, url.length -1);
            return url;
        }
	}

    window.Utils = Utils;
})();

(function () {
    Vue.component('swipe-cell', {
        template: '<a\
    @click="swipeMove()"\
    @touchstart="startDrag"\
    @touchmove="onDrag"\
    @touchend="endDrag"\
       class="swipe-cell"\
       ref="cell"\
       >\
       <div class="swipe-cell-right">\
       <div\
         ref="right"\
         slot="right"\
         class="swipe-cell-buttongroup"\
       >\
       <a\
         class="swipe-cell-button" \
         v-for="btn in right"\
         :style="btn.style"\
         @click.stop="btn.handler && btn.handler(indexs), swipeMove()"\
         v-html="btn.content"></a>\
       </div>\
       </div>\
       <div  class="swipe-cell-left">\
       <div\
       ref="left"\
       slot="left"\
       class="swipe-cell-buttongroup">\
       <a\
         class="swipe-cell-button" \
         v-for="btn in left"\
         :style="btn.style"\
         @click.stop="btn.handler && btn.handler(indexs), swipeMove()"\
         v-html="btn.content"></a>\
       </div>\
       </div>\
       <div ref="content" class="swipe-content">\
       <slot></slot>\
       </div>\
    </a>',

        data:function (){
            return {
                start: { x: 0, y: 0 }
            }
        },
        props: {
            left: Array,
            right: Array,
            indexs: Array,

        },
        mounted:function () {
			this.wrap = this.$refs.content;
            this.leftElm = this.$refs.left;
            this.rightElm = this.$refs.right;
            this.leftWrapElm = this.leftElm.parentNode;
            this.rightWrapElm = this.rightElm.parentNode;
            this.leftWidth = this.leftElm.getBoundingClientRect().width;
            this.rightWidth = this.rightElm.getBoundingClientRect().width;

            this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
            this.rightDefaultTransform = this.translate3d(this.rightWidth);

            this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
            this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
        },
        methods: {
            resetSwipeStatus: function() {
                this.swiping = !1,
                    this.opened = !0,
                    this.offsetLeft = 0
            },
            translate3d: function(t) {
                return "translate3d(" + t + "px, 0, 0)"
            },
            swipeMove: function(t) {
                void 0 === t && (t = 0),
                    this.wrap.style.webkitTransform = this.translate3d(t),
                    this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + t),
                    this.leftWrapElm.style.webkitTransform = this.translate3d( - this.leftWidth + t),
                t && (this.swiping = !0)
            },
            swipeLeaveTransition: function(t) {
                var e = this;
                setTimeout(function() {
                        return e.swipeLeave = !0,
                            t > 0 && -e.offsetLeft > .4 * e.rightWidth ? (e.swipeMove( - e.rightWidth), void e.resetSwipeStatus()) : t < 0 && e.offsetLeft > .4 * e.leftWidth ? (e.swipeMove(e.leftWidth), void e.resetSwipeStatus()) : (e.swipeMove(0), void n.i(i.c)(e.wrap, "webkitTransitionEnd",
                                function(t) {
                                    e.wrap.style.webkitTransform = "",
                                        e.rightWrapElm.style.webkitTransform = e.rightDefaultTransform,
                                        e.leftWrapElm.style.webkitTransform = e.leftDefaultTransform,
                                        e.swipeLeave = !1,
                                        e.swiping = !1
                                }))
                    },
                    0)
            },
            startDrag: function(t) {
                t = t.changedTouches ? t.changedTouches[0] : t,
                    this.dragging = !0,
                    this.start.x = t.pageX,
                    this.start.y = t.pageY
            },
            onDrag: function(t) {
                if (this.opened) return ! this.swiping && this.swipeMove(0),
                    void(this.opened = !1);
                if (this.dragging) {
                    var e, n = t.changedTouches ? t.changedTouches[0] : t,
                        i = n.pageY - this.start.y,
                        a = this.offsetLeft = n.pageX - this.start.x;
                    if (! (a < 0 && -a > this.rightWidth || a > 0 && a > this.leftWidth || a > 0 && !this.leftWidth || a < 0 && !this.rightWidth)) {
                        var s = Math.abs(i),
                            o = Math.abs(a);
                        e = !(o < 5 || o >= 5 && s >= 1.73 * o),
                        e && (t.preventDefault(), this.swipeMove(a))
                    }
                }
            },
            endDrag: function() {
                this.swiping && this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1)
            }
        }
    })

})();
