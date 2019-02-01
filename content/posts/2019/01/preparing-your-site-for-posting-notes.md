+++
title = "Preparing Your Site for Posting Notes"
date = 2019-01-17T14:23:33-05:00
tags = ["indieweb", "webmentions"]

[image]
  url = "/images/2019/red-rotary-phone.jpg"
  alt = "Closeup photo of an old rotary dial on a bright red telephone"
  align = "50% 35%"
  author = "Fancycrave.com"
  authorUrl = "https://www.pexels.com/photo/close-up-photo-of-rotary-telephone-699786/"
+++

{{< alert >}}
This is Part 2 in a series exploring short-form posting, the IndieWeb, and taking control of your own online social workflow for your statically-generated site:

1. [A Low-Friction Workflow for Short-form Posting on A Statically Generated Site](/posts/2019/01/low-friction-workflow-for-notes/)
2. **Preparing Your Site for Posting Notes**
3. [Adding Webmention Support to a Static Site](/posts/2019/02/adding-webmention-support-to-a-static-site)
4. Using Micropub to Post to a Static Site &mdash; _Coming soon_
{{< /alert >}}

If you’re eager to get going with short-form posting using webmentions and micropub,
it’s worth giving your site structure a little thought so you know where your notes will go.
You’ll also need to enable something called Web Sign-in so you can use some of the tools I will mention in the upcoming posts.

I’ll walk you through these things below.
My thoughts on site structure may be self-apparent,
but be sure you don’t miss the setup instructions for Web Sign-in,
as this will be an essential prerequisite as we continue in the following posts.

## Static site structure

