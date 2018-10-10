---
date: '2018-10-10T15:21:43.227Z'
title: ''
mf-in-reply-to:
  - 'https://twitter.com/jamiedixon/status/1050041761429680131'
tags: ''
slug: exactly-though-it-may-need-to
mf-syndicate-to:
  - 'https://twitter.com/keithjgrant'
category: replies
---
Exactly, though it may need to be more carefully done in some circumstances.

Page.js does `this._onpopstate.bind(...)`, but it doesn’t define that function if `window.onpopstate` doesn’t exist, so the error pushed down a layer instead of fixed entirely.
