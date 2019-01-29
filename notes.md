
* The invisible parts of HTML

Play off of https://madebymike.com.au/writing/the-invisible-parts-of-CSS/

* Why can’t we have a parent selector!?
* Page transitions on a statically-generated site
* In defense of human curation: news, music, TV, etc.
* prioritizing font loading


---

CSS Common Core
* 8 + 5 = ?
* step back, bigger picture
* https://atomiks.github.io/30-seconds-of-css/

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
