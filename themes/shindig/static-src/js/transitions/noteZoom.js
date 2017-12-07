import {cloneBackground, removeNode} from '../util/dom';
import {findLinkToNote} from '../util/notes';
import {getFlipCoords} from '../util/transitions';

export default function noteZoom(oldEl, newEl) {
  const newBg = cloneBackground(newEl);
  const oldBg = cloneBackground(oldEl);
  newEl.parentNode.insertBefore(oldBg, newEl);
  newEl.parentNode.insertBefore(newBg, newEl);
  const oldNoteBox = findLinkToNote(oldEl, document.location.href);
  const newNoteBox = newEl.querySelector('.note-highlight');
  const scrollAmount = window.pageYOffset;

  const tl = new TimelineLite({
    onComplete: () => {
      removeNode(oldEl);
      removeNode(newBg);
      removeNode(oldBg);
      TweenLite.set(newEl, {clearProps: 'all'});
      TweenLite.set(newNoteBox, {clearProps: 'all'});
      TweenLite.set(newEl.parentNode, {clearProps: 'all'});
    },
  });

  window.scrollTo(0, 0);
  tl.set(newBg, {
    position: 'absolute',
    width: '100%',
    height: '200vh',
    opacity: 0,
  });
  tl.set(oldBg, {
    position: 'absolute',
    width: '100%',
    height: '200vh',
  });
  tl.set(newEl, {
    height: '200vh',
    position: 'relative',
    background: 'none',
    overflow: 'hidden',
    zIndex: 1,
  });
  tl.set(oldEl, {
    position: 'absolute',
    top: scrollAmount * -1,
    left: 0,
    right: 0,
    background: 'none',
    zIndex: 1,
    transformOrigin: '50% 50vh',
  });
  tl.set(newNoteBox, {
    transformOrigin: '0 0',
  });
  tl.set(oldEl.parentNode, {minHeight: '200vh'});
  tl.call(() => {
    oldNoteBox.classList.add('is-transparent');
  });
  tl.addLabel('start');

  tl.to(
    oldEl,
    1.2,
    {
      opacity: 0,
      scaleX: 0.9,
      scaleY: 0.9,
    },
    'start'
  );
  const first = oldNoteBox.getBoundingClientRect();
  const last = newNoteBox.getBoundingClientRect();
  const flipCoords = getFlipCoords(first, last, {ease: Power3.easeOut});
  tl.from(newNoteBox, 0.9, flipCoords, 'start');

  tl.addLabel('zoomDone');
  tl.set(newEl, {clearProps: 'height'});
  tl.to(newBg, 0.6, {opacity: 1});

  // tl.seek(0.4);
  // tl.stop();
  tl.play();
}
