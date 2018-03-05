+++
title = "HTML5 Sectioning and Landmark Elements"
date = 2018-03-05T12:09:47-05:00
tags = ["html"]

[image]
  url = "/images/2018/map-in-car.jpg"
  alt = "An open map on the dashboard of a car"
  align = "50% 45%"
  author = "Julentto Photography"
  authorUrl = "https://unsplash.com/photos/CIuakYIjadc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
+++

A little while ago, I wrote about the [`<dialog>` element](/posts/2018/meet-the-new-dialog-element/). But there are plenty of interesting HTML elements that have been around longer, since HTML5 was first introduced, so I’ve decided to expand it into a series.

Every now and then, I stumble across an element I haven’t heard of before. Some are interactive, and provide a surprising amount of functionality with little to no JavaScript. Others provide helpful semantic meaning and a welcome alternative to “div soup” in complex pages.

For the next few blog posts, I’m going to explore some aspects of HTML5 that maybe haven’t received as much attention as they deserve.

{{< alert >}}
This post is part of a series exploring HTML5 elements:

1. [Meet the New Dialog Element](/posts/2018/meet-the-new-dialog-element/)
2. HTML5 Sectioning Elements and Landmarks
3. *coming soon*
{{< /alert >}}

As a warm up, I’ll look at some elements from HTML5 that most web developers probably are somewhat familiar with: `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, and other structural, semantic elements. Even if you already use these elements, you might just learn a few new things along the way (I know I did as I researched this).

## Landmarks

When I first learned about HTML5 sectioning elements, I thought they were just a nice alternative to `<div>`. There’s more to the story than this, though.

Several of these elements define *landmarks* on the page. Landmarks are an accessibility feature that help identify the high-level regions of the page. The following elements define landmarks:

* `<main>`
* `<nav>`
* `<aside>`
* `<section>` — only if it has a title (`aria-labelled-by`, `aria-label`, or `title` attribute)
* `<header>` — if it not within one of the other landmark sections above
* `<footer>` — if it not within one of the other landmark sections above

The use of landmarks makes it easier for <abbr title="assistive technology">AT</abbr> users to find their way around the page. These don’t need to be the very top level of your DOM, but they should be near the the top. Your top-level landmarks should not be nested within one another, but you can group them using `<div>`s if necessary for your layout. *All content* on your page should be inside a landmark. The most important landmarks are `<main>` and `<nav>`.

Before HTML5, you had to use the `role` attribute to define landmarks. For instance, an HTML 4 `<div role="complementary">` can now be replaced with `<aside>`. It’s one way your markup can be simpler while still maintaining good accessibility practices.

{{< alert >}}
When HTML5 was new, many tutorials recommended including the `role` on these elements (`<main role="main">`) since screen readers hadn’t yet caught up with the new standard. The current W3C specification recommends you [don’t add the role attribute](https://www.w3.org/TR/html52/dom.html#do-not-set) for these elements, but it doesn’t hurt, especially if you want to support a broader range of browsers/screen readers.
{{< /alert >}}

A `<form>` also defines a landmark in most browser/AT combinations, but it can be nested inside the other landmarks listed above.

## Headers and Footers

Your page likely has a header and footer. That’s what `<header>` and `<footer>` are for. When used near the top-level of your DOM, outside any landmark elements, they denote landmarks for the page.

However, these elements aren’t restricted only to use at a high level. If you have multiple `<section>`s on the page, for instance, each can have its own `<header>` and/or `<footer>`. In this case, it won’t function as a landmark, but it does provide semantic meaning in context. For example:

```html
<article>
  <header>
    <h1>My useful blog post</h1>
    <p>Published March 5, 2018</p>
  </header>
  …
</article>
```

## Main vs. Article vs. Section

A lot of developers get tripped up by these three elements. What’s the difference between `<main>`, `<article>`, and `<section>`? Let’s take a look.

### Main

Your page should have only one `<main>`. This should contain the *(ahem)* main content of the page. There’s boilerplate stuff on most pages: the header, the navigation, maybe a sidebar or other peripheral content in one or more `<aside>`s. These regions of the page each belong in their own landmark. And there’s the main section, which is also a landmark.

If the page is a blog post, the `<main>` should contain the post title, content, and comments section. If the page is on a corporate site, the `<main>` should contain all the photos and informational tiles. Basically, if it’s not part of the nav, header, footer, or asides, it belongs in the `<main>`. (The `<main>` might have its own header and footer, too. See above.)

### Article

An `<article>` represents a self-contained piece of content. An article should have a heading (`<h1>`–`<h6>`) as a child element, indicating its title. A blog post, with its title, byline, and published date belong in an `<article>`, while any comments probably belong in a footer or aside.

The homepage of a corporate site, with photos and informational tiles, might have several `<article>`s, or might have none at all. The key here is “self-contained”: an `<article>` is something that could be removed from the page and still retain its meaning in isolation.

An article is not a landmark, so it belongs in one (probably the `<main>`).

### Section

If your content has multiple sections, you can use a `<section>` to contain each of these. You shouldn’t have one lone `<section>` on a page. A good rule of thumb is this: if the section could be an item in a table of contents, it might make sense as a `<section>`. An article, for instance, may consist of multiple sections.

A section is not a landmark. It belongs in one (probably the `<main>`). However, if you give a section a heading with an `aria-label`, `aria-labelled-by`, or `title` attribute, this promotes it to be a landmark. Avoid doing this if you have a large number of sections on the page, as too many landmarks can add to the noise, making them less useful as navigation tools.

Hopefully, this gives you a better idea of how some of these "bigger" HTML5 elements work. If you want to know more about landmarks and accessibility, check out the links below.

Next time, I’ll look at some HTML5 elements that are a bit more exotic.

## References

* [Accessible landmarks](http://www.scottohara.me/blog/2018/03/03/landmarks.html) by Scott O’Hara
* [ARIA landmarks example](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html)
* [Avoiding common HTML5 mistakes](http://html5doctor.com/avoiding-common-html5-mistakes/)
* [Sections, HTML 5.3 working draft](https://www.w3.org/TR/html53/sections.html)
