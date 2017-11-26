export function scrollDownTo(oldEl, newEl) {
  const height = document.documentElement.clientHeight;
  const tl = new TimelineLite({
    onComplete: () => {
      oldEl.parentNode.removeChild(oldEl);
    },
  });
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(newEl, {position: 'relative'});
  tl.set(oldEl.parentNode, {height: '100vh'});
  tl.add('start');
  tl.to(oldEl, 1.5, {y: height * -1, ease: Power2.easeInOut}, 'start');
  tl.from(newEl, 1.5, {y: height, ease: Power2.easeInOut}, 'start');
  tl.set(newEl, {position: 'static'});
  tl.set(oldEl.parentNode, {height: 'auto'});
  tl.play();
}

export function scrollRightTo(oldEl, newEl) {
  const width = document.documentElement.clientWidth;
  const tl = new TimelineLite({
    onComplete: () => {
      oldEl.parentNode.removeChild(oldEl);
    },
  });
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(newEl, {position: 'relative'});
  tl.set(oldEl.parentNode, {height: '100vh'});
  tl.add('start');
  tl.to(oldEl, 1.5, {x: width * -1, ease: Power2.easeInOut}, 'start');
  tl.from(newEl, 1.5, {x: width, ease: Power2.easeInOut}, 'start');
  tl.set(newEl, {position: 'static'});
  tl.set(oldEl.parentNode, {height: 'auto'});
  tl.play();
}
