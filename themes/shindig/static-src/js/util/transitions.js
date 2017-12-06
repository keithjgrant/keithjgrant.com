// export function crossfadeBackground(oldEl, newEl) {
//   const newBg = cloneBackground(newEl);
//   const oldBg = cloneBackground(oldEl);
//   newEl.parentNode.insertBefore(oldBg, oldEl);
//   newEl.parentNode.insertBefore(newBg, oldEl);
//   return new Promise((resolve, reject) => {
//     const tl = new TimelineLite({
//       onComplete: () => {
//         removeNode(newBg);
//         removeNode(oldBg);
//         TweenLite.set(newEl, {clearProps: 'all'});
//         resolve();
//       },
//     });
//     tl.set(newBg, {
//       position: 'absolute',
//       width: '100%',
//       height: '200vh',
//       opacity: 0,
//     });
//     tl.set(oldBg, {
//       position: 'absolute',
//       width: '100%',
//       height: '200vh',
//     });
//     tl.set(oldEl, {
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       background: 'none',
//       zIndex: 1,
//     });
//     tl.set(newEl, {
//       // height: '200vh',
//       position: 'relative',
//       background: 'none',
//       // overflow: 'hidden',
//     });
//     tl.to(newBg, 0.8, {opacity: 1});
//     // tl.play();
//     tl.progress(0.5);
//     tl.pause();
//   });
// }

// export function flipZoom(fromEl, toEl) {
//   return new Promise((resolve, reject) => {
//     const tl = new TimelineLite({
//       onComplete: () => resolve,
//     });
//
//     const first = fromEl.getBoundingClientRect();
//     const last = toEl.getBoundingClientRect();
//     // const invert = {
//     //   top: first.top - last.top,
//     //   left: first.left - last.left,
//     //   height: first.height / last.height,
//     //   width: first.width / last.width,
//     // };
//     tl.from(toEl, 1.5, {
//       x: first.left - last.left,
//       y: first.top - last.top,
//       scaleX: first.width / last.width,
//       scaleY: first.height / last.height,
//       ease: Power4.easeOut,
//     });
//     tl.set(fromEl, {opacity: 0});
//     tl.play();
//   });
// }

export function getFlipCoords(first, last, props) {
  if (!props) {
    props = {};
  }
  props.x = first.left - last.left;
  props.y = first.top - last.top;
  props.scaleX = first.width / last.width;
  props.scaleY = first.height / last.height;
  return props;
}
