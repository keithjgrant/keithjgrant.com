/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindListeners;
function bindListeners() {
  document.body.addEventListener('click', function(e) {
    if (!e.target.matches('.js-tab, .js-tab *')) {
      return;
    }
    e.preventDefault();
    clearActiveTabs();
    const button = findButton(e.target);
    activateTab(button);
    return false;
  });
}

function findButton(el) {
  if (el.classList.contains('js-tab')) {
    return el;
  } else {
    return findButton(el.parentNode);
  }
}

function clearActiveTabs() {
  const tabs = document.querySelectorAll('.tabs > button.is-active');
  const panes = document.querySelectorAll('.tab-pane.is-active');
  clearActiveClasses(tabs);
  clearActiveClasses(panes);
}

function clearActiveClasses(els) {
  if (!els.length) {
    return;
  }
  Array.prototype.forEach.call(els, function(el) {
    el.classList.remove('is-active');
  });
}

function activateTab(button) {
  button.classList.add('is-active');
  const pane = getTabPane(button);
  if (pane) {
    pane.classList.add('is-active');
  }
}

function getTabPane(button) {
  const aria = button.attributes['aria-controls'];
  if (!aria) {
    return null;
  }
  return document.getElementById(aria.nodeValue);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchWebmentions;
function fetchWebmentions(url, aliases) {
  if (!url) {
    url = document.location.origin + document.location.pathname;
  }
  const targets = getUrlPermutations(url, aliases);
  //
  var script = document.createElement('script');
  var src =
    'https://webmention.io/api/mentions?perPage=500&jsonp=parseWebmentions';
  targets.forEach(function(targetUrl) {
    src += `&target[]=${encodeURIComponent(targetUrl)}`;
  });
  src += `&_=${Math.random()}`;
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function getUrlPermutations(url, aliases) {
  const urls = [];
  url = url.replace('localhost:1313', 'keithjgrant.com');
  urls.push(url);
  urls.push(url.replace('https://', 'http://'));
  if (url.substr(-1) === '/') {
    var noslash = url.substr(0, url.length - 1);
    urls.push(noslash);
    urls.push(noslash.replace('https://', 'http://'));
  }
  if (aliases) {
    aliases.forEach(function(alias) {
      urls.push(`https://keithjgrant.com${alias}`);
    });
  }
  return urls;
}

function parseWebmentions(data) {
  var links = data.links.sort(wmSort);
  var likes = [];
  var reposts = [];
  var replies = [];
  links.map(function(l) {
    if (!l.activity || !l.activity.type) {
      console.warning('unknown link type', l);
      return;
    }
    if (!l.verified) {
      return;
    }
    switch (l.activity.type) {
      case 'like':
        likes.push(l);
        break;
      case 'repost':
      case 'link':
        reposts.push(l);
        break;
      default:
        replies.push(l);
        break;
    }
  });
  renderLikes(likes);
  renderReposts(reposts);
  renderReplies(replies);
  showInteractions();
}
window.parseWebmentions = parseWebmentions;

function wmSort(a, b) {
  const dateA = getWmDate(a);
  const dateB = getWmDate(b);
  if (dateA < dateB) {
    return -1;
  } else if (dateB < dateA) {
    return 1;
  }
  return 0;
}

function getWmDate(webmention) {
  if (webmention.data.published) {
    return new Date(webmention.data.published);
  }
  return new Date(webmention.verified_date);
}

var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function renderLikes(likes) {
  var label = likes.length + (likes.length === 1 ? ' like' : ' likes');
  document.getElementById('like-count').innerHTML = label;

  var t = document.getElementById('like-template').content;
  var list = document.getElementById('likes');
  likes.map(function(l) {
    t.querySelector('img').src = l.data.author.photo;
    var author = t.querySelector('.reply__author');
    author.href = l.data.author.url;
    author.innerHTML = l.data.author.name;
    var date = t.querySelector('.reply__date');
    date.href = l.data.url;
    var d = new Date(l.data.published || l.verified_date);
    date.innerHTML = `${d.getDate()} ${months[
      d.getMonth()
    ]} ${d.getFullYear()}`;
    var clone = document.importNode(t, true);
    list.appendChild(clone);
  });
}

function renderReposts(reposts) {
  var label = reposts.length + (reposts.length === 1 ? ' share' : ' shares');
  document.getElementById('share-count').innerHTML = label;

  var t = document.getElementById('like-template').content;
  var list = document.getElementById('shares');
  reposts.map(function(l) {
    if (l.data.author) {
      t.querySelector('img').src = l.data.author.photo;
      var author = t.querySelector('.reply__author');
      author.href = l.data.author.url;
      author.innerHTML = l.data.author.name;
    } else {
      t.querySelector('img').src = '';
      var author = t.querySelector('.reply__author');
      author.href = l.data.url;
      author.innerHTML = 'inbound link';
    }
    var date = t.querySelector('.reply__date');
    date.href = l.data.url;
    var d = new Date(l.data.published || l.verified_date);
    date.innerHTML = `${d.getDate()} ${months[
      d.getMonth()
    ]} ${d.getFullYear()}`;
    var clone = document.importNode(t, true);
    list.appendChild(clone);
  });
}

function renderReplies(replies) {
  var label = replies.length + (replies.length === 1 ? ' reply' : ' replies');
  document.getElementById('reply-count').innerHTML = label;

  var t = document.getElementById('reply-template').content;
  var list = document.getElementById('replies');
  replies.map(function(l) {
    var author = t.querySelector('.reply__author');
    var body = t.querySelector('.reply__content');
    if (l.data.author) {
      t.querySelector('img').src = l.data.author ? l.data.author.photo : '';
      author.href = l.data.author.url;
      author.innerHTML = l.data.author.name;
      body.innerHTML = l.data.content;
    } else {
      t.querySelector('img').src = '';
      author.href = l.data.url;
      author.innerHTML = l.data.url;
      body.innerHTML = `<i>link from <a href="${l.data.url}">${l.data
        .url}</a></i>`;
    }
    var date = t.querySelector('.reply__date');
    date.href = l.data.url;
    var d = new Date(l.data.published || l.verified_date);
    date.innerHTML = `${d.getDate()} ${months[
      d.getMonth()
    ]} ${d.getFullYear()}`;
    var clone = document.importNode(t, true);
    list.appendChild(clone);
  });
}

function showInteractions() {
  document.getElementById('comments-loader').classList.add('is-hidden');
  document.getElementById('comments').classList.remove('is-hidden');
}


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webmentions__ = __webpack_require__(1);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tabs__["a" /* default */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__webmentions__["a" /* default */])();


/***/ })
/******/ ]);