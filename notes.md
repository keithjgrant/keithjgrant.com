
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
