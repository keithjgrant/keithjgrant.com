import zoomIn from './transitions/zoomIn';
import scrollRightTo from './transitions/scrollRightTo';
import scrollDownTo from './transitions/scrollDownTo';
import irisIn from './transitions/irisIn';
import irisStagger from './transitions/irisStagger';
import dropOut from './transitions/dropOut';
import noteZoom from './transitions/noteZoom';

const NONE = 0;
const TO_POST = 1;
const TO_HP = 2;
const TO_LIST = 3;
const NOTE_ZOOM = 4;
const TO_POST_LIST = 5;
const TO_TALK_LIST = 6;
const OTHER = 100;

export default function selectTransition(toUrl) {
  const type = getTransitionType(toUrl);
  switch (type) {
    case TO_POST:
      return zoomIn;
    case TO_HP:
      return dropOut;
    case TO_POST_LIST:
    case TO_TALK_LIST:
      return irisStagger;
    case TO_LIST:
      return irisIn;
    case NOTE_ZOOM:
      return noteZoom;
    case NONE: // TODO: distinguish b/t NONE & OTHER
    default:
      return null;
  }
}

function getTransitionType(toUrl) {
  const fromUrl = document.location.pathname;
  if (fromUrl === toUrl) {
    return NONE;
  }
  if (isPostUrl(toUrl)) {
    return TO_POST;
  }
  if (isNoteUrl(toUrl)) {
    if (isNoteList(fromUrl)) {
      return NOTE_ZOOM;
    }
    return OTHER;
  }
  if (isHomepage(toUrl)) {
    return TO_HP;
  }
  if (isPostList(toUrl)) {
    return TO_POST_LIST;
  }
  if (isTalkList(toUrl)) {
    return TO_TALK_LIST;
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

function isNoteUrl(url) {
  return isSingle(url, 'notes');
}

function isSingle(url, basePath) {
  const parts = split(url);
  return parts[0] === basePath && parts.length > 1 && parts[1] !== 'page';
}

function isHomepage(url) {
  return url === '/';
}

function isList(url) {
  return split(url).length === 1;
}

function isPostList(url) {
  const parts = split(url);
  if (parts[0] !== 'posts') {
    return false;
  }
  if (parts.length === 1 || parts[1] === 'page') {
    return true;
  }
  return false;
}

function isNoteList(url) {
  const parts = split(url);
  return parts[0] == 'notes' && parts.length == 1;
}

function isTalkList(url) {
  const parts = split(url);
  return parts[0] == 'talks' && parts.length == 1;
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
