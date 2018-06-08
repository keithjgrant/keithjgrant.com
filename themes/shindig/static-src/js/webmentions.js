const ANON_AVATAR = '/images/anon-avatar.png';

export default function fetchWebmentions(url, aliases) {
  if (!document.getElementById('comments')) {
    return;
  }
  if (!url) {
    url = document.location.origin + document.location.pathname;
  }
  const targets = getUrlPermutations(url, aliases);

  var script = document.createElement('script');
  var src =
    'https://webmention.io/api/mentions?perPage=500&jsonp=parseWebmentions';
  targets.forEach(function(targetUrl) {
    src += `&target[]=${encodeURIComponent(targetUrl)}`;
  });
  src += `&_=${Math.random()}`;
  script.src = src;
  script.async = true;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function getUrlPermutations(url, aliases) {
  const urls = [];
  url = url.replace('http://localhost:1313', 'https://keithjgrant.com');
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
    fillTemplate(t, {
      photo: l.data.author.photo || ANON_AVATAR,
      name: l.data.author.name,
      authorUrl: l.data.author.url,
      url: l.data.url,
      date: new Date(l.data.published || l.verified_date),
    });
    var clone = document.importNode(t, true);
    list.appendChild(clone);
  });
}

function getHostName(url) {
  var a = document.createElement('a');
  a.href = url;
  return (a.hostname || '').replace('www.', '');
}

function renderReposts(reposts) {
  var label = reposts.length + (reposts.length === 1 ? ' share' : ' shares');
  document.getElementById('share-count').innerHTML = label;

  var t = document.getElementById('like-template').content;
  var list = document.getElementById('shares');
  reposts.map(function(l) {
    let data;
    if (l.data.author) {
      data = {
        photo: l.data.author.photo || ANON_AVATAR,
        name: l.data.author.name,
        authorUrl: l.data.author.url,
        url: l.data.url,
        date: new Date(l.data.published || l.verified_date),
      };
    } else {
      data = {
        photo: ANON_AVATAR,
        name: getHostName(l.data.url) || 'inbound link',
        authorUrl: l.data.url,
        url: l.data.url,
        date: new Date(l.data.published || l.verified_date),
      };
    }
    fillTemplate(t, data);
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
    let data;
    if (l.data.author) {
      data = {
        photo: l.data.author.photo || ANON_AVATAR,
        name: l.data.author.name,
        authorUrl: l.data.author.url,
        url: l.data.url,
        date: new Date(l.data.published || l.verified_date),
        content: l.data.content,
      };
    } else {
      data = {
        photo: ANON_AVATAR,
        name: getHostName(l.data.url) || 'inbound link',
        authorUrl: l.data.url,
        url: l.data.url,
        date: new Date(l.data.published || l.verified_date),
        content: l.data.content,
      };
    }

    fillTemplate(t, data);
    var clone = document.importNode(t, true);
    list.appendChild(clone);
  });
}

function fillTemplate(template, vals) {
  template.querySelector('.js-avatar').src = vals.photo;
  template.querySelector('.js-author').href = vals.authorUrl;
  template.querySelector('.js-author-name').innerHTML = vals.name;
  template.querySelector('.js-source').href = vals.url;
  const date = template.querySelector('.js-date');
  if (date) {
    date.innerHTML = formatDate(vals.date);
  }
  if (vals.content) {
    template.querySelector('.js-content').innerHTML = vals.content;
  }
}

function formatDate(date) {
  if (!date) {
    return '';
  }
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function showInteractions() {
  document.getElementById('comments-loader').classList.add('is-hidden');
  document.getElementById('comments').classList.remove('is-hidden');
}
