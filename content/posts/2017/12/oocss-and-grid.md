+++
date = "2017-12-13T13:03:47-05:00"
title = "OOCSS and Grid"

[image]
url = "/images/2017/old-books-sm.jpg"
alt = "A stack of old leather-bound books"
author = "Chris Lawton"
authorUrl = "https://unsplash.com/photos/9T346Ij4kGk"

+++

[OOCSS](https://github.com/stubbornella/oocss/wiki) was the first of the many CSS methodologies. Since it arrived on the scene, the industry has moved on to newer, more strongly prescriptive methodologies like SMACSS, BEM, and ITCSS. These newer approaches dominate the conventional wisdom today. But CSS grid is here now, and I find it presents some challenges to this wisdom. I think it’s time we give OOCSS a little attention again, because it has an important idea to offer in the world of CSS grid.
<!--more-->

A major theme recently is an emphasis on modular design: a user interface broken up into small modules whose styles are encapsulated. Modules are nested one within another to construct the entire interface. This leads to markup that looks something like this:

```html
<div class="row">
  <div class="col-4">
    <div class="card">
      <h3 class="card__title">Wash</h3>
      <p class="card__body">The whacky pilot.</p>
    </div>
  </div>
  <div class="col-4">
    <div class="card">
      <h3 class="card__title">River</h3>
      <p class="card__body">The mysterious prodigy. She kicks serious ass.</p>
    </div>
  </div>
  <div class="col-4">
    <div class="card">
      <h3 class="card__title">Jayne</h3>
      <p class="card__body">The strongman.</p>
    </div>
  </div>
</div>
```

You have one module responsible for layout (`row` and `col-4` classes) and another responsible for the look of the of the items within the layout (`card` and `card__*` classes). I used the classes from the Bootstrap grid system here, but this pattern isn’t limited to bootstrap: it’s common to use one module for layout and another for visual appearance like colors, fonts, and borders.

## A Limitation of CSS Grid

As I work with the new CSS Grid layout, I’m finding that the conventional approach isn’t always feasible. The big restriction with grid is this: to align an element in a grid, it must be a *direct child* of the grid container. (This [may not be a limitation forever](https://github.com/w3c/csswg-drafts/issues/958), but for now, we need to live with it.)

Take the example above, for instance. If you were to replace the `row` and `col-4` classes with a proper grid, you could not align the `card` elements directly to the grid:

```html
<div class="grid">
  <div class="grid__item">
    <div class="card">
      <h3 class="card__title">Wash</h3>
      <p class="card__body">The whacky pilot.</p>
    </div>
  </div>
  <div class="grid__item">
    <div class="card">
      <h3 class="card__title">River</h3>
      <p class="card__body">The mysterious prodigy. She kicks serious ass.</p>
    </div>
  </div>
  <div class="grid__item">
    <div class="card">
      <h3 class="card__title">Jayne</h3>
      <p class="card__body">The strongman.</p>
    </div>
  </div>
</div>
```

When you do this, the grid items align to the grid, each filling their respective grid cells, but the cards do not. This is the result:

<img src="/images/2017/oocss-grid-1.png" alt="Three white cards of different heights">

Instead of three neatly-aligned cards, the heights are all different. The grid items each have an equal height, but this is invisible to the user. The cards&mdash;and their white backgrounds&mdash;within don’t fill the entire height of those grid items. (This example is available [on Codepen](https://codepen.io/keithjgrant/pen/EoaoxJ).)

## OOCSS to the Rescue

<abbr title="Object-Oriented CSS">OOCSS</abbr> offers a solution to this problem. Let’s blow the dust off this old book and take a fresh look at what it offers. OOCSS is much simpler than the newer CSS methodologies. It has just two rules:

First, *Separate Container and Content*. This means styles should not be location-dependent. A module should work no matter where you place it in the DOM. If you follow SMACSS and/or BEM, this is exactly what you’re doing with your modules.

The second rule, however, isn’t followed as often in our newer methodologies: *Separate Structure and Skin*.  This means one class should be used to apply the structure to an element&mdash;its position and shape&mdash;while another should be used to apply its "skin"&mdash;its colors and stylistic appearance. Ideally, the same skin could be applied to a number of different “structures.”

After years of working with BEM, this second rule feels foreign. We’re used to each module (or “block,” if you prefer) doing its thing. Any given DOM element belongs only to one module. It feels dirty to apply two different modules to the same element: one for skin and another for structure. But I think this skinning approach going to be useful in the world of CSS grid.

Watch what happens in our example, when we combine the grid item “structure” with the card “skin”, thereby removing one layer of depth from the DOM:

```html
<div class="grid">
  <div class="grid__item card">
    <h3 class="card__title">Wash</h3>
    <p class="card__body">The whacky pilot.</p>
  </div>
  <div class="grid__item card">
    <h3 class="card__title">River</h3>
    <p class="card__body">The mysterious prodigy. She kicks serious ass.</p>
  </div>
  <div class="grid__item card">
    <h3 class="card__title">Jayne</h3>
    <p class="card__body">The strongman.</p>
  </div>
</div>
```

Now, the card styles are applied directly to the grid items (See this example [on Codepen](https://codepen.io/keithjgrant/pen/jYEYrx)):

<img src="/images/2017/oocss-grid-2.png" alt="Three white cards of equal heights, aligned correctly to the grid">

It’s important with this approach to maintain a distinction between “structure” modules and “skin” modules, so you don’t accidentally mix two skins together for conflicting results. On the whole, that’s not too hard to do. It just takes some good old fashioned OOCSS.
