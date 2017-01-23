+++
title = "Hello, World Wide Indieweb!"

+++

It’s been a year, so it’s time for a new design! Only this time, the update is more than just a CSS revamp. This year, I join the “Indieweb”. If you don’t know what that is, read on.

Let me introduce you to the newest social network. It’s called the World Wide Web; it’s more than 25 years old.

## The social web

Social networks bother me. I don’t mean privacy issues or mysterious sorting algorithms. Apart from these things, I have always been bothered by the walled gardens. I can’t follow you on Facebook unless I have a Facebook account. You can’t like or reply to my tweet unless you join Twitter. The internet was founded on principles of decentralization, yet here we are, consolidating the bulk of our online activity into a small handful of sites.

I have long wanted an open protocol to bring the key features of social networks (liking, sharing, following) out into the open web. Now, finally, I have discovered that a fair bit of progress has been made in this regard. The W3C now has a <a href="https://www.w3.org/wiki/Socialwg">Social Web working group</a>, and their specifications are stabilizing and have even been <a href="http://indieweb.org/">adopted by many</a>.

This redesign is my first step toward adopting these standards myself. This is Phase One of two or (possibly) three steps I want to take. Each one corresponds to a key piece of the "Social Web" protocols. Here’s a brief rundown of what they mean:

## Phase I: Webmentions

My blog now supports comments. You may comment on my blog by writing about it on your own blog. Then your blog should send mine a <a href="https://indieweb.org/Webmention">webmention</a>. These are similar to the old “pingbacks”, except they use a simpler format and they are an official <a href="https://www.w3.org/TR/webmention/">W3C Recommendation</a>.

They basically work like this: I write you a post. Then you write a post, with metadata indicating it is a response to my post. Your blog then tells my blog that you replied and provides the URL. If I want, I can then link to your reply. Both our posts now link to each other.

Even better, there is a service called <a href="https://brid.gy/">brid.gy</a> that will find links to my post (and replies to those links) on Twitter or Facebook, and let my blog know about them, so I can log them here as comments. We can drag the old social network silos out into the open web!

This blog now has webmention support, though I probably will find a few kinks to work out early on.

## Phase II: MicroPub

My next goal will be to implement MicroPub. This basically means I can write short posts (say, 140 characters), called Notes. I will use these notes to post replies to other posts. I can also syndicate these to twitter, where webmentions and brid.gy will help me track any conversation that happens there and link to it from my blog.

This has a few more moving parts than webmentions, but thankfully, most of the tools for this already exist as services online. I just need to wire things up and test them out.

## Phase III: ActivityPub?

The last piece of the puzzle for a decentralized social web is the whole subscribers/followers bit. The old concepts of RSS, PubSub, and feed readers can do this, but that model is more of a dumb publication. There is a new approaches the W3C has been working on called ActivityPub that involves tracking followers and bringing more of the social network activities into this realm.

Tools and services in this arena don’t seem as mature yet, but I’ve certainly got my eye on it.

I have high hopes for this will take us. It may take a while &mdash; probably a couple years, at least &mdash; but I think we will start to see more discussion happening in this arena. Hello, Indiweb!
