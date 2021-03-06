+++
aliases = ["/posts/against-css-in-js.html"]
date = "2015-05-29T00:00:00-05:00"
title = "Against CSS in JS"

+++
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Some folks want a unified language of the web instead of CSS, HTML, and JS.&#10;&#10;It&#39;s increasingly looking like JS will just eat the other two.</p>&mdash; Henrik Joreteg (@HenrikJoreteg) <a href="https://twitter.com/HenrikJoreteg/status/603959629425483776">May 28, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I have long believed that pieces of our <a href="https://www.youtube.com/watch?v=x7cQ3mrcKaY">JavaScript are intimately coupled with the DOM</a>, especially in the context of web apps.  For far too long, we waved our hands and pretended we have a separation of concerns simply because our HTML is in one file and our JavaScript is in another.  Not only did this avoid the problem, I think it actually made it worse, because we had to write more and more complicated code to try and abstract away this coupling.

This coupling is real, and it is unavoidable.  We must bind event listeners to elements on the page.  We must update elements on the page from our JavaScript.  Our code must interact bidirectionally and in real-time with the elements of the DOM.  If it doesn't... then we just have static HTML.  Think about it, can you just open up your HTML and change around class names or ids without breaking anything?  Of course not.  You have to pull up your scripts and see which of those you need to get a handle on various DOM nodes.  Likewise, when you make changes to your JavaScript views, you inevitably need to make changes to the markup as well; add a class or id so you can target an element; wrap an extra div around a block so you can animate it a certain way.  This is the very definition of tight coupling.  You must have an intimate knowledge of both in order to safely make any substantive changes to either.

Instead, the mantra of React is to stop pretending the DOM and the JavaScript that controls it are separate concerns.  Join the two, and instead, separate concerns that are actually different: the dropdown menu is separate from the list of objects; the modal dialog box is separate from the page footer.  Why on earth would you put these all in the same HTML document?  Obviously, you shouldn't.

When React came out, I was more than happy to embrace their controversial claim that pieces of our DOM should live in the JavaScript&mdash;because I already knew it to be true.  They are the same concern, and every attempt we have ever made at separating them has ended in disaster.  Just think about the last time you had to deal with Backbone Views.  It actually makes me feel sick to my stomach to think about.  There was so much work for so little gain, and it was all boilerplate code to cross that barrier into DOM land.

## So What About CSS?

This made sense once, so, naturally, there is talk about doing the same thing with CSS.  We brought our HTML (sort of) into our JavaScript and it cleaned a lot of things up, why not <a href="https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#1e2d">do it with our styles</a> as well?

This is a really bad idea.  Where, with JSX, my reaction was, "Yes, finally!", my response here is quite the opposite.  I've had a hard time articulating exactly why I respond this way, especially on the length-constrained and fast-paced atmosphere of Twitter, so I'm setting out now to articulate my reasons here.

Before I dive in too deep, I do want to say I have interacted some with React Native folks on Twitter regarding this.  I acknowledge that their work is primarily in the realm of native applications, not in the context of the web.  I think this has ramifications for their use case that I myself am not familiar with.  My thoughts may be applicable to them, and they may not; I'm not well-versed in that world enough to speak to them directly.  But I do hope others take note of that distinction before they clamber to repeat these practices on the web.

## We Are Not Solving the Same Problem As Before

The relationship between CSS and JavaScript is not like the relationship between HTML and JavaScript.  With HTML, a true separation of concerns between the markup and the corresponding component code is impossible.  With CSS, this separation is possible and is in fact vital to clean code organization.

Your CSS should be wholly independent from your markup (and especially independent from your JavaScript).  If you find, as <a href="http://programmers.stackexchange.com/questions/271294/why-is-it-or-was-it-important-to-separate-css-from-html">this stackexchange user observed</a>&mdash;that your "commit history shows me the opposite - [you] usually edit both HTML and CSS together"&mdash;then you are doing CSS wrong.  CSS should not depend on the markup; the markup should depend on the CSS.  Or, more accurately, it should depend on the modular, reusable API defined by the CSS.

If you use the best practices of <a href="http://oocss.org/">OOCSS</a>, <a href="https://smacss.com/">SMACSS</a>, or BEM, you will not need to edit the CSS every time you edit a page.  In fact, once you have your basic building blocks of CSS defined, you can build out all sorts of things in the markup before you need to touch the styles again.  Far too often, developers write their CSS and HTML together, with selectors that mimic the structure of the DOM.  If one changes, then the other must change with it: a tight coupling.

