+++
aliases = ["/posts/into-the-future-of-css.html"]
date = "2015-05-30T00:00:00-05:00"
title = "Into the future of CSS"

+++
In my <a href="/posts/2015/05/against-css-in-js.html">last post</a>, I laid out why I think moving our CSS into JavaScript is not a good idea.  If am totally honest, however, I have to admit I brushed off the concerns <a href="https://twitter.com/vjeux">Christopher Chedeaux</a> raises in his slidedeck.  The seven problems he named can be mitigated by best practices, and most of us can do just fine, because we do not often work in apps of the same scale as Facebook or Google.  But that does not mean the problems aren't worth discussion.

I may disagree with the solution proposed by the ReactJS team, but I think they are doing something very important by bringing these problems to the forefront.  I shot down their ideas in my last post, so now I want to follow up with some constructive ideas.

## A Way Forward

We need to figure out how to solve these problems.  Not just mitigate them or work around them, but full solutions that work at scale.  And if the current spec does not provide the means, we should work to discover what additions to the spec can get us there.

I think our best bet is learning from JavaScript, or more specifically, CoffeeScript and Babel.  Now that ES6 features are becoming supported more and more in browsers, we can see that CoffeeScript played an important role in making that happen.  CoffeeScript brought new syntax and important improvements like auto bound functions (i.e. <code>=&gt;</code>) and, thanks to a transpiler, made them possible even before browsers supported them.  Now, some of these features have made their way into ES6 and with them, a breath of new life.  Even more new features are being proposed, and we can use them today with Babel.

We already have two promising libraries, doing for CSS what Babel does for JavaScript: <a href="https://github.com/postcss/postcss">PostCSS</a> and <a href="http://cssnext.io/">cssnext</a>.  These transpile CSS using the latest spec into compatible CSS that works in browsers today.  This is huge.  Things that we've relied on SASS and LESS for can now be done in "pure" CSS, namely variables and advanced color functions.  They also include support for things like custom media queries and custom selectors.  If you are not familiar with either of these libraries, they are worth reading up on.

The problem is these additions to spec are not all that exciting.  Variables and color functions are nice conveniences, but they do little to solve the real difficulties we face with CSS at scale.  I think, instead of emulating Babel, we need to emulate CoffeeScript.  It pushed the boundaries of JS, and now, as a result, 60% of ES6 features came straight from CoffeeScript.  Let's do the same thing with CSS.  Think outside the box, and dream up new features to help.  PostCSS is especially good for this, because it is modular.  We just need to start writing some experimental plugins.

## Scoped CSS

One cutting-edge feature that I think has promise is <a href="http://davidwalsh.name/scoped-css">scoped css</a>.  This allows us to add a "scoped" attribute to a style tag, and those styles will only be applied to the parent element of the style tag and its descendants.  For example:

```html
<div class="outer">
  <p>Normal black text</p>
  <div class="inner">
    <style scoped>
      p { color: red; }
    </style>
    <p>Red text!</p>
  </div>
  <p>Normal black text</p>
</div>
```

These can be nested, and scoped elements can even be targeted in our regular stylesheet with the <code>:scoped</code> pseudo-class.  Scoped styles override styles from a higher-up scope or the global page, regardless of selector specificity.

The spec for this was proposed in 2011, and not much has happened with it since then.  Only Firefox has added support.  Chrome added support behind an experimental features flag&mdash;but has since removed it.  There are polyfills available, but as it is, this has not gone very far, and it's not hard to see why.  Who wants to write a bunch of CSS inline in the document?  That feels more like a step backwards.

So, here's an idea.  What if we assigned a value to the scoped attribute, <code class="prettyprint">&lt;style scoped="widget"/&gt;</code>, and then create an at-rule to define a named scope, maybe something like this:

```css
@scope('widget') {
  p {
    color: red;
  }
}
```

This would define a set of scoped styles and assign them a scope name, then we can use that name to apply those styles to our component wherever we put it on the page.  Then we could combine a PostCSS plugin with a polyfill to make it work.  Again, this is just an idea.  I don't really know how well it will solve our difficulties in practice, but I would sure like to try.  It sure seems to have promise at addressing nearly all of Christopher Chedeaux's seven problems with CSS at scale.

## Let's Start Experimenting

Maybe my enhanced scope idea won't work out.  Maybe someone else will come up with a better idea.  Either way, I think we need to try.  Perhaps there is something to be found if we augmented <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@namespace">@namespace</a> instead.  Maybe the answer lies with the shadow DOM and web components, or something else entirely new.

My hope here is not that we come up with a postprocessor or polyfill library that makes CSS easier, though that is the first step.  My hope is ultimately that we find a way to solve the problems we have, and that the best solution makes its way into the official spec, after we prove it out on production sites. Who knows?  Maybe if PostCSS or cssnext keeps gaining traction, we will invent entirely new polyfills for the future that address any number of issues.  JavaScript has got a lot of momentum moving forward.  It's time for CSS to do the same.
