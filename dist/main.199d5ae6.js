// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".site-list");
var $lastLi = $siteList.find("li.last"); // 读取 localStorage 中 site 键的值
var site = localStorage.getItem("site"); // 将值转化为对象
var siteObject = JSON.parse(site);
var hashMap = siteObject || [
// 默认总是存在 || 后的网址
{ logo: "A", url: "https://www.acfun.cn" }, { logo: "B", url: "https://www.bilibili.com" }, { logo: "J", url: "https://juejin.cn/user/3413315881539149" }, { logo: "Z", url: "https://www.zhihu.com/" }];
var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(".com", "").replace(".cn", "").replace(".html", "").replace(/\/.*/, "") // 删除 / 之后的所有内容\
  .replace(/^\S/, function (s) {
    return s.toUpperCase();
  }); // 首字母大写
};

var render = function render() {
  $siteList.find("li:not(.last)").remove(); //注意 :not 之间没有空格
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n      <div class=\"site\">\n        <div class=\"logo\">" + node.logo + "</div>\n        <div class=\"link\">" + simplifyUrl(node.url) + "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-close\"></use>\n          </svg></div>\n      </div>\n    </li>").insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render(); // 删掉后重新渲染
    });
  });
};

render();

$(".addButton").on("click", function () {
  var url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});
window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("site", string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.199d5ae6.map