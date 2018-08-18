---
layout: micropubpost
date: '2018-08-18T00:00:24.283Z'
title: ''
slug: til-if-youre-sending
category: notes
---
TIL: if you&#39;re sending a request using `fetch()` it does not send cookies by default UNLESS you&#39;re coding a browser extension.

Both FF &amp; Chrome extensions will send the cookies anyway unless you specify `credentials: &#39;omit&#39;` because 🤨
