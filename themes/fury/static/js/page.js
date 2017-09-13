(function() {
  // prettyprint code
  var code = document.querySelectorAll('.content pre');
  for (var i = 0; i < code.length; i++) {
    code[i].classList.add('prettyprint');
    code[i].classList.add('linenums');
  }
  prettyPrint();

  // tab switching controls (interactions)
  function each(els, fn) {
    Array.prototype.forEach.call(els, fn);
  }
  var tabButtons = document.querySelectorAll('.tabs > button');
  var tabPanes = document.querySelectorAll('.tab-pane');

  function clearActiveTab() {
    each(tabButtons, function(b) {
      b.classList.remove('is-active');
    });
    each(tabPanes, function(p) {
      p.classList.remove('is-active');
    });
  }

  each(tabButtons, function(button) {
    button.addEventListener('click', function(e) {
      var el = e.target;
      var paneId = el.getAttribute('aria-controls');
      while (!paneId && el.tagName != 'BUTTON') {
        el = el.parentNode;
        paneId = el.getAttribute('aria-controls');
      }
      if (!paneId) {
        return;
      }
      clearActiveTab();
      e.target.classList.add('is-active');
      var pane = document.getElementById(paneId);
      pane.classList.add('is-active');
    });
  });

  // webmention form
  var submit = document.getElementById('webmention-submit');
  if (submit) {
    submit.addEventListener('click', function(e) {
      if (!self.fetch || !FormData) {
        // allow form to POST itself
        return;
      }
      e.preventDefault();
      var form = document.getElementById('webmention-form');
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
      })
        .then(function(response) {
          return response.blob();
        })
        .then(function() {
          var inputs = form.querySelectorAll('.inline-form__inputs')[0];
          var alert = form.querySelectorAll('.form-alert')[0];
          alert.innerHTML = 'Thanks! Your reply should be added shortly.';
          inputs.classList.add('is-hidden');
          alert.classList.remove('is-hidden');
        })
        .catch(function(err) {
          var alert = form.querySelectorAll('.form-alert')[0];
          alert.innerHTML =
            'There seems to be a problem sending. Please try again later.';
          alert.classList.remove('is-hidden');
        });
    });
  }

  // Load webmentions jsonp
  function loadWebmentions(url, aliases) {
    var urls = [];
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
    var script = document.createElement('script');
    var src = 'https://webmention.io/api/mentions?perPage=500&jsonp=parseWebmentions';
    urls.forEach(function(url) {
      src += `&target[]=${encodeURIComponent(url)}`;
    });
    src += `&_=${Math.random()}`;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  window.loadWebmentions = loadWebmentions;

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
      date.innerHTML = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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
      date.innerHTML = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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
        body.innerHTML = `<i>link from <a href="${l.data.url}">${l.data.url}</a></i>`;
      }
      var date = t.querySelector('.reply__date');
      date.href = l.data.url;
      var d = new Date(l.data.published || l.verified_date);
      date.innerHTML = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      var clone = document.importNode(t, true);
      list.appendChild(clone);
    });
  }

  function showInteractions() {
    document.getElementById('comments-loader').classList.add('is-hidden');
    document.getElementById('comments').classList.remove('is-hidden');
  }
})();

window.twttr = (function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://platform.twitter.com/widgets.js';
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
})(document, 'script', 'twitter-wjs');

// load tweets
twttr.ready(function() {
  var links = document.querySelectorAll('.show-embeds a[href*="//twitter.com"]');
  Array.prototype.map.call(links, function(link) {
    var parts = link.href.split('/');
    var id = parts.pop();
    if (parts.pop() !== 'status' || link.href !== link.innerHTML) {
      return;
    }

    twttr.widgets.createTweet(id, link.parentNode);
    link.innerHTML = '';
  });
});
