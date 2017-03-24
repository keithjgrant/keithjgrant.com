+++
date = "2017-03-24T14:15:34-04:00"
title = "CSS is Not Broken"
mf-in-reply-to = ["https://medium.com/@zamarrowski/css-is-broken-5138773e17a5"]

+++
Coding in any language is hard before you spend time mastering it. Imagine what your JavaScript would look like if you never took the time to learn about OOP or functional programming principles? Just because you *expect* CSS to be easy, doesn’t mean the language is broken when you find it is not.

A lot of people have <a href="https://simpleprogrammer.com/2013/05/06/why-javascript-is-doomed/">gone on about</a> <a href="https://medium.com/smalltalk-talk/the-three-worst-programming-languages-b1ec25a232c1#e848">how horrible JavaScript is</a>. JavaScript is not horrible. It is an incredible language. It has a few odd quirks, just as CSS does. But if you take the time to actually understand these quirks, you will reap huge reward.

You cannot be proficient in JavaScript until you understand coercion, prototypal inheritance, and asyncronous flow control. Likewise, in CSS, you have to understand the cascade, inheritance, and the box model. Once you have those down, take a deeper look at the various layout methods. Do you know what stacking contexts and block formatting contexts are? Do you know why setting a height on an element leads to problems and how to accomplish what you need without doing so?

CSS is hard. But this is not because the language is faulty. Rather, the difficulty lies in what the language seeks to accomplish. I’ve heard many developers say they wish they could “throw out CSS and start over with something better.” I think this betrays a fundamental misunderstanding of the purpose of the language:

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">When you code CSS, you’re writing abstract rules to take *unknown* content and organize it in an *unknown* medium. That shit is hard.</p>&mdash; keith•j•grant (@keithjgrant) <a href="https://twitter.com/keithjgrant/status/842728744653676544">March 17, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Furthermore, CSS isn’t just code, it’s also part of the design. A <a href="https://snook.ca/archives/html_and_css/css-concerns">vital concern of CSS is consistency</a>. You should want “global” styles: colors and spacing should be consistent throughout your application. Similar components need to look similar. Your buttons should all be consistently sized and your box shadows or border radiuses should not be ad-hoc.

I find it ironic that developers who bemoan the “global” nature of CSS are usually the ones who run into specificity problems because they unnecessarily scope their styles to particular parts of a particular page. When you have selectors like `#directory .sorted .sidebar :nth-child(2) button`, your problem isn’t that CSS is global. Your CSS isn’t global enough!

The next thing you know, you find yourself using `!important` to correct specificity problems. This is a red flag that you need to stop and learn the cascade. You can use `!important` to sweep specificity problems under the rug once. But you will soon need it a second time, at which point you will face the same specificity problem all over again.

Design your styles so they can be reused, anywhere in the app. Learn SMACSS and BEM. And don’t stop because you understand the “naming system”&mdash;these methodologies are about far more than double-underscores and double-hyphens. They are about code organization, reuse, and refactoring. They are the solution to dead code elimination. They offer ways to utilize the cascade instead of fearing it. They allow you to know precisely where in your code you can find a certain set of styles.

CSS isn’t broken. But it does require <a href="https://www.manning.com/books/css-in-depth">study and skill</a>. It does require careful thought. As with anything in programming, you can make a mess of the code. Sure, blaming the language is the easy way out. But when your JavaScript is confusing and buggy, you know it’s not the language’s fault.
