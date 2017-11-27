import {
  scrollDownTo,
  scrollRightTo,
  zoomIn,
  dropOut,
  irisIn,
} from './transitions';

const NONE = 0;
const TO_POST = 1;
const TO_HP = 2;
const TO_LIST = 3;
const OTHER = 100;

export default function selectTransition(toUrl) {
  const type = getTransitionType(toUrl);
  switch (type) {
    case TO_POST:
      return zoomIn;
    case TO_HP:
      return dropOut;
    case TO_LIST:
      return irisIn;
    case NONE: // TODO: distinguish b/t NONE & OTHER
    default:
      return null;
  }
}

function getTransitionType(toUrl) {
  const fromUrl = document.location.pathname;
  split(toUrl);
  if (fromUrl === toUrl) {
    return NONE;
  }
  if (isPostUrl(toUrl)) {
    return TO_POST;
  }
  if (isHomepage(toUrl)) {
    return TO_HP;
  }
  if (isList(toUrl)) {
    return TO_LIST;
  }
  return OTHER;
}

// TODO: strip query params?

function isPostUrl(url) {
  return isSingle(url, 'posts');
}

function isSingle(url, basePath) {
  const parts = split(url);
  return parts[0] === basePath && parts.length > 1;
}

function isHomepage(url) {
  return url === '/';
}

function isList(url) {
  return split(url).length === 1;
}

function split(url) {
  if (url.startsWith('/')) {
    url = url.substr(1);
  }
  if (url.endsWith('/')) {
    url = url.substr(0, url.length - 1);
  }
  return url.split('/');
}
