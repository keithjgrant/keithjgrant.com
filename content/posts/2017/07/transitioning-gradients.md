+++
date = "2017-07-05T13:33:51-04:00"
title = "Transitioning Gradients"

+++
In, CSS, you can’t transition a background gradient. It sure would be nice if you could:

```css
.gradient {
  background-image: linear-gradient(
    to right,
    hsl(211, 100%, 50%),
    hsl(179, 100%, 30%)
  );
  transition: background-image 0.5s linear;
}

.gradient:hover {
  background-image: linear-gradient(
    to bottom,
    hsl(344, 100%, 50%),
    hsl(31, 100%, 40%)
  );
}
```

But, no. It jumps from one gradient to the other immediately, with no smooth transition between the two.

So let’s hack it! We can achieve this effect with the help of a pseudo-element and an opacity transform instead.

First, apply one gradient to the element. Then, position its pseudo-element to fill the element and apply the second gradient to that. To transition between the two gradients,  transition the opacity of the pseudo-element.

```css
.gradient {
  position: relative;
  background-image: linear-gradient(
    to right,
    hsl(211, 100%, 50%),
    hsl(179, 100%, 30%)
  );
  z-index: 1;
}

.gradient::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom,
    hsl(344, 100%, 50%),
    hsl(31, 100%, 40%)
  );
  z-index: -1;
  transition: opacity 0.5s linear;
  opacity: 0;
}

.gradient:hover::before {
  opacity: 1;
}
```

The pseudo-element is initially hidden via `opacity: 0`. On hover, that transitions to an `opacity: 1`. This produces the illusion of the main gradient transitioning to the pseudo-element’s gradient. It also takes a little bit of `z-index` work to ensure the pseudo-element stays positioned behind the content of the main element.

This takes a fair bit of code, unfortunately. But if you need this effect, this is the best (and only) way I’ve found so far to accomplish it.

Check out the full working example:

<p data-height="300" data-theme-id="0" data-slug-hash="OgEdgN" data-default-tab="css,result" data-user="keithjgrant" data-embed-version="2" data-pen-title="OgEdgN" class="codepen">See the Pen <a href="https://codepen.io/keithjgrant/pen/OgEdgN/">OgEdgN</a> by Keith Grant (<a href="https://codepen.io/keithjgrant">@keithjgrant</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
