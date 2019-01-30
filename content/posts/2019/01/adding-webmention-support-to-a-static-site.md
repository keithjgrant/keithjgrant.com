+++
title = "Adding Webmention Support to a Static Site"
date = 2019-01-21T11:47:33-05:00
tags = ["indieweb", "webmentions"]
draft = true

[image]
  url = ""
  alt = ""
  align = "50% 50%"
  author = ""
  authorUrl = ""
+++

{{< alert >}}
This is Part 3 in a series exploring short-form posting, the IndieWeb, and taking control of your own online social workflow for your statically-generated site:

1. [A Low-Friction Workflow for Short-form Posting on A Statically Generated Site](/posts/2019/01/low-friction-workflow-for-notes/)
2. [Preparing Your Site for Posting Notes](/posts/2019/01/preparing-your-site-for-posting-notes)
3. **Adding Webmention Support to a Static Site**
4. Using Micropub to Post to a Static Site &mdash; _Coming soon_
{{< /alert >}}

Webmentions are a key building block of the IndieWeb.
They are they way for one webpage to notify another when it has linked to it.
This is based on a [W3C Recomendation spec](https://www.w3.org/TR/webmention/).

In this post, I will show you how to set up webmentions for a statically-generated site.
This is not the only way to do it, but it is how I do it for this site, so I know it works.

## Receiving Webmentions

A webmention is sent as a POST request containing two pieces of information: a _source_ URL and a _target_ URL.
The page at the source URL must include a link to the target URL, which the webmention endpoint will verify before accepting the webmention.
(You won’t actually have to implement this, but it’s worth knowing for context.)

In [the previous post](/posts/2019/01/preparing-your-site-for-posting-notes), I showed you how to sign in to a service called [webmention.io](https://webmention.io).
This will provide your site’s webmention endpoint.
When someone links to a page on your site, they can notify the endpoint, and you can choose what to do with that webmention.

You will have to make this endpoint known so you can receive webmentions.
Log-in to webmention.io, and navigate to the [settings page](https://webmention.io/settings).
This will provide you with two `<link>` tags you should add to the `<head>` for every page on your site.
They will look something like this (with your site’s URL in place of `keithjgrant.com`):

```html
<link rel="webmention" href="https://webmention.io/keithjgrant.com/webmention" />
<link rel="pingback" href="https://webmention.io/keithjgrant.com/xmlrpc" />
```

Add this to your site.
This tells other sites what endpoint to send their webmentions to.
(It also includes a pingback endpoint for sites that support the older standard instead&mdash;webmention.io will handle both for you).
Webmention.io provides you with a feed you can subscribe to to see all webmentions you receive.
The url is listed on the settings page.

### Displaying webmentions on your site

Part of the fun of webmentions is being able to display the replies, likes, and shares of your content you receive.
If you want, you can add some JavaScript to your site to fetch these, and add them to the page beneath your posts.

How you add these to your page will be unique to your site’s design,
so I can’t give you exact code to copy and paste,
but I’ll highlight the key things I do for my site.
Here is my [source code](https://github.com/keithjgrant/keithjgrant.com/blob/master/themes/shindig/static-src/js/webmentions.js) for this.

First, perform a GET to `https://webmention.io/api/mentions?perPage=500&jsonp=parseWebmentions&target={PAGE_URL}`,
where `{PAGE_URL}` is the current page.
You will need to use [JSONP](https://stackoverflow.com/questions/2067472/what-is-jsonp-all-about#2067584) so you can make the request cross-domain.
This url specifies the JSONP function `parseWebmentions`, which you will need to include in your page’s script.
This function must be defined as a global, so the webmention.io script can invoke it.

The `parseWebmentions()` function will be invoked with an array of objects, each representing a webmention you’ve recieved, including metadata about the source page that sent it.
Each one of these objects will look something like this:

```js
{
  "source":"https://example-site.com/2019/01/22/the-secret-weapon-to-learning-css/",
  "verified":true,
  "verified_date":"2019-01-22T17:06:39+00:00",
  "id":580804,
  "private":false,
  "data":{
    "url":"https://example-site.com/2019/01/22/the-secret-weapon-to-learning-css/",
    "name":"admin",
    "content":null,
    "published":null,
    "published_ts":null,
    "author": {
      "name": "John Smith",
      "url": "https://example-site.com",
      "photo": "https://example-site.com/avatar.jpg"
    }
  },
  "activity":{
    "type":"link",
    "sentence":"https://example-site.com/2019/01/22/the-secret-weapon-to-learning-css/ posted '' linking to https://keithjgrant.com/posts/2019/01/css-mental-model/",
    "sentence_html":"<a href=\"https://example-site.com/2019/01/22/the-secret-weapon-to-learning-css/\">someone</a> posted '' linking to <a href=\"https://keithjgrant.com/posts/2019/01/css-mental-model/\">https://keithjgrant.com/posts/2019/01/css-mental-model/</a>"
  },
  "target":"https://keithjgrant.com/posts/2019/01/css-mental-model/"
}
```

I sort these chronologically (using `webmention.data.published` or `webmention.verified_data`).
Then I put them into three different arrays:
one for likes (`webmention.activity.type === 'like'`),
one for reposts (`webmention.activity.type === 'repost' || webmention.activity.type === 'link'`),
and one for replies (everything else).
I then have code to convert the metadata into DOM elements and add them to the page in the appropriate place.
Again, feel free to rework [my code](https://github.com/keithjgrant/keithjgrant.com/blob/master/themes/shindig/static-src/js/webmentions.js) to suit your purposes for this&mdash;I include a `<template>` on my page for these, which I clone into the page and hydrate with the fetched data.

If you really want to get fancy, you can fetch your webmentions every time your site builds, and add them into the initial render of the page.
If you go this route, however, you should probably make an additional fetch from the client side to pick up any webmentions that you’ve received since the last time you built your site.

## Enhancing with Microformats

When a webmention is sent, it includes only the source URL and the target URL.
But you’ll notice in the payload received from webmention.io
there is a whole lot more information included.
This is all information it was able to parse from the page at the source URL.
How much it is able to figure out will depend largely on whether or not the page uses _microformats_ in its markup.

Microformats are a series of class names added to the markup to help indicate the meaning of the parts of a page.
I strongly urge you to add [microformats support](http://microformats.org/wiki/microformats2) to your site.
Most tools for working with webmentions expect microformats to be there, so this will be essential for using some IndieWeb tools.

There are two types of microformat that you should add to your site first: [h-entry](http://microformats.org/wiki/microformats2#h-entry) and [h-card](http://microformats.org/wiki/microformats2#h-card).
An h-entry allows you to identify the key elements of a post, including url, title, publish date, and content.
An h-card identifies an author, including name, website url, and an avatar image.

Add the classes for an h-entry to the markup for every post on your site.
Here is a sample post with h-entry microformat classes added:

```html
<div class="note note--list h-entry">
  <div class="note__date">
    <a
      class="u-url dt-published"
      href="https://keithjgrant.com/replies/2019/01/yes-do-it/"
    >10:24 AM EST • 14 Jan 2019</a>
  </div>
  <div class="metadata text-left">in reply to
    <a
      class="u-in-reply-to" rel="in-reply-to"
      href="https://twitter.com/SaraSoueidan/status/1084833046140981248"
    >a post on twitter.com</a>
  </div>
  <div class="note__body e-content show-embeds">
    <p>Yes! DO IT ✨</p>
  </div>
</div>
```

The essentials here are the classes `h-entry`, `u-url`, and `e-content`.
`h-entry` must be on an element containing the entire post.
The other microformat classes within indicate further metadata on this entry.
`u-url` indicates the canonical URL of this post (specified in the `href` attribute).
`e-content` denotes the body of the post.
`p-name`, when present, indicates the title of the post
(this post has no title because it is a short-form note rather than a full blog post).
Some other useful classes an h-entry might have are `u-in-reply-to` or `u-like-of`, indicating the post is a reply to or “like” of a post elsewhere on the web,
and `dt-published` to indicate the publish date.

The tag names are irrelevant;
use correct semantic HTML elements,
and add microformat classes to indicate what the elements mean as part of the post.

Your homepage should have an h-card on it somewhere, providing data about you.
Here is an example h-card:

```html
<div class="h-card p-author">
  <h1 class="title-bar">
    <a class="u-url" href="/">
      <span class="p-name">Keith J. Grant</span>
    </a>
  </h1>
  <img class="title-avatar u-photo" src="/images/keithjgrant.jpg">
</div>
```

Here, `h-card` indicates this is an author card.
`u-url` denotes my primary url (the homepage of the site).
`p-name` indicates my name and `u-photo` indicates the image I would like to use as my avatar.

You can also nest microformats.
It is a good idea to add an author card inside every post.
When this `h-card` is placed inside of an `h-entry`, the `p-author` class indicates that I am the author of that post.
So when I reply to a post elsewhere on the web, the site that recieves my webmention can parse some data about me and my reply, and present them in a way that is well formatted.
This sort of metadata is what allows me to present not just replies to my posts, but also the author’s name and image alongside:

![Two replies to a previous post of mine. Each reply includes the author’s name and small avatar image.](/images/2019/social-web/webmentions-formatted.png)

Adding microformats can be a bit troublesome, because it’s hard to know whether you’ve done it correctly or not.
One tool to help with this is [X-Ray](https://xray.p3k.io/).
As you integrate microformats on your site, plug in the URL to a post into X-Ray and see what kind of metadata it finds.
This will display as a JSON object:

![A sample JSON result from X-Ray after parsing one of my posts](/images/2019/social-web/x-ray-results.png)

## Integrating with Twitter

Webmentions are fantastic for interacting with other blogs, but what about social media?
Twitter doesn’t support webmentions, but there is a tool called [Bridgy](https:/brid.gy) that can add this support for you.
If you send Bridgy a webmention, it will post your note to your social network accounts for you.
And if those posts get replies (or likes, or reposts), Bridgy will send you valid webmentions letting you know about them.

To setup Bridgy for Twitter, visit [brid.gy](https://brid.gy) and click the Twitter button where it says “Connect your accounts”.
This will take you to twitter, and will ask you to grant Bridgy access to post to your Twitter account.
Click “Authorize app” to give it access.


## Send your first webmention

## Sending Webmentions
