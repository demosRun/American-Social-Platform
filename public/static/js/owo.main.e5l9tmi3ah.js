// Mon Jul 15 2019 08:14:26 GMT+0800 (GMT+08:00)

window.onresize = function () {
  changeDecorate(document.getElementsByClassName(owo.entry)[0]);
}; // $(window).on("touchmove", function(e) {
//   e.preventDefault()
// })


var ms = null;

function changeDecorate($el) {
  if (!$el) return;

  var sw = document.body.offsetWidth / 750;
  var sh = document.body.offsetHeight / 1508;
  ms = sw > sh ? sh : sw; // 获取页面安全区

  var safety = $el.querySelectorAll('.safety')[0];
  safety.style.transform = "scale(".concat(ms, ")");

  if (sw > sh) {
    safety.style.top = "".concat(-1508 / 2 * (1 - sh), "px");
    safety.style.left = "".concat(-750 / 2 * (1 - sw), "px");
  } else {
    safety.style.top = "".concat(-1508 / 2 * (1 - sh), "px");
    safety.style.left = "".concat(-750 / 2 * (1 - sw), "px");
  }
} // 窗口大小改变自动刷新页面


$(window).on("orientationchange", function () {
  if (window.orientation != 0) {
    alert("建议锁定屏幕后竖屏浏览");
    location.reload();
  }
});

// 存储页面基本信息
var owo = {
  // 页面默认入口
  entry: "one",
  // 全局方法变量
  tool: {},
  // 框架状态变量
  state: {}
};
/*
  存储每个页面的函数
  键名：页面名称
  键值：方法列表
*/

