+++
date = "2017-03-20T15:07:49-04:00"
title = "More thoughts on CSS in JS"

+++
At a previous job, I was brought in to a team of Java devs to provide a little JS support. They had been using something called PrimeFaces, basically a bunch of front-end components you drop into JSF pages. Working with it was horrid.

In short, these devs knew nothing about JavaScript or the front-end, but this tool let them sort of hack a UI together. It abstracted away all the tools needed for really working in the front end. For me, someone adept in JavaScript, working with PrimeFaces was like trying to code without a keyboard.

I’ve also had to work on projects coded in ExtJS. These feel about the same way: although you are technically editing a JS file, you aren’t really programming “in JavaScript.” Instead, you are basically coding via configuration. Actual understanding of JavaScript doesn’t help you much.

To me, CSS in JS feels the same way. It feels like a tool so a bunch of JavaScript devs can kinda-sorta hack together styles without actually having to write CSS. Except the syntax is more clunky and you have taken away the cascade. (And, yet, surprise! You still need to learn the most complicated parts of CSS.)

Now I’ll be fair, CSS in JS libraries typically provide a much thinner buffer between you and the actual CSS when compared to PrimeFaces. But still… it’s an abstraction layer. It gives the illusion of writing styles in perfect isolation, but inheritance still takes place and can interfere. It gets between me and the code I want actual control over.

I know what I’m doing when I code CSS. I *want* the cascade in many instances; removing it feels crippling. I won’t deny CSS in JS offers some benefits. But they are benefits I am not convinced I need at a cost I am not sure I want to pay.

I won’t say it’s the wrong choice for everyone. Some folks who really do grok CSS are in favor of it. Sometimes ExtJS is the right choice (don’t quote me on that). But dang, please know it’s a compromise that someone might have to clean up down the road.
