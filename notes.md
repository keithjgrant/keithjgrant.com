
# CSS Common Core

* 8 + 5 = ?
* step back, bigger picture
* https://atomiks.github.io/30-seconds-of-css/
* https://css-tricks.com/how-well-do-you-know-css-layout/

1. Debugging: always consider the context. DevTools is *always* the first stop. Figure out which properties need to change on which elements; then which declarations/selectors to enact that change.
2. Spacing elements in container?
3. V centering. break the problem down into component parts?
4. Don't set height.
5. Variables hierarchy

---

# How I debug a CSS problem

* edit in browser styles first!
  1. Figure out what styles you want applied
  2. Then figure out how to best apply them
* active styles near the top in devtools
* New things: get something rendering as early as possible
* Don't keep throwing styles at it till it works: if styles are causing a problem, figure out how to delete them.


# The Inherently Global Nature of Styling

* vertically centering a small box (like a login box).
  * need to set height/min-height on container
  * if container isn’t top level, you can’t know what that min-height should be (i.e. subtract height of header/footer to avoid scrollbars)


# Scoped CSS / First-class way to define base styles?


# In defense of the Open Web Platform

* You don’t need to hedge your bets against CSS, or write an abstraction layer above it.
  * Yes, give yourself shorthands for your particular app
  * But don’t think the web is just one platform among many.
* OWP is the one platform to rule them all.
* “Is the web a complile target?” — possible title?


# Design-y end of frontend dev is missing the point

* They don’t seem to fully grasp the problem, nor the complaints aimed at themselves.
* Try to frame things in a way that is familiar to them
* https://christianheilmann.com/2019/01/28/html-is-and-always-was-a-compilation-target-can-we-deal-with-that/
* Andy’s posts
* Def not to belittle the gender element: https://twitter.com/betsythemuffin/status/1090342513054007296
* https://twitter.com/amasad/status/1091029816596357120 "I've only seen gatekeeping used self-servingly"
* too many echo chamber posts
* title ideas:
  * "Beware the straw man"
  * "Wearing the other hat"

# The State of Web Components, 2019 -- from a React developer’s perspective

* “standards” world balked at React... then learned from it
* React world balked at web components... but will learn from it
* two camps screaming over each other, not realizing they’re caught in a mutually beneficial symbiotic relationship

# A thorough break down of word wrapping/breaking properties

* Yuck. Lots of research needed here :(