owo.script = {
  "one": {
    "data": {
      "canFlay": false
    },
    "created": function created() {
      var _this = this;

      // 3秒后出现飞机
      setTimeout(function () {
        // owo.go('two', 'moveToRight', 'moveFromLeft')
        owo.state.start = true;
        _this.query('.title3')[0].style.display = 'block';
        _this.query('.title4')[0].style.opacity = 1;
      }, 2500); // 计算长宽比例

      changeDecorate(this.$el); // 获取起飞按钮实例

      var bar = this.query('.bar')[0]; // 滑动起飞

      owo.tool.touch({
        el: this.query('.title3')[0],
        end: function end(e) {
          if (_this.data.canFlay) {
            bar.style.left = '245px';

            _this.flay();
          } else {
            bar.style.left = '-25px';
          }
        },
        moveing: function moveing(e) {
          var x = e.clientX / ms;

          if (x > 210 && x < 480) {
            bar.style.left = (e.clientX - 110) / ms + 'px';

            if (x > 380) {
              _this.data.canFlay = true;
            }
          }
        }
      });
    },
    "flay": function flay() {
      this.query('.title4')[0].classList.add('flay'); // owo.state.start = true
      // 等待1秒进入第二页

      setTimeout(function () {
        owo.go('two', 'moveToLeft', 'moveFromRight');
      }, 1000);
    }
  },
  "two": {
    "data": {
      "canFlay": false
    },
    "created": function created() {
      var _this2 = this;

      // 返回首页
      if (!owo.state.start) {
        setTimeout(() => {
          location.replace('')
        }, 0)
      }
      // 注册返回方式
      owo.state.animation = {
        "in": 'moveToRight',
        "out": 'moveFromLeft'
      };
      setTimeout(function () {
        _this2.query('.flay')[0].classList.add('flaying');
      }, 1000);
      setTimeout(function () {
        _this2.query('.title3')[0].style.display = 'block';
      }, 4500);
      setTimeout(function () {
        changeDecorate(_this2.$el);
      }, 0); // 获取起飞按钮实例

      var bar = this.query('.bar')[0];
      bar.style.left = '-25px'; // 滑动起飞

      owo.tool.touch({
        el: this.query('.title3')[0],
        end: function end(e) {
          if (_this2.data.canFlay) {
            _this2.flay();
          } else {
            bar.style.left = '-25px';
          }
        },
        moveing: function moveing(e) {
          var x = e.clientX / ms;

          if (x > 210 && x < 480) {
            bar.style.left = (e.clientX - 110) / ms + 'px';

            if (x > 380) {
              _this2.data.canFlay = true;
            }
          }
        }
      });
    },
    "flay": function flay() {
      owo.go('three', 'moveToLeft', 'moveFromRight');
    }
  },
  "three": {
    "created": function created() {
      // 返回首页
      if (!owo.state.start) {
        setTimeout(() => {
          location.replace('')
        }, 0)
      }
      // 注册返回方式
      owo.state.animation = {
        "in": 'moveToRight',
        "out": 'moveFromLeft' // 计算长宽比例

      };
      changeDecorate(this.$el);
      this.ringIt(this.query('.ring-item-box')[0], 220);
    },
    "four": function four() {
      owo.go('four', 'moveToLeft', 'moveFromRight');
    },
    "five": function five() {
      owo.go('five', 'moveToLeft', 'moveFromRight');
    },
    "ringIt": function ringIt(dom, radius, centerCoordinate) {
      // 半径
      var r = radius || 10; // 中心点坐标

      var centre = centerCoordinate || [dom.clientWidth / 2, dom.clientHeight / 2]; // 子节点列表

      var childList = dom.children; // 角度

      var angle = 360 / childList.length;

      var _loop = function _loop(key) {
        if (childList.hasOwnProperty(key)) {
          var element = childList[key];
          setTimeout(function () {
            element.style.position = 'absolute';
            element.style.left = centre[0] + r * Math.cos(parseInt(key) * angle * Math.PI / 180) - element.clientWidth / 2 + 'px';
            element.style.top = centre[1] + r * Math.sin(parseInt(key) * angle * Math.PI / 180) - element.clientHeight / 2 + 'px';
          }, 0);
        }
      };

      for (var key in childList) {
        _loop(key);
      }

      console.log(childList);
    }
  },
  "four": {
    "created": function created() {
      // 返回首页
      if (!owo.state.start) {
        setTimeout(() => {
          location.replace('')
        }, 0)
      }
      // 注册返回方式
      owo.state.animation = {
        "in": 'moveToRight',
        "out": 'moveFromLeft' // 计算长宽比例

      };
      changeDecorate(this.$el); // 监听上划事件

      owo.tool.touch({
        el: this.$el,
        end: function end(e) {
          if (e.target.nodeName !== 'IMG' && e.swipe[1] < -100) {
            owo.go('six', 'moveToTop', 'moveFromBottom');
          }
        }
      });
    },
    "five": function five() {
      owo.go('five', 'moveToLeft', 'moveFromRight');
    },
    "explan": function explan(url) {
      console.log(url);
      this.template.show.show(url);
    },
    "template": {
      "show": {
        "created": function created(params) {
          var _this3 = this;

          this.$el.addEventListener("touchmove", function (e) {
            // alert('sd')
            e.stopPropagation();
          }, true);
          window.addEventListener("popstate", function (e) {
            _this3.$el.style.display = 'none';
          }, false);
        },
        "hide": function hide() {
          this.$el.style.display = 'none';
          window.history.go(-1);
        },
        "show": function show(url) {
          history.pushState(null, null, document.URL);
          this.query('img')[0].src = url;
          this.$el.style.display = 'block';
        },
        "prop": {}
      }
    }
  },
  "five": {
    "created": function created() {
      // 返回首页
      if (!owo.state.start) {
        setTimeout(() => {
          location.replace('')
        }, 0)
      }
      // 注册返回方式
      owo.state.animation = {
        "in": 'moveToRight',
        "out": 'moveFromLeft' // 计算长宽比例

      };
      changeDecorate(this.$el); // 监听上划事件

      owo.tool.touch({
        el: this.$el,
        end: function end(e) {
          if (e.target.nodeName !== 'IMG' && e.swipe[1] < -100) {
            owo.go('six', 'moveToTop', 'moveFromBottom');
          }
        }
      });
    },
    "four": function four() {
      owo.go('four', 'moveToLeft', 'moveFromRight');
    },
    "play": function play() {
      this.query('video')[0].play();
    },
    "explan": function explan(url) {
      this.template.show2.show(url);
    },
    "template": {
      "show2": {
        "created": function created(params) {
          var _this4 = this;

          this.$el.addEventListener("touchmove", function (e) {
            // alert('sd')
            e.stopPropagation();
          }, true);
          window.addEventListener("popstate", function (e) {
            _this4.$el.style.display = 'none';
          }, false);
        },
        "hide": function hide() {
          this.$el.style.display = 'none';
          window.history.go(-1);
        },
        "show": function show(url) {
          history.pushState(null, null, document.URL);
          this.query('img')[0].src = url;
          this.$el.style.display = 'block';
        },
        "prop": {}
      }
    }
  },
  "six": {
    "created": function created() {
      // 返回首页
      if (!owo.state.start) {
        setTimeout(() => {
          location.replace('')
        }, 0)
      }
      // 监听下划事件
      owo.tool.touch({
        el: this.$el,
        end: function end(e) {
          if (e.swipe[1] > 100) {
            window.history.go(-1);
          }
        }
      });
    }
  }
};

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* 方法合集 */
var _owo = {
  /* 对象合并方法 */
  assign: function assign(a, b) {
    var newObj = {};

    for (var key in a) {
      newObj[key] = a[key];
    }

    for (var key in b) {
      newObj[key] = b[key];
    }

    return newObj;
  },

  /* 运行页面初始化方法 */
  runCreated: function runCreated(pageFunction) {
    pageFunction.created.apply(_owo.assign(pageFunction, {
      data: pageFunction.data,
      activePage: window.owo.activePage
    }));
  }
  /* owo事件处理 */
  // 参数1: 当前正在处理的dom节点
  // 参数2: 当前正在处理的模块名称
  // 参数3: 当前正在处理的模块根dom

};

