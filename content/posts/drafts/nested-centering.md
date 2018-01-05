+++
date = "2017-12-01T14:12:18-05:00"
title = "Nested Centering in a Grid"
draft = true
+++

Between flexbox and grid, CSS has made vertical centering, in most cases, [trivial](https://philipwalton.github.io/solved-by-flexbox/demos/vertical-centering/).

But while working on the latest redesign of this site, I ran into a case where it still took some thought, & the eventual solution I found was more complex than I expected. The problem arose with this structure:


```html
<ul>
  <li>
    <a href="/posts/2018/shindig/">Shindig</a>
  </li>
  <li>
    <a href="/posts/2017/12/oocss-and-grid/">OOCSS and Grid</a>
  </li>
  <li>
    <a href="/posts/2017/09/code-not-clojure/">Code, Not Clojure</a>
  </li>
</ul>
```

I wanted a rendered result like this:

![Three gray boxes in a row with text vertically centered in each](/images/2018/grid-centered.png)

This layout had three requirements:

* Each box should be the same size and allow line-wrapping if necessary.
* Each link should fill the height and width of the its gray box, so the whole area is clickable.
* The text of the link should be vertically centered in the box.

CSS Grid can do each of these things, so the obvious first step was to apply `display: grid` to the `<ul>`.

Can this be simplified?

https://codepen.io/keithjgrant/pen/ZaVZdg
