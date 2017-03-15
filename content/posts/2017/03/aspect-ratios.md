+++
date = "2017-03-14T10:12:43-04:00"
title = "A better approach to CSS aspect ratios"

+++
There’s an old hack for creating elements with a fixed aspect ratio that involves using a percentage-based padding. You may be familiar with it. It looks something like this:

```css
.tile {
  height: 0;
  overflow: hidden;
  padding-bottom: 25%;
  background-color: bisque;
}
```

The element is forced to have no height, then its bottom padding is set to the actual desired height. This produces an element something like this:

<figure class="-demo-container">
  <div class="-demo1">
    4:1 aspect ratio
  </div>
</figure>

This works because of a peculiar quirk of padding: Any padding specified in percent computes to a percentage of the element’s *width*&mdash;even if it is a top or bottom padding. (The same is true for margin as well.) This is a bit counter-intuitive, but it comes in handy. I think the original reasoning was so you could declare something like `padding: 5%` and get an equal padding on all four sides of the element, regardless of its shape.

Of course, this approach has a problem: overflow is cut off:

<figure class="-demo-container">
  <div class="-demo1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet tellus ut erat egestas vestibulum. Aliquam erat volutpat. Fusce ut nibh quis lectus fermentum aliquet. Suspendisse potenti.
  </div>
</figure>

This approach creates fixed height of the element, which in CSS is an anti-pattern. For this reason, I’ve always felt dirty using it.

## Dealing with overflow

A while back, I stumbled across an approach that is similar, but prevents the overflow problem. Instead of setting our element’s height, we can set the height on a floated `::before` pseudo-element. Watch what happens when we do this:

```css
.tile {
  background-color: darkseagreen;
}
.tile::before {
  content: "";
  float: left;
  padding-bottom: 25%;
}
.tile::after {
  clear: left;
  content: " ";
  display: table;
}
```

The `::after` is just a familiar clearfix. This produces a very similar result:

<figure class="-demo-container">
  <div class="-demo2">
    4:1 aspect ratio
  </div>
</figure>

However, the element will still grow to contain overflow if necessary:

<figure class="-demo-container">
  <div class="-demo2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet tellus ut erat egestas vestibulum. Aliquam erat volutpat. Fusce ut nibh quis lectus fermentum aliquet. Suspendisse potenti.
  </div>
</figure>

## How it works

The trick is, instead of explicitly controlling (and thus limiting) the height of the element, we set a known height on the floated pseudo element. By using a padding-based percentage, this will be a ratio of the element’s width. We float it left and leave it empty, producing a width of zero. Here is the floated element, with a black outline added:

<figure class="-demo-container">
  <div class="-demo3">
    Floated pseudo element provides a min height to the element.
  </div>
</figure>

Then, in the `::after` pseudo-element, we clear the float, forcing the element to grow to contain the floated `::before`. Since the float has a width of 0, it doesn’t interfere with the content layout in any way.  And when the content extends below the bottom of the float, the box simply grows naturally to contain it:

<figure class="-demo-container">
  <div class="-demo3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet tellus ut erat egestas vestibulum. Aliquam erat volutpat. Fusce ut nibh quis lectus fermentum aliquet. Suspendisse potenti.
  </div>
</figure>


<style>
  .-demo-container {
    max-width: 300px;
    line-height: 1.6;
  }

  .-demo1 {
    height: 0;
    overflow: hidden;
    padding-bottom: 25%;
    background-color: bisque;
  }

  .-demo2 {
    background-color: darkseagreen;
    line-height: 1.6;
  }
  .-demo2::before {
    content: "";
    float: left;
    padding-bottom: 25%;
  }
  .-demo2::after {
    clear: left;
    content: " ";
    display: table;
  }

  .-demo3 {
    background-color: darkseagreen;
    line-height: 1.6;
  }
  .-demo3::before {
    content: "";
    float: left;
    padding-bottom: 25%;
    border: 1px solid black;
  }
  .-demo3::after {
    clear: left;
    content: " ";
    display: table;
  }
</style>
