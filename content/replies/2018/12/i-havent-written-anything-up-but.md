---
date: '2018-12-17T21:09:42.148Z'
title: ''
mf-in-reply-to:
  - 'https://twitter.com/StuRobson/status/1074771501553995777'
tags: ''
slug: i-havent-written-anything-up-but
mf-syndicate-to:
  - 'https://twitter.com/keithjgrant'
category: replies
---
I haven&#39;t written anything up but feel free to hit me up with any questions as you go.

I did a very SMACSS-y folder organization. All modules in a src/modules directory &amp; subdirs, src/base, directory, src/layouts, /src/mixins, etc.

In the src directory I have multiple top-level stylesheets (four for each brand, as I&#39;ve chunked up the styles). I basically have my preprocessor crunch each of these and output each of them compiled in a build directory.

The CSS lives completely in its own repository. Published with semver &amp; release notes. I kinda sorta wrote about my thoughts regarding that here: https://keithjgrant.com/posts/2015/08/css-first/