_owo.handleEvent = function (tempDom, templateName) {
  var activePage = window.owo.script[owo.activePage];

  if (tempDom.attributes) {
    for (var ind = 0; ind < tempDom.attributes.length; ind++) {
      var attribute = tempDom.attributes[ind]; // 判断是否为owo的事件
      // ie不支持startsWith

      if (attribute.name[0] == '@') {
        var eventName = attribute.name.slice(1);
        var eventFor = attribute.textContent;

        switch (eventName) {
          case 'show':
            {
              // 初步先简单处理吧
              var temp = eventFor.replace(/ /g, ''); // 取出条件

              var condition = temp.split("==");

              if (activePage.data[condition[0]] != condition[1]) {
                tempDom.style.display = 'none';
              }

              break;
            }

          default:
            {
              // 处理事件 使用bind防止闭包
              tempDom["on" + eventName] = function (event) {
                // 复制eventFor防止污染
                var eventForCopy = eventFor; // 判断页面是否有自己的方法

                var newPageFunction = window.owo.script[window.owo.activePage]; // console.log(this.attributes)

                if (templateName && templateName !== owo.activePage) {
                  // 如果模板注册到newPageFunction中，那么证明模板没有script那么直接使用eval执行
                  if (newPageFunction.template) {
                    newPageFunction = newPageFunction.template[templateName];
                  }
                } // 待优化可以单独提出来
                // 取出参数


                var parameterArr = [];
                var parameterList = eventForCopy.match(/[^\(\)]+(?=\))/g);

                if (parameterList && parameterList.length > 0) {
                  // 参数列表
                  parameterArr = parameterList[0].split(','); // 进一步处理参数

                  for (var i = 0; i < parameterArr.length; i++) {
                    var parameterValue = parameterArr[i].replace(/(^\s*)|(\s*$)/g, ""); // console.log(parameterValue)
                    // 判断参数是否为一个字符串

                    if (parameterValue.charAt(0) === '"' && parameterValue.charAt(parameterValue.length - 1) === '"') {
                      parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1);
                    }

                    if (parameterValue.charAt(0) === "'" && parameterValue.charAt(parameterValue.length - 1) === "'") {
                      parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1);
                    } // console.log(parameterArr[i])

                  }

                  eventForCopy = eventFor.replace('(' + parameterList + ')', '');
                } else {
                  // 解决 @click="xxx()"会造成的问题
                  eventForCopy = eventForCopy.replace('()', '');
                }

                console.log(newPageFunction, eventForCopy); // 如果有方法,则运行它

                if (newPageFunction[eventForCopy]) {
                  // 绑定window.owo对象
                  newPageFunction.$event = event;
                  newPageFunction[eventForCopy].apply(newPageFunction, parameterArr);
                } else {
                  // 如果没有此方法则交给浏览器引擎尝试运行
                  eval(eventForCopy);
                }
              };
            }
        }
      }
    }
  } // 判断是否有子节点需要处理


  if (tempDom.children) {
    // 递归处理所有子Dom结点
    for (var i = 0; i < tempDom.children.length; i++) {
      // 获取子节点实例
      var childrenDom = tempDom.children[i]; // 每个子节点均要判断是否为模块

      if (childrenDom.attributes['template'] && childrenDom.attributes['template'].textContent) {
        // 如果即将遍历进入模块 设置即将进入的模块为当前模块
        // 获取模块的模块名
        _owo.handleEvent(childrenDom, childrenDom.attributes['template'].textContent);
      } else {
        _owo.handleEvent(childrenDom, templateName);
      }
    }
  } else {
    console.info('元素不存在子节点!');
    console.info(tempDom);
  }
};

_owo.getarg = function (url) {
  // 获取URL #后面内容
  if (!url) return null;
  var arg = url.split("#");
  return arg[1] ? arg[1].split('?')[0] : null;
}; // 页面资源加载完毕事件


