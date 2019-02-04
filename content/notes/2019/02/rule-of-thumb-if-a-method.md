---
date: '2019-02-04T15:58:55.895Z'
title: ''
tags: ''
slug: rule-of-thumb-if-a-method
mf-syndicate-to:
  - 'https://twitter.com/keithjgrant'
category: notes
---
Rule of thumb: if a method in a React class doesn’t reference `this` (or only references one or two values on `this`), extract it out into a standalone util and pass those values in as params.
