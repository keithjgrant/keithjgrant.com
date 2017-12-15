import {removeNode, cloneBackground} from '../util/dom';

export default function irisIn(oldEl, newEl) {
  const newBg = cloneBackground(newEl);
  const oldBg = cloneBackground(oldEl);
  const heading = newEl.querySelector('.list-heading');
  const tl = new TimelineLite({
    onComplete: () => {
      removeNode(oldEl);
      removeNode(newBg);
      removeNode(oldBg);
      TweenLite.set(newEl, {clearProps: 'all'});
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
  });
  tl.set(oldEl.parentNode, {minHeight: '200vh'});
  tl.call(() => {
    const parent = oldEl.parentNode;
    parent.insertBefore(newEl, oldEl.nextSibling);
    parent.insertBefore(oldBg, newEl);
    parent.insertBefore(newBg, newEl);
  });
  tl.add('start');

  tl.to(oldEl, 0.4, {opacity: 0}, 'start');
  tl.from(
    newEl,
    0.8,
    {
      scaleX: 0,
      background: 'none',
      ease: Power4.easeIn,
      opacity: 0,
    },
    'start'
  );
  tl.to(newBg, 0.8, {opacity: 1}, 'start');
  tl.set(newEl, {clearProps: 'height, overflow, background'}, 'start');
  tl.set(oldEl.parentNode, {clearProps: 'all'});
  if (heading) {
    tl.set(heading, {opacity: 1});
    tl.from(heading, 2, {
      x: -30,
      opacity: 0,
      ease: Power1.easeOut,
    });
  }
  tl.play();
}
