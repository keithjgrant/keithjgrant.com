import {cloneBackground, removeNode} from '../util/dom';
import {findLinkToNote} from '../util/notes';
import {getFlipCoords} from '../util/transitions';

export default function noteZoom(oldEl, newEl) {
  const newBg = cloneBackground(newEl);
  const oldBg = cloneBackground(oldEl);
  oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
  newEl.parentNode.insertBefore(oldBg, newEl);
  newEl.parentNode.insertBefore(newBg, newEl);
  const oldNoteBox = findLinkToNote(oldEl, document.location.href);
  const newNoteBox = newEl.querySelector('.note-highlight');
  const scrollAmount = window.pageYOffset;
  const headerHeight = 75;
  const notesOnScreen = findNotesOnScreen(oldEl);

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
    left: 0,
    right: 0,
    background: 'none',
    zIndex: 1,
    transformOrigin: '50% 50vh',
  });
  tl.set(newNoteBox, {
    transformOrigin: '0 0',
    opacity: 0,
  });
  tl.set(oldEl.parentNode, {minHeight: '200vh'});
  // tl.call(() => {
  //   const parent = oldEl.parentNode;
  //   parent.insertBefore(newEl, oldEl.nextSibling);
  //   parent.insertBefore(oldBg, newEl);
  //   parent.insertBefore(newBg, newEl);
  // });
  tl.addLabel('start');

  tl.set(oldEl, {top: scrollAmount * -1 + headerHeight});
  tl.call(() => {
    window.scrollTo(0, 0);
  });

  tl.set(newNoteBox, {opacity: 1});
  tl.set(oldNoteBox, {opacity: 0});
  tl.staggerTo(
    notesOnScreen,
    0.3,
    {
      opacity: 0,
      scale: 0.5,
    },
    0.1
  );
  tl.addLabel('mid');
  const first = oldNoteBox.getBoundingClientRect();
  const last = newNoteBox.getBoundingClientRect();
  const flipCoords = getFlipCoords(first, last, {ease: Back.easeInOut});
  tl.from(newNoteBox, 0.9, flipCoords, 'start');
  tl.to(oldEl, 0.3, {opacity: 0}, 'start+=0.3');

  tl.addLabel('zoom-done');
  tl.set(newEl, {clearProps: 'height'});
  tl.to(newBg, 1.5, {opacity: 1});

  tl.play();
}

function findNotesOnScreen(container) {
  const notes = container.querySelectorAll('.note');
  const screenHeight = document.documentElement.clientHeight;
  const location = document.location;
  const skipUrl = `${location.origin}${location.pathname}`;
  const matches = [];
  notes.forEach(note => {
    if (note.attributes['data-href'].value === skipUrl) {
      return;
    }
    const rect = note.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < screenHeight) {
      matches.push(note);
    }
  });
  return matches;
}
