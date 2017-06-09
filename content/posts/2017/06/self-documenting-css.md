+++
date = "2017-06-09T13:34:24-04:00"
title = "Thoughts on Self-Documenting CSS"

+++
One of the best programming books I’ve ever read is [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/) by Robert C. Martin. If you have never read it, add it to your list.

<blockquote>
  Every comment represents a failure to make the code self explanatory.
  <cite>Robert C. Martin</cite>
</blockquote>

In one section, Martin discusses code comments, and makes a strong argument against them. I won’t repeat all his arguments, but in short he maintains they have a tendency to fall out of date. The computer ignores them, so nothing guarantees they accurately describe what the code does. It is far better when the code itself is clear; then both the programmer and the computer are reading the same thing.

Consider the following:

```js
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) {
  …
}
```

Is the comment helpful? Absolutely. But this is better:

```js
if (employee.isEligibleForFullBenefits()) {
  …
}
```

The code says what it means and does what it says. Much of the time, a comment can be improved by deleting it and encapsulating meaning in well-named functions or variables. To be clear, Martin does not say comments should *never* be used&mdash;but you should always strive to render them unnecessary. Every comment represents a failure to do so.


## What about CSS?

I agree with Martin regarding comments. However, this thinking raises interesting questions when it comes to a declarative language like CSS. Declarations have to follow a strict pattern. Selectors are determined by the structure of the HTML, at least in part. You have far fewer options regarding code structure. Does this mean your CSS should have comments all over the place?

Well… maybe. We use comments different ways for a variety of reason. Let’s look at some comments, and consider what they add (or not) to the code. I’ll start with some low-hanging fruit, then move on to the less obvious stuff.


## Bad: Obvious Comments

In any language, obvious comments are unnecessary. The following are actual examples of comments from an earlier version of Bootstrap 3 source:

```sass
// Addresses
address {…}
```

Yes, that does appear to be a selector for addresses.

```sass
// Unordered and Ordered lists
ul,
ol {…}
```

Really?

```sass
// Blockquotes
blockquote {…}
```

OMG. Make it stop.

Don’t do comments like this. Delete that crap. It’s only echoing what’s already there in the code. Thankfully, most of these have been removed in newer versions of Bootstrap.


## Bad: Section Separators

One type of comment that’s mostly unique to CSS are section separators. This sort of thing:

```css
/* -----------------
 * TOOLTIPS
 * ----------------- */
```

These things drive me nuts. Don’t get me wrong; I understand why we have them. Our stylesheets can get really long. When scrolling through a 1000 line file, you need landmarks like this to help navigate.

But here’s the thing: we don’t work in 1000 line files any more. If your project needs a stylesheet this large, it should be broken out into bite-sized partials and you should be using a preprocessor to piece them all together. You don’t need a big `TOOLTIPS` at the top of the file if the file is called `tooltips.scss`. If you feel like you need a separator comment, split the code into a new file.


## Bad: Explaining the Language

