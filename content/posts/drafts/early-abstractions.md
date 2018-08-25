---
title: "Early Abstractions"
date: 2018-06-26T14:55:26-04:00
draft: true
---

“Avoid early abstractions.” It’s an important piece of advice for software developers. It’s better to duplicate logic at first, then refactor to a common abstraction once you’re sure you understand the problem.

But there’s a catch when it comes to pattern libraries: it’s all abstractions. The whole point of a pattern library is to provide a toolkit of reusable modules. So how do you add new styles to your project, and encapsulate them in your pattern library, without building the abstraction too early?

I think this is the most difficult part of maintaining an existing pattern library: when you find you need a new pattern, how do you ensure you add the right pattern? Building a new pattern library is usually simpler.

Ethan Marcotte recently wrote about the related problem of [highly specific patterns](https://ethanmarcotte.com/wrote/when-patterns-get-weird/).
