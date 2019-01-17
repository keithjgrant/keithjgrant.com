+++
title = "Short-form Posting on a Static Site: Webmentions"
date = 2019-01-17T12:47:33-05:00
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
This post is part of a series exploring short-form posting, the IndieWeb, and taking control of your own online social workflow for your statically-generated site:

1. [A Low-Friction Workflow for Short-form Posting on A Statically Generated Site](/posts/2019/01/low-friction-workflow-for-notes/)
2. **Preparing Your Site for Posting Notes**
3. Adding Webmention Support to a Static Site &mdash; _Coming soon_
4. Using Micropub to Post to a Static Site &mdash; _Coming soon_
{{< /alert >}}

Webmentions are a key building block of the IndieWeb.
They are they way for one webpage to notify another when it has linked to it.
This is based on a [W3C Recomendation spec](https://www.w3.org/TR/webmention/).

In this post, I will show you how to set up webmentions for a statically-generated site.
This is not the only way to do it, but it is the way I have chosen to do it for this site.

## Setup Web Sign-in

Several of the tools and services I will mention in this post and the upcoming post require something called _Web Sign-in_.
This is a way to login to a service using your website as a sort of username, proving you are the owner of your website.
This should be a quick process.

To set this up, follow the [instructions posted here](https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain).
This involves linking to your profile on services such as Twitter and Github — make sure you include Github — and then linking back to your website from your profile on those services.
Doing this proves that, if you can log into your Github account (using OAuth), you are the owner of your site,
because both your site and your Github profile link to one another with `rel="me"` in the link.

Then, add this code within the `<head>` of your site’s homepage:

```html
<link rel="authorization_endpoint" href="https://indieauth.com/auth" />
<link rel="token_endpoint" href="https://tokens.indieauth.com/token" />
```

This tells third party services that use web sign-in to use a service called IndieAuth to log you in. IndieAuth will have you login to Github, and will then provide a token to third party services verifying you are the owner of your site.

To test that this is working, visit [Webmention.io](https://webmention.io/)

## Receiving Webmentions

Now that you’ve logged into webmention.io, you can use it to receive webmentions for your site.


```html
<link rel="webmention" href="https://webmention.io/keithjgrant.com/webmention" />
```

## Sending Webmentions

## Integrating with Twitter/Facebook

### Enhancing with microformats
