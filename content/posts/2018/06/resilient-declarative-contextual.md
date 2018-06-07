---
title: "Resilient, Declarative, Contextual"
date: 2018-06-07T12:04:05-04:00
tags: ["css", "css-thinking"]
draft: true
---

Working with CSS requires a different type of mindset than many developers are familiar with. If you come from the world of JavaScript, CSS can be frustrating. This is especially true if you come from the world of a non-web-based language like Java or Python.
<!--more-->

I’ve spent a lot of time thinking about what defines a CSS mindset. Some people “get” it, and other don’t. It’s always felt to me that if I could put my finger on that, maybe CSS would make more sense to those who have struggled with it. One piece of my motivation in writing [CSS in Depth](https://www.manning.com/books/css-in-depth) was to try to articulate some of those things.

Today I want to take a different tack; I want to look at three key characteristics of CSS that set it apart from conventional programming languages: it’s resilient; it’s declarative; and it’s contextual.

## CSS is resilient

If you were to randomly delete a chunk of code out of a JavaScript file, the app or page using it would almost certainly come crashing to a halt and much of the script (if not the page as a whole) would become useless. If you do the same thing to CSS, you might not even notice. Almost everything apart from that specific section of code will continue to work as intended.

We call this *resilience*. HTML and CSS were specifically designed to be fault-tolerant. If there’s a problem, the browser won’t throw an error; instead, it will ignore that part of the code and keep on going.

But the resilience of CSS isn’t only a mechanism for overcoming network errors or typos: it’s woven into the fabric of the language itself. You can safely use features of the language that aren’t supported in all browsers. It’s what makes progressive enhancement possible.

Consider this example of a grid layout. It works in browsers that support grid, and it works in browsers that don’t support grid. It will be slightly imperfect in those that don’t support grid (the exact sizes of the items will probably vary), but it will still layout the page in roughly the same way:

```css
.portfolio {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.portfolio__item {
  display: inline-block;
  max-width: 600px;
}
```

A browser that doesn’t understand the two grid declarations will ignore them, and the other rules will do the work. And a browser that does understand grid will use the grid layout and ignore the `inline-block` declaration (because that’s how grid was designed to work). Jen Simmons half-jokingly calls this [“Quantum CSS”](https://www.youtube.com/watch?v=u00FY9vADfQ). You can take a feature of CSS and “use it and not use it at the same time. It works and it doesn’t work at the same time.”

This concept of “fallback” behavior is integral to using CSS, but it is a foreign concept in most conventional programming languages.

## CSS is declarative

In JavaScript, you give specific, step-by-step instructions how to make something happen. In CSS, you tell the browser what you want to have happen, and it works out the how. This is extremely important to understand. If you get it right, CSS will [do all the hard work for you](https://adactio.com/journal/13831)! And if you get it wrong, you’ll be fighting against the grain of the language and you will be frustrated at every turn.

Writing CSS is effectively setting up a system of constraints. You don’t tell the browser where to put every single element on the page; you tell it how much space to put between them and let it sort out where they belong. You don’t tell it (or at least shouldn’t tell it) how tall to make a container; you let it figure that out at render time when it knows the contents of the container, which other styles are applied, and how much width is available in the viewport.

There are so many variables to consider. The point of CSS is to make it so you don’t have to worry about them all. Define some constraints. Let the language work out the details.

### A simple example

Let’s consider this CSS for a moment: `font-size: 2em`. What does it do? “It increases the font size,” you say. But that’s not all. It also adjusts the line wrapping of text in the container, as fewer words will now fit on each line. That in turn will often increase the number of lines of text: so it will also increase the container’s height to contain the new lines of text. When the container’s height changes, anything beneath it on the page will be shifted down accordingly. Finally, it also specifies a value for the local meaning of `em`. Any other properties defined using ems will have their computed values updated to match.

That one declaration creates a whole slew of changes on the page. And they’re all exactly what you should want: the content will always fit, elements aren’t going to wind up overlapping oddly, and anything defined in terms of the font size (like padding, perhaps) will adapt. You don’t have to worry about those details. The browser makes all those calculations and does the work by default.

If you want to stop these things from happening, you can. You could cap the container height with a `max-height` and `overflow: auto`. You could redefine padding to be in rems or px so it doesn’t adapt to the local font size. This highlights an interesting part of writing CSS: sometimes you’re not telling the browser what to do; you’re effectively telling it what *not* to do.

### Griddy goodness

Some of the newer features in CSS do even more. Flexbox and Grid are prime examples of this. With just a few declarations, you can build a grid layout that is extremely flexible and “just works”. You don’t have to worry about countless edge cases. You say, effectively “put these boxes in columns of about 400px wide” and it will do it for you. It takes about three lines of code.

If you were to do this imperatively, you would need to deal with all sorts of odd scenarios. What if there’s an extremely long word in one of the boxes? What if the viewport is very narrow? What if it’s very wide? What if one box has a ton of content and another contains just a few words? But chances are, in CSS, you don’t need to think about any of these things. All the hard thought for this has already gone into the spec, and the browser takes care of it for you. This is the power of a declarative language.

## CSS is contextual

In the React-era, we have embraced the extremely useful approach of modular, component-based development. CSS best-practices do this as well, with BEM and SMACSS and CSS-in-JS. I don’t want to belittle this, because this is an essential way of thinking when building large-scale applications. But I think it’s equally important to acknowledge that CSS is not 100% modular, nor should it be.

There are two reasons for this. First, and most obvious, is that your app should have some global styles. You will almost always want to set a default typeface and font size at the page level. These values will then be inherited by all descendant elements that don’t explicitly override them. You will also want certain aspects of your design to apply repeatedly throughout the page, such as theme colors, border radii, box shadows, and common margin sizes. More localized styles on the page will then assume these global styles are in place.

Second, and more subtle, is the way CSS and your styling decisions are informed by the surrounding context of the page. Consider applying the following CSS to an element:

```css
.the-thing {
  position: absolute;
  top: 10px;
  left: 10px;
}
```

What will this code do? Without knowledge of where the element is in the DOM and what styles are applied to the rest of the page, there is no way to know. Absolute positioning is made relative to the nearest positioned ancestor; applying it means different things depending on which ancestor, if any, has `position: relative` (or absolute, fixed, etc.) applied.

Furthermore, how you can (or cannot) stack one element in front of another is going to be highly dependent on where the two are positioned in the DOM.  Shuffling items around in the DOM can cause drastic effects on the way items fit together and stack. This is why stacking contexts are a vital (and often complicated) topic.

But the contextual nature of CSS is also due in part to the way design works. If an engineer designs a bridge, you can’t just look at the blueprint and say, “this is all good except this one beam here; go ahead and take that out”. Removing that beam has ramifications on the structural integrity of the whole thing. Similarly, changing one part of a design can have ramifications on how other items on the screen are perceived. Frequently, you will need to style multiple elements together, in conjunction.

If you make the heading in a tile bigger, for instance, it becomes more prominent to the user and therefore makes other items on the screen seem less important. The restrictions aren’t about physics in this case, but there are subtle rules of “soft science” that impact human perception. Parts of the page render in a physical space on screen, and the realities of the physical world (and how we perceive it) are important to be aware of.

We like to architect software using [principles of modularity and encapsulation](https://freecontent.manning.com/modular-css/). This makes sense in the world of code, because code is complicated and this breaks the problem up into manageable sizes. But we should also be aware that it isn’t always perfect. In CSS, we can never completely disregard what’s going on outside a given module.

## Summary

These three aspects make CSS different than conventional programming languages. These differences may feel foreign, but it’s these differences that make CSS so powerful. And it’s my suspicion that developers who embrace these things, and have fully internalized them, tend to be far more proficient in CSS.
