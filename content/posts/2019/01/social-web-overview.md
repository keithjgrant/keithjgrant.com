+++
title = "Short-form Posting on a Static Site: Overview"
date = 2019-01-14T11:47:33-05:00
tags = ["indieweb", "webmentions"]
draft = true

[image]
  url = "/images/2019/vintage-phones.jpg"
  alt = "Three vintage rotary payphones hanging on a wall"
  align = "50% 50%"
  author = "Pavan Trikutam"
  authorUrl = "https://unsplash.com/photos/71CjSSB83Wo"
+++

{{< alert >}}
This post is part of a series exploring short-form posting, the IndieWeb, and taking control of your own online social workflow for your statically-generated site:

1. Overview
2. **Coming soon**
{{< /alert >}}

I am thrilled to see
[more](https://andy-bell.design/notes/97/) and
[more](https://www.zachleat.com/web/notes/) folks are
[moving to their blogs](https://twitter.com/SaraSoueidan/status/1084833046140981248) for posting short _notes_.
Of course, as they do this, they inevitably start grappling with the question:
“How do I make sure these notes are copied to Twitter?”
And maybe also: “How do I make the process quick and seamless?”

I gave a talk a while back titled [The Decentralized Social Web](https://www.recallact.com/presentation/decentralized-social-web) where I covered the general principles to make this work.
This is known as the _IndieWeb_.
But I haven’t covered the specifics of how I set this up for my site.
I am frequently asked about my notes and replies on Twitter, and have promised a write-up repeatedly.
It’s taken me far too long, but this is that write-up.

## Getting on the IndieWeb

If you’re the type of person who uses a static site generator
(i.e. a developer or at least rather technically literate),
you should be able to set this stuff up yourself.
None of it is too complicated, but there are a lot of pieces to it.

Each piece on its own is fairly straightforward, and there is a sort of exponential return:
the more of these pieces you put in place, the more they work together to give you a smooth workflow.
Which is why I want to start by illustrating the final experience.
I will avoid bogging this down with the “how” (those will come in the following posts) and will instead focus on “what”. I will get into the specific details in the following posts.

If you already have a blog or website: Congratulations! You’re already on the IndieWeb. The rest is a series of enhancements you can make to add to that experience.

## The magic in action

I write my notes using the [Omnibear](https://omnibear.com) browser plugin (available for Chrome and Firefox).
I type what I want to say, check the “syndicate to Twitter” box if I want it copied to Twitter as well, and click Post.

![Screenshot of drafting a short note in the Omnibear Firefox plugin](/images/2019/social-web/omnibear-note.png)

This adds the entry to my site, which usually publishes in around 45&ndash;60 seconds (the time it takes for Netlify to rebuild my site).
After another minute or so, a copy of the note appears on Twitter,
along with a link back to the original on my site.
If people reply to the post on Twitter, those replies are automatically
[copied back to my site](https://keithjgrant.com/notes/2019/01/i-wish-everybody-arguing-about-the/#comments).

I can also reply to tweets. On twitter.com, I can right-click on a tweet and select “Reply to entry”.

![Screenshot a tweet, highlighted with a yellow outline. A context menu is open with the option "Reply to entry" selected](/images/2019/social-web/reply-on-twitter.png)

This opens the Omnibear window and allows me to write my reply.

![Screenshot of drafting a reply to a tweet. The tweet I am replying to is outlined in yellow and a small popup window beneath it contains the Omnibear drafting page.](/images/2019/social-web/omnibear-reply.png)

As before, this [posts to my site](https://keithjgrant.com/replies/2019/01/yes-do-it/). Shortly thereafter, the reply is [copied to twitter](https://twitter.com/keithjgrant/status/1084834425966346242).

![Screenshot of the reply on Twitter](/images/2019/social-web/reply-syndicated.png)

Hopefully, this sort of workflow sounds appealing to you.
So if you want to know how to do this stuff, stay tuned.

## A new type of web standards

When we developers talk about _Web Standards_, we tend to talk about the basic building blocks of web pages: HTML, CSS, JavaScript.
But there are more standards beyond these languages.
The W3C, in fact, has a Social Web Working Group.
This group has published several standards.

Two key standards to know are [Webmention](https://www.w3.org/TR/webmention/) and [Micropub](https://www.w3.org/TR/micropub/).

**Webmention** is a way to let another webpage know when you have linked to it.
This is similar to the old Pingback approach&mdash;if you’re familiar with that&mdash;but greatly simplified.
In the example above, I replied to a post on Twitter,
but I can just as easily reply to a post on any site that supports Webmentions.
If you write a note on your site, I can reply to it directly, without going through any third party service.

**Micropub** is a way to post directly to your site using a third party editor.
In the example above, this editor is Omnibear,
but it could just as easily be an app called [Quill](https://quill.p3k.io/) or another similar service.

The important thing to note here is that I haven’t rigged up a custom script to post to my site and post to Twitter and crawl through twitter for replies.
I am using open web standards.
Most of the work is done by existing tools that understand these standards, not one-off code.

If I want, I can swap out Omnibear for a different editor, or change to a new Micropub server if I find an alternative I like better.
Open standards drive it all, so nothing is proprietary.
In the following posts, I will show you how I chose to implement each piece of the puzzle;
but you can just as easily change one piece out to suit your needs, while still doing other parts of it just as I have.

In short: my process is not an all-or-nothing approach. I’ll show you what I use, and you are free to pick and choose from among the pieces.
