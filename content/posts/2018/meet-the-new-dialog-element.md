---
title: "Meet the New Dialog Element"
date: 2018-01-11T14:17:12-05:00

image:
  url: "/images/2018/iron-mailbox.jpg"
  alt: "Old iron mailbox with the word 'letters' emblazoned on front"
  align: "50% 10%"
  author: "Kirsty TG"
  authorUrl: "https://unsplash.com/photos/xmY3qMBfzBs?utm_medium=referral&utm_content=creditCopyText"
---

[HTML 5.2](https://www.w3.org/TR/html52/) has introduced a new `<dialog>` element for native modal dialog boxes. At first glance, it seems fairly straightforward (and it is), but as I’ve been playing around with it, I’ve found it has some nice features that might be easy to miss.

I’ve embedded a full working demo at the end of this article, but if you want to play with it as you read along, [you can see it here](https://codepen.io/keithjgrant/pen/eyMMVL).

Here is the markup for a basic dialog box:

```html
<dialog open>
  Native dialog box!
</dialog>
```

The `open` attribute means that the dialog is visible. Without it, the dialog is hidden until you use JavaScript to make it appear. Before any styling is added, the dialog renders as follows:

<img src="/images/2018/native-dialog-basic.png" alt="Text in a box with a thick black outline" width="186" height="76"/>

It’s absolutely positioned on the page, so it will appear in front of other content as you would expect, and is centered horizontally.

## Basic Operation

JavaScript has a few methods and properties to make working with the `<dialog>` element easy. The two methods you will probably need the most are `showModal()` and `close()`.

```js
const modal = document.querySelector('dialog');

// makes modal appear (adds `open` attribute)
modal.showModal();

// hides modal (removes `open` attribute)
modal.close();
```

When you use `showModal()` to open the dialog, a backdrop is added to the page, blocking user interaction with the contents outside the modal. By default, this backdrop is fully transparent, but you can make it visible with CSS (more on that below).

Pressing Esc will close the dialog, and you can provide a close button to trigger the `close()` method.

There is a third method, `show()` that also make the modal appear but without the accompanying backdrop. The user will still be able to interact with elements that are visible outside the dialog box.

### Browser Support and Polyfill

Right now, `<dialog>` behavior is only supported in Chrome. Firefox provides default styling, but the JavaScript API is only enabled behind a flag. I suspect Firefox will enable it by default soon.

Thankfully, there is [a polyfill](https://github.com/GoogleChrome/dialog-polyfill) that provides both the JavaScript behavior and a stylesheet with default styling. Install `dialog-polyfill` in npm to use it&mdash;or use a regular old `<script>` tag. It works in IE9 and up.

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
  /* make the backdrop a semi-transparent black */
  background-color: rgba(0, 0, 0, 0.4);
}
```

For older browsers using the polyfill, this pseudo-class selector will not work, however. In its place, the polyfill adds a `.backdrop` element immediately following the dialog. You can target it with CSS like this:

```css
dialog + .backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
```

Add a little more markup to provide styling hooks. A common approach to dialog boxes is to break it up into a header, a body, and a footer:

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

Add some CSS to this, and you can make the modal look however you want:

<img src="/images/2018/native-dialog-styled.png" alt="Text in a box with a thick black outline" width="628" height="334"/>

## More control

Often, we want some sort of user feedback from a dialog box. When closing a dialog, you can pass a string value to the `close()` method. This value is assigned to the `returnValue` property of the dialog DOM element, so it can be read later:

```js
modal.close('Accepted');

console.log(modal.returnValue); // logs `Accepted`
```

There are also some events you can listen for. Two useful ones are `close` (triggered when the modal is closed) and `cancel` (triggered when the user presses Esc to close the modal).

## Full working demo

I’ve worked a lot of stuff into the demo below. Play around with and see what else you can do with `<dialog>`. This includes the polyfill, so it should work in most browsers.

<p data-height="300" data-theme-id="31665" data-slug-hash="eyMMVL" data-default-tab="result" data-user="keithjgrant" data-embed-version="2" data-pen-title="&lt;dialog&gt;" class="codepen">See the Pen <a href="https://codepen.io/keithjgrant/pen/eyMMVL/">&lt;dialog&gt;</a> by Keith J. Grant (<a href="https://codepen.io/keithjgrant">@keithjgrant</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
