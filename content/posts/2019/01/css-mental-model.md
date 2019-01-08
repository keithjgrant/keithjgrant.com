+++
title = "Teaching a Correct CSS Mental Model"
date = 2019-01-08T12:38:52-05:00

[image]
  url = "/images/2019/frustration.jpg"
  alt = "A man holds his head in his hand in frustration while looking at his laptop"
  align = "50% 25%"
+++

Almost four years ago, [I chimed in](/posts/2015/05/against-css-in-js/) on the debate surrounding CSS.
Is it good? [Is it broken](/posts/2017/03/css-is-not-broken/)?
Does CSS-in-JS solve anything?

The discussion has evolved since then, as has CSS-in-JS tooling,
but we are still seeing regularly recurring heated arguments on Twitter.
The most recent happened — *checks watch* — an hour ago.

It’s interesting to read my original article now.
There are elements I still agree with, and some I don’t.
There are some that I now think were beside the point.
At the end, I concluded with this: “you need to learn CSS”.

For quite a while now, I have distanced myself from that stance:
there are people in the CSS-in-JS community that really do understand the language,
and are using JavaScript tooling to deal with its legitimate shortcomings.
Learning the language isn’t necessarily going to take those shortcomings away.

## We need to teach a mental model

Yet in some ways, I find I’m coming full circle back to that argument:
if you think CSS is a mess or broken, you need to learn CSS.
What I mean by that now, however, this not about learning the specifics of CSS,
but rather building a correct mental model of it.

Natalya Shelburne articulated this brilliantly in her recent talk “[CSS at the Intersection](https://www.youtube.com/watch?v=MJVRKmA83LU)”.
She describes the cognitive dissonance that is an important part of learning:

> You try something new outside of your comfort zone and you expect it to work a certain way,
> and it does something else.
> It breaks, and you have no idea what happened.
> You get these unpredictable things.
> It makes no sense and you start thinking,
> “Why would someone make something so frustrating?”

This is a natural reaction when facing something where we don’t have a correct mental model.
It’s an essential step in learning, to face this, and to learn to push through it
and correct your mental model.
It’s a reaction we see all the time online regarding CSS.
If we’re honest (and we can recall well enough),
it’s a reaction we all felt at one point or another when we were learning CSS.

The problem is, a surprisingly large number of people seem to have incredible difficulty moving past this point,
and adjusting their mental model of the language.
Some developers like myself were able to do it.
Others stay stuck in this place for years.

I think it’s high time we the teachers of CSS start discussing how exactly we can teach a correct mental model.
How do we, in specific and practical ways, help developers get past this point of frustration.
Because we have not figured out how to properly teach a mental model of CSS.

I think, perhaps, we’re beginning to circle closer to this. There seems to be [more focus lately](https://www.smashingmagazine.com/2019/01/how-to-learn-css/) on fundamentals of the language like document flow and the box model and formatting contexts.

## A “Common Core” for CSS

Schools in the U.S. have recently begun teaching something called “Common Core.”
It’s controversial in some ways
(and I’m no expect in Common Core, so take this analogy with a grain of salt),
but I like some of the things I’ve seen regarding Common Core math.

It teaches tricks for making difficult arithmetic easier.
For example, if you need to add 32 + 67, break the problem up to 30 + 60 and 2 + 7,
both of which are much easier to do in your head.
As someone who excelled at math in school,
I have found that most of these Common Core tricks are things I discovered on my own as a student,
and are precisely why I was able to do well in the subject.

We need common core tricks like this for CSS.
Not “tricks” in the old sense (like how to fake a gradient border),
but mental patterns: ways to frame the problem in our heads,
so we can break problems into their constituent parts and notice recurring patterns.
Those of us who deeply understand the language do this internally.
We need to start working on distilling out these mental patterns we use for understanding layout and positioning and working with relative units, so that we can articulate them to others.

This will take some deep consideration
and intentional analysis of our internal thought processes while we code.
But I think if we are able to distill out recurring patterns of thinking,
we can find a common set of tools we can teach to those who struggle with webpage layout.

And maybe, just maybe, we can make the development community a less hostile place for developers in the process.