_owo.showPage = function () {
  // 取出URL地址判断当前所在页面
  var pageArg = _owo.getarg(window.location.hash); // 从配置项中取出程序入口


  var page = pageArg ? pageArg : owo.entry;

  if (page) {
    var entryDom = document.getElementById('o-' + page);

    if (entryDom) {
      // 显示主页面
      entryDom.style.display = 'block';
      window.owo.activePage = page;

      _owo.handlePage(window.owo.script[page], entryDom);

      _owo.handleEvent(entryDom, null);
    } else {
      console.error('入口文件设置错误,错误值为: ', entryDom);
    }
  } else {
    console.error('未设置程序入口!');
  } // 设置当前页面为活跃页面


  owo.state.newUrlParam = _owo.getarg(document.URL);
};
/*
  页面跳转方法
  参数1: 需要跳转到页面名字
  参数2: 离开页面动画
  参数3: 进入页面动画
*/


owo.go = function (pageName, inAnimation, outAnimation, backInAnimation, backOutAnimation, param) {
  owo.state.animation = {
    "in": inAnimation,
    "out": outAnimation
  };
  var paramString = '';

  if (param && _typeof(param) == 'object') {
    paramString += '?'; // 生成URL参数

    for (var paramKey in param) {
      paramString += paramKey + '=' + param[paramKey] + '&';
    } // 去掉尾端的&


    paramString = paramString.slice(0, -1);
  }

  window.location.href = paramString + "#" + pageName; // 如果有返回动画那么设置返回动画

  if (backInAnimation && backOutAnimation) {
    setTimeout(function () {
      owo.state.animation = {
        "in": backInAnimation,
        "out": backOutAnimation
      };
    }, 1000);
  }
}; // url发生改变事件


_owo.hashchange = function (e) {
  // 这样处理而不是直接用event中的URL，是因为需要兼容IE
  owo.state.oldUrlParam = owo.state.newUrlParam;
  owo.state.newUrlParam = _owo.getarg(document.URL); // console.log(owo.state.oldUrlParam, owo.state.newUrlParam)
  // 如果旧页面不存在则为默认页面

  if (!owo.state.oldUrlParam) owo.state.oldUrlParam = owo.entry;
  var newUrlParam = owo.state.newUrlParam; // 如果没有跳转到任何页面则跳转到主页

  if (newUrlParam === undefined) {
    newUrlParam = owo.entry;
  } // 如果没有发生页面跳转则不需要进行操作
  // 进行页面切换


  switchPage(owo.state.oldUrlParam, newUrlParam);
}; // ios的QQ有BUG 无法触发onhashchange事件


if (/iPhone\sOS.*QQ[^B]/.test(navigator.userAgent)) {
  window.onpopstate = _owo.hashchange;
} else {
  window.onhashchange = _owo.hashchange;
} // 隐藏旧页面，显示新页面


function dispalyEffect(oldDom, newDom) {
  if (oldDom) {
    // 隐藏掉旧的节点
    oldDom.style.display = 'none';
  } // 查找页面跳转后的page


  newDom.style.display = 'block';
} // 切换页面动画


function animation(oldDom, newDom, animationIn, animationOut) {
  // 获取父元素
  var parentDom = newDom.parentElement;

  if (!oldDom) {
    console.error('旧页面不存在!');
  }

  oldDom.addEventListener("animationend", oldDomFun);
  newDom.addEventListener("animationend", newDomFun);
  oldDom.style.position = 'absolute';
  newDom.style.display = 'block';
  newDom.style.position = 'absolute'; // document.body.style.overflow = 'hidden'

  parentDom.style.perspective = '1200px';
  oldDom.classList.add('owo-animation');
  animationIn.split(',').forEach(function (value) {
    oldDom.classList.add('o-page-' + value);
  });
  newDom.classList.add('owo-animation');
  animationOut.split(',').forEach(function (value) {
    newDom.classList.add('o-page-' + value);
  }); // 旧DOM执行函数

  function oldDomFun(e) {
    // 排除非框架引起的结束事件
    if (e.target.getAttribute('template')) {
      // 移除监听
      oldDom.removeEventListener('animationend', oldDomFun, false); // 隐藏掉旧的节点

      oldDom.style.display = 'none'; // console.log(oldDom)

      oldDom.style.position = '';
      oldDom.classList.remove('owo-animation');
      parentDom.style.perspective = ''; // 清除临时设置的class

      animationIn.split(',').forEach(function (value) {
        oldDom.classList.remove('o-page-' + value);
      });
    }
  } // 新DOM执行函数


  function newDomFun() {
    // 移除监听
    newDom.removeEventListener('animationend', newDomFun, false); // 清除临时设置的style

    newDom.style.position = '';
    newDom.classList.remove('owo-animation');
    animationOut.split(',').forEach(function (value) {
      newDom.classList.remove('o-page-' + value);
    });
  }
} // 切换页面前的准备工作


