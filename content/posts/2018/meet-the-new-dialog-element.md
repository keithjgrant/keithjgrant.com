---
title: "Meet the New Dialog Element"
date: 2018-01-10T17:55:12-05:00
draft: true

image:
  url: "/images/2018/iron-mailbox.jpg"
  alt: "Old iron mailbox with the word 'letters' emblazoned on front"
  align: "50% 10%"
  author: "Kirsty TG"
  authorUrl: "https://unsplash.com/photos/xmY3qMBfzBs?utm_medium=referral&utm_content=creditCopyText"
---

[HTML 5.2](https://www.w3.org/TR/html52/) has introduced a new `<dialog>` element for native modal dialog boxes. At first glance, it seems fairly straightforward (and it is), but as I’ve been playing around with it, I’ve found it has some nice features that might be easy to miss.

Let’s see how it works! Here is the markup for a basic dialog box:

```html
<dialog open>
  Native dialog box!
</dialog>
```

The `open` attribute means that the dialog is visible. Without it, the dialog is hidden until you use JavaScript to make it appear. Before any styling is added, the dialog renders as follows:

<img src="/images/2018/native-dialog-basic.png" alt="Text in a box with a thick black outline" width="186" height="76"/>

It’s absolutely positioned on the page, so it will appear in front of other content as you would expect, and is centered horizontally.

## Opening and closing

JavaScript has a few methods and properties to make working with the `<dialog>` element easy. The two methods you will probably need the most are `showModal()` and `close()`.

```js
const modal = document.querySelector('dialog');

// makes modal appear (adds `open` attribute)
modal.showModal();

// hides modal (removes `open` attribute)
modal.close();
```

When you use `showModal()` to open the dialog, a backdrop is added to the page, blocking user interaction with the contents outside the modal. By default, this backdrop is a transparent, but you can change its appearance with CSS (more on that below).

Pressing Escape will close the dialog, and you can provide a close button to trigger the `close()` method.

There is a third method, `show()` that also make the modal appear but without the accompanying backdrop. The user will still be able to interact with elements that are visible outside the dialog box.

### Browser Support and Polyfill

Right now, `<dialog>` behavior is only supported in Chrome. Firefox provides default styling, but the JavaScript API is only enabled behind a flag. Thankfully, there is [a polyfill](https://github.com/GoogleChrome/dialog-polyfill) that provides both the JavaScript behavior and a stylesheet with default styling. Install `dialog-polyfill` in npm to use it. It works in IE9 and up.

When using the polyfill, each dialog on the page needs to be initialized:

```js
dialogPolyfill.registerDialog(modal);
```

This will not replace native behavior for browsers that have it.

## Styling

Opening and closing a modal is nice, but it doesn’t look very professional yet. Adding styling is as simple as styling any other element. The backdrop can be styled with the new `::backdrop` pseudo-class.

```css
dialog {
  padding: 0;
  border: 0;
  border-radius: 0.6rem;
  box-shadow: 0 0 1em black;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
```

For older browsers, this pseudo-class selector will not work, however. To fix this, the polyfill adds a `.backdrop` element immediately following the dialog. You can target it with CSS like this:

```css
dialog + .backdrop {
  background-color: rgba(0, 0, 0, 0);
}
```

Let’s add a little more markup to provide styling hooks. A common approach to dialog boxes is to break it up into a header, a body, and a footer:

```html
<dialog id="demo-modal">
  <h3 class="modal-header">A native modal dialog box</h3>
  <div class="modal-body">
    <p>Finally, HTML has a native dialog box element! This is fantastic.</p>
    <p>And a polyfill makes this usable today.</p>
  </div>
  <footer class="modal-footer">
    <button id="close" type="button">close</button>
  </footer>
</dialog>
```

<img src="/images/2018/native-dialog-styled.png" alt="Text in a box with a thick black outline" width="628" height="334"/>

...backdrop

## More control
(events, returnValue)
