+++
date = "2017-05-05T09:44:55-04:00"
title = "Memorizing Alignment Properties"

+++
Do you often find yourself looking up a Flexbox [cheat sheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)? Wish you could just commit all those properties to memory and be done with it? Here’s how I memorized them.

## Learn “flex”

If you’ve worked with flexbox much, you might already have this one committed to memory. The `flex` property is itself shorthand for three other properties: `flex-grow`, `flex-shrink`, and `flex-basis`. But most of the time, the shorthand is all you need (and is even preferable).

If you’re not familiar with this shorthand yet, learn it first. Learn only it. Don’t worry about any of the rest until you get this down.

## Justify = horizontal

In Microsoft Word, if you “justify” text, you control how the text is spaced out horizontally. It spaces to be flush against the left and right sides.

In the same way, `justify-content` is used on a flex container to control how its flex items are spaced _horizontally_.

## Align = vertical

You know there’s a `vertical-align` property, right? Maybe it didn’t ever do what you expected it do, but you know it’s there. The same way, the `align-*` properties control _vertical_ alignment.

 * `align-content` controls how the rows of flex items align vertically within the flex container. (This generally only applies when you have flex-wrap enabled.)
 * `align-items` controls how the flex items align themselves vertically within each row.
 * `align-self` on a single flex item controls how that item is aligned vertically within a row, overriding its parent’s `align-items` setting.

## Hope that helps

If you can remember this rule, you’ll have a lot more of flexbox ready from memory. Note that **these swap if you change the flex direction** to “column” or “column reverse”.

As a bonus, these properties also apply to CSS Grid as well. Grid also brings in a `justify-items` and `justify-self` property to fill out the set. These work much like their `align-*` counterparts, but on the horizontal plane.
