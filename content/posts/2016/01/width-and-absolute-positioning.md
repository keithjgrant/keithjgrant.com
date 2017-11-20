+++
aliases = ["/posts/width-and-absolute-positioning.html"]
date = "2016-01-30T00:00:00-05:00"
title = "Width and Absolute Positioning"

+++
I recently came across this question on Twitter:
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">What&#39;s the diff on a position:absolute el btw {top:0;right:0;bottom:0;left:0;} and {top:0;left:0;height:100%;width:100%;} ?</p>&mdash; Karl Swedberg (@kswedberg) <a href="https://twitter.com/kswedberg/status/692720642580295681">January 28, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<!--more-->

“That’s easy”, I thought. “They often seem the same in practice, but width and height are based on the parent (or nearest block-level ancestor). Top, right, bottom, and left are based on the nearest <em>positioned</em> ancestor. Those aren’t necessarily the same element.”

Shows what I know: my <a href="http://codepen.io/keithjgrant/pen/obddgy">quick mockup</a> to illustrate the difference proved me wrong.

On first pass, <code>top: 0; right: 0; bottom: 0; left: 0;</code> and <code>top: 0; left: 0; width: 100%; height: 100%;</code> are equivalent. Of course, we always <em>treat</em> them as equivalent, because in most real-world cases, the nearest positioned ancestor is the nearest block-level element (usually the parent). But my codepen showed me an absolutely positioned element whose width and height are derived from the positioned ancestor, not the immediate container.

In retrospect, this makes a certain kind of sense, because the absolutely positioned element is removed from the normal flow. It's then “contained” by the positioned ancestor.

So, the two scenarios are effectively the same. But a quick look at the spec made it clear that padding and margin would weigh in. So it might worth a little experimenting to see what we get.

## Experimenting

So here’s the basic scenario I set up. Three elements: one relatively positioned as the anchor for the absolute positioning, one to serve as the parent, and then the child, which will be absolutely positioned. For better visibility, the positioned container has a faint background color, the parent has a purple border, and the child has a medium gray background (transparent, so the others will show through).

```html
  <div class="positioned">
    <div class="parent">
      <div class="child">
      </div>
    </div>
  </div>
```

```css
  .positioned {
    position: relative;
    background-color: rgba(0,0,255, 0.1);
  }

  .parent {
    width: 200px;
    min-height: 200px;
    border: 2px solid #936;
  }

  .child {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
  }
```

Then, we’ll play around with the child’s properties to see what happens. We'll create two variations. First, one with top, right, bottom, and left all set to zero. And second, one with a top and left of zero, and a width and height of 100%.

<div class="demo demo--basic">
  <div class="demo-col">
    <pre class="prettyprint">.child {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</pre>
    <div class="demo-1 positioned">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
  <div class="demo-col">
    <pre class="prettyprint">.child {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}</pre>
    <div class="demo-2 positioned">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
</div>

The two children appear identical. They overflow outside the parent, and fill the size of the positioned container. Visually, you can’t tell the difference between the container and the child. Let's add some padding to the child and see what happens...

<pre class="prettyprint">
  .child {
    padding: 1em;
  }
</pre>
  <div class="demo demo--padding">
    <div class="demo-col">
      <div class="demo-1 positioned">
        <div class="parent">
          <div class="child"></div>
        </div>
      </div>
    </div>
    <div class="demo-col">
      <div class="demo-2 positioned">
        <div class="parent">
          <div class="child"></div>
        </div>
      </div>
    </div>
  </div>

...nothing. Note, I've got <code>box-sizing: border-box</code> set globally on the page. Let's turn that off:
<pre class="prettyprint">
  .child {
    box-sizing: content-box;
    padding: 1em;
  }
</pre>

<div class="demo demo--padding-2">
  <div class="demo-col">
    <div class="demo-1 positioned">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
  <div class="demo-col">
    <div class="demo-2 positioned">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
</div>

The padding still has no effect on the size of the first variation. But it adds to the width and height in the second; that child now overflows the positioned container. That makes sense. So there's a key difference here, if you don't have a global box-sizing fix in place.

Now let’s see what a margin does:

<pre class="prettyprint">
  .child {
    margin: 1em;
  }
</pre>

<div class="demo demo--margin">
  <div class="demo-col">
    <div class="demo-1 positioned">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
  <div class="demo-col">
    <div class="demo-2 positioned">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
</div>

Now that was unexpected, at least to me. With <code>right: 0; bottom: 0</code>, the margin is contained inside the positioned descendant; they will shrink the size of the element.

With <code>width: 100%; height: 100%</code>, the top and left margins are contained, but the element is shifted, maintaining its original size. The right and bottom margins are then added outside the whole structure.

What’s interesting is that in all these scenarios, the parent element doesn’t affect the shape of the child element at all&mdash;Though it does provide the height to the positioned container.

## Take-away

So what does this mean? It seems to me that <code>top: 0; right: 0; bottom: 0; left: 0</code> is probably the one to favor, as it's a little more predictable, unless you have a particular reason to use height or width instead.

<style type="text/css">
  .demo-col {
    margin: 1em 0;
  }
  @media screen and (min-width: 900px) {
    .demo {
      display: flex;
      flex-flow: space-between;
      margin: 1em 0;
    }

    .demo-col {
      flex: 1;
      margin: 0;
    }
    .demo-col:not(:first-child) {
      margin-left: 3em;
    }
  }

  .demo .positioned {
    position: relative;
    background-color: rgba(0,0,255, 0.1);
  }
  .demo .parent {
    width: 200px;
    min-height: 200px;
    border: 2px solid #936;
  }
  .demo .child {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .demo-1 .child {
    right: 0;
    bottom: 0;
  }

  .demo-2 .child {
    width: 100%;
    height: 100%;
  }

  .demo--padding .child {
    padding: 1em;
  }

  .demo--padding-2 {
    margin-bottom: 2em;
  }
  .demo--padding-2 .child {
    box-sizing: content-box;
    padding: 1em;
  }

  .demo--margin .child {
    margin: 1em;
  }
</style>