I use Hugo and Netlify for my site.
My site content is stored in a git repository.
For new posts, I create a markdown file anywhere within a `content` directory.
Hugo builds these files into web pages, with URLs matching the directory structure.
When a change is pushed to Github, Netlify automatically runs Hugo and publishes the resulting pages.
If you want help getting started with these, Sara Soueidan has
[a great post on setting those up](https://www.sarasoueidan.com/blog/jekyll-ghpages-to-hugo-netlify/).

My instructions in this series can be applied to any static site generator and hosting setup.
As long as you have a static site and an automatic build process, it should work for you,
but it you may have to adapt some of the specifics yourself.

It usually makes sense to have separate places in your site structure for long- and short-form posts.
On my site, I have broken these up into separate directories called `posts` and `notes`.
I’ve also added additional directories for `replies`, `likes`, and `bookmarks`;
you don’t have to add these if you don’t want to, but I find them useful.

Inside all five of these directories, have subdirectories for each year, and subdirectories for each month within those.
My directory structure looks [something like this](https://github.com/keithjgrant/keithjgrant.com):

```ascii
content
 └- bookmarks
 └- likes
 └- notes
 |   └- 2018
 |   |   └- 11
 |   |   └- 12
 |   └ 2019
 |   |   └- 01
 └- posts
 |   └- 2018
 |   |   └- 11
 |   |   └- 12
 |   └ 2019
 |   |   └- 01
 └- replies
static
 └- images
themes
 └- shindig (my theme name)
```

My site is run by [Hugo](https://gohugo.io/).
Adjust this as necessary for Jekyll or Eleventy.
Or to suit your own desires, really.

I prefer my long-form posts to look different than my notes and replies,
so in my Hugo theme, I have some logic to render those using different partial templates.
If you’re comfortable editing your Hugo theme, you can change it to something [like mine](https://github.com/keithjgrant/keithjgrant.com/blob/master/themes/shindig/layouts/_default/single.html).
This is the file `themes/[theme-name]/layouts/_default/single.html`:

```html
<!doctype html>
<html lang="en-US">
<head>
  {{ partial "meta.html" . }}
</head>
<body>
  {{ partial "header.html" . }}

  {{ if or (eq .Section "posts") (eq .Section "") }}
    <main class="l-article h-entry js-main">
      <div class="l-article__inner">
        {{ partial "post-full.html" .}}
      </div>
    </main>
  {{ else }}
    <main class="l-note h-entry js-main">
      <div class="l-note__inner">
        {{ partial "note-full.html" . }}
      </div>
    </main>
  {{ end }}
  {{ partial "footer.html" . }}
</body>
</html>
```

The key here is the `if` statement near the middle: `{{ if or (eq .Section "posts") (eq .Section "")}}`.
This statement renders the first block for pages that are in the `posts` directory (`.Section` equals "posts")
or are top level pages (`.Section` equals an empty string).
It renders the second block for everything else, such as my notes and replies.

The first block includes a partial called `post-full.html` which is resides at `themes/[theme-name]/partials/post-full.html`.
The second block includes `note-full.html` which is at `themes/[theme-name]/partials/note-full.html`.
Use these partials to define your page structure for long-form and short-form content, respectively.

Once that is done, you can create a new note by creating a new file in the appropriately-dated directory:
`hugo new notes/2019/01/my-first-note.md`.

This part of your setup is very flexible.
Use my directory structure as an example,
but feel free to modify it as needed so your site’s structure makes sense to you.

## Enable Web Sign-in

Several of the tools and services used on the IndieWeb require something called _Web Sign-in_.
This is a way to login to a service using your website as a username, proving you are the owner of your website.
Setting this up should be a quick process.

### Link to social profiles

First, add links to your various social profiles somewhere on your homepage. Include a `rel="me"` attribute for each of these:

```html
<ul class="social-links">
  <li><a href="https://twitter.com/keithjgrant" rel="me">@keithjgrant on Twitter</a></li>
  <li><a href="https://github.com/keithjgrant" rel="me">Github</a></li>
</ul>
```

Be sure to include GitHub. I’ll explain why in a moment.

### Make your social profiles link back to your site

Second, on each of the services you link to, edit your profile so the "homepage" field links back to your website:

* [Edit your Twitter profile](https://twitter.com/settings/profile)
* [Edit your GitHub profile](https://github.com/settings/profile)

![The URL field in my Github profile, set to https://keithjgrant.com](/images/2019/social-web/url-in-github-profile.png)

At this point, your homepage links to your social profiles,
and your social profiles link back to your homepage,
each with a `rel="me"` attribute.
This means, if you log in somewhere using OAuth for one of these accounts,
you also verify that you are the owner of your site.

Unfortunately, Twitter recently changed the way profile links work with some complicated redirects,
so it's not straightforward for a service to verify the link.
GitHub is the best widely-used service right now that correctly uses `rel="me"` on a user profile page,
so I recommend you use this service for Web Sign-in.

### Define a preferred web sign-in endpoint

Finally, you will add some metadata to your homepage to indicate which Web sign-in service you wish to use.
I recommend [IndieAuth.com](https://indieauth.com), though there are others available.

Add this code within the `<head>` of your site’s homepage:

```html
<link rel="authorization_endpoint" href="https://indieauth.com/auth" />
<link rel="token_endpoint" href="https://tokens.indieauth.com/token" />
```

This tells third party services that use web sign-in to use IndieAuth to log you in.
IndieAuth will find the link to your Github account and verify that your GitHub profile links back to your site.
It will then allow you to login to Github,
and will then provide a token to third party services verifying you are the owner of your site.

### Test it out

To test that this is working, visit [Webmention.io](https://webmention.io/) and enter your site’s url in the login box:

![Web sign-in form on webmention.io, with https://keithjgrant.com entered into the input field](/images/2019/social-web/webmention-io-sign-in.png)

This will take you to indieauth, your preferred Web sign-in endpoint. IndieAuth will ask which service you wish to use to sign in:

![IndieAuth.com showing my Github profile ](/images/2019/social-web/indieauth-sign-in.png)

Github is the only valid option right now, so click the green Github button. If you’re not already logged into Github, this will ask you to login. Once logged in, it will redirect you back to webmention.io.

Now you’ve created an account on webmention.io:
your website url is your username, and you didn’t need to create a password or check an email;
your website and Github account are all you need.
In the next post, I’ll show you how you can use this service to receive webmentions on your site.