However, moving the styles into the JavaScript does not address this problem at all.  When we moved our HTML into our React components, we redefined which concerns we were separating.  Each component is now a unique concern.  When we bring CSS into that, we are not further breaking up our concerns; we are just adding more responsibilities to the concerns we already have.

In a best-case scenario, with well organized code, we require in a style module into our React component and add it to the props.  This is roughly equivalent to adding a class name that references a stylesheet--there is no net gain in terms of separation of concerns.  But, we don't always work in a best-case scenario.  Now that our JavaScript has taken responsibility for styling, it will have to take care of things that we take for granted with CSS.  This will add unnecessary bloat to your codebase, and make separation of concerns more difficult.

If your stylesheets are well organized and written with best practices, there is no bi-directional dependency between them and the HTML.  So we do not need to solve the same problem with our CSS that we had to solve with our markup.

## Beware Framework Lock-In

CSS is universal. If your page has stylesheets, that's cool, because everyone's page has stylesheets.  Every JavaScript library and every HTML templating language works with CSS.  If you shift all of your styles into JavaScript, you are going to be locked into using JavaScript libraries that can use them.  Your styles no longer stand on their own.

If in 14 months you find a new view library or framework you want to try out, you're out of luck.  You will have to invest a lot of time into pulling styles back out of JavaScript modules and into stylesheets again.  The most likely scenario is you would only bring out a portion of it&mdash;just enough to use in the components you are building with the new library.  Sure, you may continue to make progress over time pulling styles back into regular stylesheets, but during that process, you're going to have duplication of code, and you may even find yourself running into scenarios where the CSS has to be completely re-written to replicate the behavior you added in JavaScript.

## All or Nothing

When you start bringing your styles into your JavaScript, where do you stop?  If you only bring in some of them, how are you going to define that boundary?  When you need to change something in the look and feel, do you know whether you need to open up your styles.css or your styles.js?  A logical solution here is to bring in all of it and abondon stylesheets altogether.

The problem with that is, CSS takes care of some things cleanly for us that you are probably taking for granted.  This is helpful for fonts in particular: The default font size, the font face and line-height, and the color of your font are all inherited silently from one of the topmost elements on the page.  Do you want to explicitly set these things on every single component you build?  Because you will have to.

Not only that, but if you distribute your component, the users of that component need to be all-in on the same paradigm, as well.  Your component sets inline styles, which means they can't be overridden without <code>!important</code>.  To get around this problem, you can allow the user to pass in their own styles, but this means the user of your component must have their styles defined in their JavaScript as well.  What if they want to use traditional stylesheets?  You're forcing their hand.

## Missing CSS Features

I think there is a place for a few inline styles in a React component.  I'll admit I've had to do it a few times.  Most often, though, it is because I need to accomplish something that can't be done in pure CSS (yet), such as animating from <code>height: 0</code> to <code>height: auto</code>.  Animation is a bit of a different topic here, but, honestly, even that is invariably easier to do when it can be accomplished with pure CSS.  The power of transitions and keyframe animation is much harder to replicate in JavaScript without the help of yet another dependency.  The browser already has this stuff built in.  Take advantage of it.  It is so much easier to just toggle a classname and not have to think about it when I'm trying to focus on another problem.

You also lose the ability to do some other things, as well, like media queries and fallback values for older browsers.  Unless you want to start browser sniffing and adding conditionals around your styles.  Again, this is adding more responsibilities to your components that otherwise they would not have.

## In Defense Of CSS

At this point, I have to ask: what problem are we trying to solve?  There is a lot of baggage and many unknowns if we start doing CSS-in-JS.  We had better have a damn good reason before we go down that road.  Christopher Chedeau, in the <a href="https://speakerdeck.com/vjeux/react-css-in-js">original slidedeck</a> that introduced this idea, outlines seven "problems" with CSS.  The thing is, they are solvable problems.  If we as web developers just understand CSS better, and take the time to learn modern best-practices like SMACSS and BEM, these issues almost entirely dissolve, especially at the scale most of us work at.  Don't get me wrong; he does make some good points that are worth discussing, but I believe we have at least partial solutions for all of them (some of the latest proposals to the CSS spec help, as well).  If you want to discuss those points directly, feel free to ping me on <a href="https://twitter.com/keithjgrant">Twitter</a>.

Many web developers fear CSS.  They fear it because the do not understand it.  And I am worried that, in that fear, we will collectively rush to move our styles into JavaScript in hopes that it solves our problems.  It won't.

It's time to truly <a href="https://github.com/keithjgrant/Taming-CSS">learn CSS</a>, because that's our real problem.  And that is a problem we can fix.

<br/>*Update: I have written a follow-up post: <a href="/posts/into-the-future-of-css.html">Into the Future of CSS</a>*
