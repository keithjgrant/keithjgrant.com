+++
categories = ["css"]
date = "2017-09-08T11:25:10-04:00"
title = "Code, Not Clojure"

+++
I’m going to make two declarations that might sound contradictory:

1. CSS is code.
2. CSS is not a programming language.

Many developers get these backwards.

It is code in that it requires discipline and rigor. It requires forethought, planning, and both big-picture and small-picture thinking. You need to consider edge cases and strive to keep your CSS logically organized.

At the same time, it is not a programming language. It is not executed in a linear fashion. Many of the rules of software architecture do not (and should not) cleanly apply. It is meant to be global, a cross-cutting concern that uniformly addresses various circumstances wherever they appear on the page.

Too many developers try to force it into the mental model of a programming language, missing out on many of its most powerful features like the cascade and inheritance. And yet these same developers treat their CSS as an afterthought, throwing rules haphazardly onto the end of a stylesheet with little consideration for the selectors they use.

If you find yourself doing this, reverse your thinking. Don’t expect CSS to be a programming language, but do treat it like code.
