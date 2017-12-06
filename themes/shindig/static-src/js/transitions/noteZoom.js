import {
  crossfadeBackground,
  flipZoom,
  cloneBackground,
  removeNode,
} from '../util/transitions';
import {findLinkToNote} from '../util/notes';

export default function noteZoom(oldEl, newEl) {
  crossfadeBackground(oldEl, newEl);
  const orig = findLinkToNote(oldEl, document.location.href);
  const newNote = newEl.querySelector('.note-highlight');

  const tl = new TimelineLite();
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.set(newEl, {transformOrigin: '0 0'});

  flipZoom(orig, newNote).then(() => {
    removeNode(oldEl);
    TweenLite.set(newEl, {clearProps: 'all'});
  });
  tl.play();
  // fadeOut(oldEl);
}
