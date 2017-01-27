+++
title = "It’s Both"
date = "2017-01-27T08:54:57-05:00"

+++

I’m a JavaScript developer. I have experience working in large web applications and dealing with the problems that come from scaling up. I studied Computer Science in college and love solving problems of software architecture.

I’m also (in case you <a href="https://www.manning.com/books/css-in-depth">somehow missed it</a>) a “CSS Guy”. I learned CSS during its infancy in the mid-nineties and have worked to stay up to speed ever since.

When I look out at the industry today, it kind of feels <a href="https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#1e2d">like</a> <a href="http://mrmrs.io/writing/2016/03/24/scalable-css/">watching</a> <a href="http://www.zeldman.com/2017/01/03/kiss-my-classname/">parents</a> <a href="https://twitter.com/thejameskyle/status/824795012680421376">fight</a>. And I’ll admit it, I’ve <a href="/posts/2015/05/against-css-in-js/">contributed to the problem</a>. But the more I watch this unfold, the more I feel like we have two camps, talking right past one another, and no meeting in the middle. Both are missing the points the other is trying to make. So I’m shifting my stance:

## We’re both right

Writing SPAs is complicated business. The page isn’t just a static document you can slap some styles on and call it a day. What if you need to load content dynamically, and it results in unpredictable source order of your CSS? How do you know if styles for deeply-nested dependencies are already loaded? How do you know when you can delete code?

These are hard problems. You can’t answer them by simply saying “learn CSS”. I personally may not like CSS-in-JS or inline styles, but I do realize they are important experiments. They are quests for answers to these issues. I don’t think they are the ultimate solution. That’s okay. Maybe they will get us to it.

On the other hand, we have whole teams of developers who fundamentally don’t grok CSS. They code up their JavaScript components, then stick the styles they want into the project stylesheet. These may be great developers when it comes to traditional programming languages, but they get really frustrated with layout problems or specificity battles. Compound this with “too many cooks in the kitchen” and you have a real mess.

We have sixty-plus years of industry experience about architecting code in traditional programming languages, but we’ve struggled to apply this stuff to CSS. Only in the last seven years or so have we started to figure out best practices for the language, and we are not doing a great job of disseminating them. When we teach that BEM is a “naming convention” rather emphasize it is a way to architect systems with modular code, thousands of developers miss the point entirely. This only drives them further away because the so-called “best practices” don’t work when they aren’t actually followed.

They don’t understand that BEM is about architecture, not simply namespacing. They don’t see the value of using a pattern library, of centralizing your CSS and imposing order on who controls the CSS rather than treating it like a garbage pile where any random dev can just add haphazard code.

When JavaScript-centric developers hear, “putting your CSS in JavaScript makes it easier” they clamor to get on board. But this must be made absolutely clear: you still need to understand CSS. If you don’t know what a block formatting context is, CSS in JS will not fix your layout issues. If you don’t understand stacking contexts, you will continue to struggle with futile z-index battles. If you don’t learn custom properties or the difference between cascade and inheritance or margin collapsing, these experiments will not really solve the fundamental problem: most teams don’t know how to develop with CSS.

## Always bet on <del>JavaScript</del> the Open Web

So, yes. Hire engineers who know how to deal with system architecture. But also <a href="/posts/2016/10/your-team-needs-a-ux-engineer/">hire someone exclusively for their CSS skills</a>. Put smart people on your team from both camps. Let them work together to solve these problems. Because your problems are unique and your solutions might not look like someone else’s.

I can say with confidence that CSS in JS will pass. In our industry, something new always comes along. The saying is, “Always bet on JavaScript” &mdash; but this isn’t quite right. When it’s JavaScript vs Java or Ruby, yes, bet on JS. JavaScript wins not because it is inherently better; it wins because it is part of the open web platform.

The open web platform always wins. And CSS is part of that platform. It’s not CSS versus JS. It’s CSS <em>plus</em> JS. The platform will evolve. And the platform will win.
