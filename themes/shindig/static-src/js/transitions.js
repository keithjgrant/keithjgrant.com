export function scrollDownTo(oldEl, newEl) {
  const height = document.documentElement.clientHeight;
  const tl = new TimelineLite({
    onComplete: () => {
      oldEl.parentNode.removeChild(oldEl);
    },
  });
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(newEl, {position: 'relative'});
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.add('start');
  tl.to(oldEl, 1.5, {y: height * -1, ease: Power2.easeInOut}, 'start');
  tl.from(newEl, 1.5, {y: height, ease: Power2.easeInOut}, 'start');
  tl.set(newEl, {position: 'static'});
  tl.set(oldEl.parentNode, {minHeight: 'auto'});
  tl.to(oldEl, 0.2, {opacity: 0});
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
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.add('start');
  tl.to(oldEl, 1.5, {x: width * -1, ease: Power2.easeInOut}, 'start');
  tl.from(newEl, 1.5, {x: width, ease: Power2.easeInOut}, 'start');
  tl.set(newEl, {position: 'static'});
  tl.set(oldEl.parentNode, {minHeight: 'auto'});
  tl.to(oldEl, 0.2, {opacity: 0});
  tl.play();
}

export function zoomIn(oldEl, newEl, link) {
  const tl = new TimelineLite({
    onComplete: () => {
      oldEl.parentNode.removeChild(oldEl);
    },
  });
  const first = link.getBoundingClientRect();
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.set(newEl, {transformOrigin: '0 0'});
  const last = newEl.getBoundingClientRect();
  const invert = {
    top: first.top - last.top,
    left: first.left - last.left,
    height: first.height / last.height,
    width: first.width / last.width,
  };
  tl.from(newEl, 1.5, {
    x: invert.left,
    y: invert.top,
    scaleX: invert.width,
    scaleY: invert.height,
    ease: Power4.easeOut,
  });
  tl.set(oldEl.parentNode, {minHeight: 'auto'});
  tl.play();
}

export function dropOut(oldEl, newEl) {
  const tl = new TimelineLite({
    onComplete: () => {
      oldEl.parentNode.removeChild(oldEl);
    },
  });
  tl.set(oldEl, {
    position: 'absolute',
    left: 0,
    right: 0,
    transformOrigin: '50% 0%',
  });
  tl.set(oldEl.parentNode, {
    perspective: 500,
  });
  tl.add('top');
  tl.to(
    oldEl,
    0.3,
    {
      y: 1000,
      z: -1100,
      opacity: 0,
      ease: Power4.easeIn,
    },
    'top'
  );
  tl.play();
}