function switchPage(oldUrlParam, newUrlParam) {
  var oldPage = oldUrlParam ? oldUrlParam.split('&')[0] : owo.entry;
  var newPage = newUrlParam ? newUrlParam.split('&')[0] : owo.entry; // console.log(oldPage, newPage)

  var oldDom = document.getElementById('o-' + oldPage);
  var newDom = document.getElementById('o-' + newPage);

  if (!newDom) {
    console.error('页面不存在!');
    return;
  } // console.log(owo.state.animation)
  // 判断是否有动画效果


  if (!owo.state.animation) owo.state.animation = {}; // 直接.in会在ie下报错

  var animationIn = owo.state.animation['in'];
  var animationOut = owo.state.animation['out'];

  if (animationIn || animationOut) {
    // 如果没用动画参数则使用默认效果
    if (!animationIn || !animationOut) {
      dispalyEffect(oldDom, newDom);
      return;
    }

    owo.state.animation = {};
    animation(oldDom, newDom, animationIn, animationOut);
  } else {
    dispalyEffect(oldDom, newDom);
  }

  window.owo.activePage = newPage;

  _owo.handleEvent(newDom, null);

  _owo.handlePage(window.owo.script[newPage], newDom);
}
/*
 * 传递函数给whenReady()
 * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
 */


_owo.ready = function () {
  //这个函数返回whenReady()函数
  var funcs = []; //当获得事件时，要运行的函数
  //当文档就绪时,调用事件处理程序

  function handler(e) {
    // 确保事件处理程序只运行一次
    if (window.owo.state.isRrady) return;
    window.owo.state.isRrady = true; //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好

    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return;
    } // 运行所有注册函数


    for (var i = 0; i < funcs.length; i++) {
      funcs[i].call(document);
    }

    funcs = null;
  } //为接收到的任何事件注册处理程序


  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false);
    document.addEventListener('readystatechange', handler, false); //IE9+

    window.addEventListener('load', handler, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', handler);
    window.attachEvent('onload', handler);
  } //返回whenReady()函数


  return function whenReady(fn) {
    if (window.owo.state.isRrady) {
      fn.call(document);
    } else {
      funcs.push(fn);
    }
  };
}(); // 执行页面加载完毕方法


_owo.ready(_owo.showPage);
/**
 * 滑动检测
 * @param  {DOM} dom 需要监测的dom元素
 * @param  {number} endValue   结束数值
 */


owo.tool.touch = function (config) {
  var dom = config.el; // 判断是否已经处于监听状态

  if (dom.getAttribute("monitor") == 'touch') return;
  var start = null;
  var end = null;
  var startTarget = null; // 设置监听标识

  dom.setAttribute("monitor", "touch");
  dom.addEventListener("touchstart", function (e) {
    event = e.targetTouches[0] || e.originalEvent.targetTouches[0];
    startTarget = e.target;
    start = end = [event.clientX, event.clientY];
    if (config.start) config.start(event);
  }, false);
  dom.addEventListener("touchmove", function (e) {
    event = e.targetTouches[0] || e.originalEvent.targetTouches[0];
    end = [event.clientX, event.clientY];
    if (config.moveing) config.moveing(event);
  }, false);
  dom.addEventListener("touchend", function (e) {
    if (config.end) {
      config.end({
        target: startTarget,
        start: start,
        end: end,
        swipe: [end[0] - start[0], end[1] - start[1]]
      });
    }
  }, false);
};
/* 运行页面所属的方法 */


_owo.handlePage = function (newPageFunction, entryDom) {
  newPageFunction['$el'] = entryDom; // 快速选择器

  newPageFunction['query'] = function (str) {
    return this.$el.querySelectorAll(str);
  };
  /* 判断页面是否有自己的方法 */


  if (!newPageFunction) return; // console.log(newPageFunction)
  // 如果有created方法则执行

  if (newPageFunction.created) {
    _owo.runCreated(newPageFunction);
  } // 判断页面是否有下属模板,如果有运行所有模板的初始化方法


  for (var key in newPageFunction.template) {
    var templateScript = newPageFunction.template[key]; // 待修复,临时获取方式,这种方式获取到的dom不准确

    var childDom = entryDom.querySelectorAll('[template="' + key + '"]')[0]; // 递归处理

    _owo.handlePage(templateScript, childDom);
  }
};