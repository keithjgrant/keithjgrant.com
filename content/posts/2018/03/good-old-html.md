+++
title = "Good Old HTML"
date = 2018-03-01T10:56:47-05:00
tags = ["html"]
draft = true

[image]
url = "/images/2018/"
alt = ""
+++

<!--
https://www.w3.org/TR/html53/interactive-elements.html#the-details-element
https://codepen.io/keithjgrant/pen/eVxXQd
https://twitter.com/danielsdeboer/status/965766749026209792

landmarks:
https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html
-->

A little while ago, I wrote about the [new `<dialog>` element](/posts/2018/meet-the-new-dialog-element/). But there are plenty of interesting HTML elements that have been around since HTML5 was first introduced. Every now and then, I stumble across a new one I haven’t heard of before. Some are interactive, and provide a surprising amount of functionality with little to no JavaScript. Others provide helpful semantic meaning and a welcome alternative to “div soup” in complex pages.

For the next few blog posts, I’m going to explore some aspects of HTML5 that maybe haven’t received as much attention as they deserve.

As a warm up, I’ll look at some elements from HTML5 that most web developers probably are somewhat familiar with: `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, and other structural, semantic elements. You’ve probably heard some of this stuff before, but a refresher never hurts.

## Landmarks

When I first learned about HTML5 sectioning elements, I thought they were just a nice alternative to `<div>`. There’s more to the story than this, though.

Several of these elements define *landmarks* on the page. Landmarks are an accessibility feature that help identify the high-level regions of the page. The following elements define a landmark:

* `<main>`
* `<nav>`
* `<aside>`
* `<section>` — as long as it has a title (`aria-labelled-by`, `aria-label`, or `title` attribute)
* `<header>` — if it not within one of the other landmark sections above
* `<footer>` — if it not within one of the other landmark sections above
* `<form>`

The use of landmarks makes it easier for screen reader users to find their way around the page. These don’t need to be the very top level of your DOM, but they should be near the the top. Landmarks should not be nested within one another, but you can group them using `<div>`s if necessary for your layout. *All content* on your page should be inside a landmark. The most important landmarks are `<main>` and `<nav>`.

Before HTML5, you had to use the `role` attribute to define landmarks. For instance, an HTML 4 `<div role="complementary">` can now be replaced with `<aside>`. It’s one way your markup can be simpler while still maintaining good accessibility practices.

{{< alert >}}
When HTML5 was new, many tutorials recommended including the `role` on these elements (`<main role="main">`) since screen readers hadn’t yet caught up with the new standard. This doesn’t seem to be necessary anymore, but please correct me if I’m wrong about this. The current W3C specification explicitly recommends you [don’t add the role attribute](https://www.w3.org/TR/html52/dom.html#do-not-set) for these elements.
{{< /alert >}}

## Headers and Footers

You page likely has a header and footer. That’s what `<header>` and `<footer>` are for. When used near the top-level of your DOM, outside any landmark elements, they denote landmarks for the page.

However, these aren’t restricted only to use at a high level. If you have multiple `<section>`s on the page, for instance, each can have its own `<header>` and/or `<footer>`. In this case, it won’t function as a landmark, but it does provide semantic meaning in context.

Example:

```html
<article>
  <header>
    <h1>Don’t forget about HTML</h1>
    <p>Published March 5, 2018</p>
  </header>
  …
</article>
```

## Main vs. Article vs. Section

A lot of developers get tripped up by these three elements. What’s the difference between `<main>`, `<article>`, and `<section>`? I think the answer is to not overthink it.

### Main

Your page should have only one `<main>`. This should contain the *(ahem)* main content of the page. There’s boilerplate stuff on most pages: the header, the navigation, maybe a sidebar. Then there’s the main section. These regions of the page each belong in their own landmark.

If the page is a blog post, the `<main>` should contain the post title, content, and comments section. If the page is on a corporate site, the `<main>` should contain all the photos and informational tiles. Basically, if it’s not part of the nav, header, footer, or sidebar, it belongs in the `<main>`. (The `<main>` might have its own header and footer, too. See above.)

### Article

An `<article>` represents a self-contained piece of content. A blog post, with its title, byline, and possibly its comments belong in an `<article>`. The homepage of a corporate site, with its photos and informational tiles, probably won’t have an article. An article should have a heading (`<h1>`–`<h6>`) as a child element, indicating its title.

An article is not a landmark, so it belongs in a landmark (probably the `<main>`).

### Section

If your content has multiple sections, you can use a `<section>` to contain each of these. You shouldn’t have one lone `<section>` on a page. A good rule of thumb is this: if the section could be an item in a table of contents, it might make sense as a `<section>`. An article, for instance, may consist of multiple sections.

Like an article, each section should have a heading. This should be clearly called out with an `aria-label` or `aria-labelled-by` attribute on the section tag:

```html
<section aria-label="Some fancy new thing">
  <h2>Some fancy new thing</h2>
  …
</section>
<section aria-labelled-by="heading-c">
  <h2 id="heading-c">Another fancy thing</h2>
  …
</section>
```

A section is not a landmark. It belongs in a landmark (probably the `<main>`).

## References

* [ARIA landmarks example](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html)
* [Avoiding common HTML5 mistakes](http://html5doctor.com/avoiding-common-html5-mistakes/)
* [Sections, HTML 5.3 working draft](https://www.w3.org/TR/html53/sections.html)