I’m going to pick on Bootstrap again. This is from their [_tooltips.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_tooltip.scss#L11):

```
// Allow breaking very long words so they don't overflow the tooltip's bounds
word-wrap: break-word;
```

This is very close to the category of “obvious comments.” This comment explains what the `word-wrap` property does, and no more. There is another rule of code comments that says a comment should explain [why, not what](https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/). This comment breaks that rule. Delete it.

There might be a fuzzy bound here in CSS, however. There are hundreds of properties, and you probably don’t know them all. If you’re using something *really* obscure, maybe a comment like this is okay. Maybe.


## Bad: Explaining the Library

Let’s look at another comment from the same Bootstrap file:

```sass
// Our parent element can be arbitrary since tooltips are by default inserted as a
// sibling of their target element. So reset our font and text properties to avoid
// inheriting weird values.
@include reset-text();
font-size: $font-size-sm;
```

This one is interesting. It seems to pass the “why, not what” sniff test. It explains that unexpected font properties might be inherited by this module, then uses a mixin to reset the font properties.

But upon further reflection, it’s obvious that this is the only reason the mixin exists in the first place. In fact, a search through the codebase reveals an identical comment every place this mixin is used. At the very least, this comment belongs where the mixin is defined, not each and every place it is used. You could move the comment there and cut down the number of comments cluttering the code.

However, I think even that is unnecessary: the name of the mixin provides enough information. And if it doesn’t, give it a name that does. Call it `reset-inherited-font` or something more explicit that makes clear not only what it does, but why you need it. This is a function call; you have total control over the name here. Use that to your advantage and make it say what it does in a way that renders the comment unnecessary.

Preprocessors are one area where CSS is most like a conventional programming language. When you have the chance, use well-named variables and mixins to make the meaning of the code obvious. This code snippet gets this right with the `$font-size-sm` variable: you know at a glance that the font is smaller than the main font size. You can also safely infer that this is a commonly-used font size; it is the same font size as other small text throughout the codebase.


## Bad: Old Comments

```css
.dropdown-header {
  …
  white-space: nowrap; // as with > li > a
}
```

["as with > li > a"](https://github.com/twbs/bootstrap/blob/620257456ed0685cae6b6ff51d2ab1e37f02a4fa/scss/_dropdown.scss#L122)? What does that mean? My first assumption is that, elsewhere in the file, there is an `> li > a` selector and this somehow refers to that. Maybe there’s another comment there explaining the reasoning… But scanning through the file, there is no such selector. There is another `nowrap` under a `.dropdown-item` selector. Maybe that’s what this refers to? Or maybe it refers to something that has since been deleted or refactored into another file? The only way to know would be to dig through the git history.

This is an old comment. It presumably meant something at some point in time, but the code has long-since drifted from that. This gets back to one of the main reasons Robert Martin is so hard on comments: the code changes out from underneath them and they become meaningless&mdash;or worse: they lie and actively lead you in the wrong direction. When you find a comment like this, delete it. It adds nothing to the code and has in fact has wasted our time trying to make sense of it.


## Sometimes OK: Meaningful Comments

Here’s another block of code with several comments:

```sass
.dropdown-item {
  display: block;
  width: 100%; // For `<button>`s
  padding: $dropdown-item-padding-y $dropdown-item-padding-x;
  clear: both;
  font-weight: $font-weight-normal;
  color: $dropdown-link-color;
  text-align: inherit; // For `<button>`s
  white-space: nowrap;
  background: none; // For `<button>`s
  border: 0; // For `<button>`s
}
```

These comments are meaningful. They tell me that several of these properties are applied specifically to override `<button>` styles. These are good comments, because that is not immediately obvious.

But it’s worth asking the question: is there a way to express this in the code itself? You could move those particular declarations into a second ruleset that targets buttons specifically:

```sass
.dropdown-item {
  display: block;
  padding: $dropdown-item-padding-y $dropdown-item-padding-x;
  clear: both;
  font-weight: $font-weight-normal;
  color: $dropdown-link-color;
  white-space: nowrap;
}

button.dropdown-item {
  width: 100%;
  text-align: inherit;
  background: none;
  border: 0;
}
```

This is very explicit and easily understood. Unfortunately, it also raises the selector specificity. That’s a side-effect that may not be acceptable.

Instead, I think this is a strong candidate for a mixin. Refactoring to a mixin could mean cleaning up the code in several other places as well. Consider this version:

```sass
.dropdown-item {
  @include remove-button-styles;

  display: block;
  width: 100%;
  padding: $dropdown-item-padding-y $dropdown-item-padding-x;
  clear: both;
  font-weight: $font-weight-normal;
  color: $dropdown-link-color;
  white-space: nowrap;
}
```

It’s clear what this does without any comments, and it gives me a mixin that performs a fairly common action, so other modules elsewhere could benefit from the same change. I did keep the `width: 100%` here rather than moving it into the mixin, because that might cause unexpected breakages if the mixin applied that elsewhere.

Furthermore, the original ruleset had ten declarations. That’s about as long as I like to get, before I start thinking [“code smell”](https://en.wikipedia.org/wiki/Code_smell). A mixin is a great way to shorten things up. It’s easier to get an overall feel for what this ruleset does at a glance.

Refactoring to a mixin won’t always be a preferable option, but look for it.


## Good: Annotate Obscure Bugfixes

I’ve brought the hammer down hard on comments here. But I’m not always opposed. If you’ve ever looked at the source for [normalize.css](https://github.com/necolas/normalize.css/blob/master/normalize.css), you’ll notice it’s chock-full of comments. And I’d say, most of them are *great* comments.

Look at this beauty:

```css
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}
```

Without those comments, you would never know why those rules are there. When you code around a particular browser bug, it’s often something obscure and hard to remember. I am fully in support of comments like this. And if you examined this in the wrong browser, you might mistakenly think the rule is no longer needed and delete it.

Normalize in particular needs a lot of comments because it’s made up entirely of base styles. The selectors are all type selectors and attribute selectors. There are no classnames in sight, because they aren’t naming and styling classnames, so self-documentation is more difficult.

Here’s another comment from Bootstrap:

```css
/* Chrome (OSX) fix for https://github.com/twbs/bootstrap/issues/11245 */
select {
  background: #fff !important;
}
```

A url to an issue on Github! That’s helpful. It tells me, without even following the link, that this was a bug, and it may have been hard to track down. If I need to go read up on it, I can do so and get all the dirty details. And best of all, it hasn’t cluttered up the code with a lengthy paragraph that attempts to summarize the full issue. It gives the browser (and OS) info I need, and tells me where I can find out more. Alternately, if you use a private issue tracker like JIRA, you can put just an associated ticket number in the comment.

You don’t need to do this to every bug you fix. But if it’s not obvious, and especially if it’s related to a browser quirk, go for it.


## Good: Mandatory Comments

Some tools like [KSS](https://github.com/kss-node/kss-node) build a styleguide from comments in your CSS:

```css
/*
Alerts

An alert box requires a contextual class to specify its importance.

Markup:
<div class="alert {{modifier_class}}">
  Take note of this important alert message.
</div>

alert-success   - Something good or successful
alert-info      - Something worth noting, but not super important
alert-warning   - Something to note, may require attention
alert-danger    - Something important. Usually signifies an error.

Styleguide Alerts
*/
```

This is not just a comment; it is code. It is parsed by KSS and used to generate HTML output. It is part of your documentation. And, I would say, this is *better* than a separate hand-build HTML file, because it is co-located in the same file and more likely to stay in sync with the code.

Another type of mandatory comments are licenses. When you use a third-party library with a license in a comment, you typically need to include that.


When I pull out [Robert Martin quotes](https://twitter.com/keithjgrant/status/867803638026035200) about comments, it tends to get a reaction. I don’t do it to be contrary. I do it because I believe in straightforward code that’s easy to understand quickly. If you’re littering your code with comments, be sure it’s not because you’re doing exactly the opposite.
