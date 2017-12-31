import {removeNode, cloneBackground} from '../util/dom';

export default function irisStagger(oldEl, newEl) {
  const newBg = cloneBackground(newEl);
  const oldBg = cloneBackground(oldEl);
  const heading = newEl.querySelector('.list-heading');
  const scrollAmount = window.pageYOffset;
  const headerHeight = 75;
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
  tl.call(() => {
    const parent = oldEl.parentNode;
    parent.insertBefore(newEl, oldEl.nextSibling);
    parent.insertBefore(oldBg, newEl);
    parent.insertBefore(newBg, newEl);
  });
  tl.set(oldEl.parentNode, {minHeight: '200vh'});

  tl.set(oldEl, {top: scrollAmount * -1 + headerHeight});
  tl.call(() => {
    window.scrollTo(0, 0);
  });

  tl.addLabel('start');
  tl.to(oldEl, 0.4, {opacity: 0}, 'start');
  tl.set(newEl, {opacity: 1}, 'start');
  const posts = newEl.querySelectorAll('.post-summary');
  const items = Array.prototype.slice.call(posts, 0, 6);
  tl.staggerFrom(
    items,
    0.6,
    {
      scaleX: 0,
      ease: Power1.easeOut,
    },
    0.1,
    'start'
  );
  tl.set(items, {clearProps: 'all'});
  tl.addLabel('ready', 'start+=0.6');
  tl.to(newBg, 1.8, {opacity: 1}, 'start');
  tl.set(oldEl.parentNode, {clearProps: 'all'});
  tl.set(newEl, {clearProps: 'overflow, background'});
  if (heading) {
    tl.set(heading, {opacity: 1});
    tl.from(heading, 2, {
      x: -30,
      opacity: 0,
      ease: Power1.easeOut,
    });
  }

  tl.play();
  return tl;
}
