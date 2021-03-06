+++
aliases = ["/posts/separation-of-concerns.html"]
date = "2016-12-23T00:00:00-05:00"
title = "Let’s Talk About Separation of Concerns"

+++
There’s been a lot of talk lately about good old Separation of Concerns &mdash; primarily in the context of React and the use of inline styles or CSS-in-JS. Advocates of these approaches argue that the language we use (be it JS, HTML, or CSS) is an arbitrary line to draw. And I would say: Yes, language is, for the most part, an arbitrary line. But that’s beside the point.

So let’s get one thing straight. This...

```
import styles from './tile.css';
...
render() {
  return <div className={styles.tile}>...</div>;
}
```

...is architectually equivalent to this:

```
render() {
  return <div className="tile">...</div>;
}
```

The latter approach, however:

1. requires a drastically simpler build process
2. is both backwards- and forwards-compatible across all frameworks
3. doesn’t try to pretend that those styles exist in perfect encapsulated isolation

Stop championing CSS-in-JS as some ground breaking re-thinking of Separation of Concerns. It’s not. The React component will still inherit its font face, color, and size from a parent container. It still exists on the web platform, in an HTML document, where all the rules of styles and inheritance still apply.

We can debate about class name collision, co-locating stylesheets, <a href="/posts/css-first.html">how styles fit into system archetecture</a>, and other related topics. But let’s take this one off the table, because it’s a straw man argument.
