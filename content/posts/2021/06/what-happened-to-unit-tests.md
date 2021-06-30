---
title: "What happened to unit tests?"
date: 2021-06-29T09:25:49-07:00
tags:
  - tests
  - javascript

image:
  url: "/images/2021/disassembled-typewriter.jpg"
  alt: "A typwriter completely disassembled with all pieces arranged neatly on a white surface"
  align: "50% 50%"
  author: "Florian Klauer"
  authorUrl: "https://unsplash.com/photos/-K6JMRMj4x4"
---

It seems to me [one individual](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering) has convinced our entire industry to stop shallow rendering, and to abandon unit testing in favor of (almost) exclusively using integration tests and I gotta be honest, I don't buy it.
I agree with many of the arguments in that post, but not the conclusion.
And I think the state of unit testing in React is worse off today than it was three years ago because of this mindset.

## Tests should be fast

In that article, I believe this is a critical miss:

<blockquote>
There's no getting around the fact that shallow rendering is faster than any other form of testing react components.
It's certainly way faster than mounting a react component.
But we're talking a handful of milliseconds here.
Yes, it will add up, but I'd gladly wait an extra few seconds or minutes for my tests to finish in exchange for my tests actually giving me confidence that my application will work when I ship it to users.
<cite><a href="https://kentcdodds.com/blog/why-i-never-use-shallow-rendering#-it-seems-like-a-waste-">Kent C. Dodds</a></cite>
</blockquote>

In my experience, we're not talking milliseconds.
We're talking minutes, often tens of minutes, across the entire test suite.

Here's the thing: slow tests don't get run.
It's as simple as that.
You will ignore slow tests as you code, because you have to.
You're holding a bunch of context in your head, and you are working to organize thoughts and get them down, and you don't have time to stop frequently and wait for tests to run.
You don't have time to figure out whether the tests are checking the change you just saved, or if they're still running from a change you made five minutes ago.
Not until it's time to commit, or worse, merge, will you check test results.
Only then do you catch the error, sometimes even a critical oversight, and have to re-work.

But fast tests — those you can leave running all the time.
Those give *instant* feedback.
Those shorten the iteration cycle from hours to seconds.
Fast tests are worth more than slow tests.

## Tests should be focused

Kent's post lays out many bad practices common in React unit testing, often seen when using Enzyme:

- inspecting component state
- directly manipulating a component's state
- spying on a component's internal methods
- getting the component instance and fiddling with it in ways your user never could

And I absolutely agree with every one of these points.
These are internals, implementation details that are irrelevant and have no business in your tests.
(Kent also makes arguments about accessibility I also agree with, but think are rather beside the point.)
And I also agree that Enzyme probably shouldn't give us the ability to do many of those things, as it enables bad practices.

But that doesn't mean shallow rendering is wrong.
It means that bad test practices are.
These bad habits can exist with deep rendering just as with shallow.

Kent says, "For example, the `<Fade />` component we have above is an implementation detail of the `<HiddenMessage />` component, but because we're shallow rendering `<Fade />` isn't rendered so changes to that component could break our application but not our test."
But that's good!
Let the unit tests for the Fade component test whether it works correctly.
Just assert that your component sets the correct props on Fade, and who cares what Fade does with them — those are concerns of a different test suite.

With shallow rendering, a failure in the HiddenMessage test suite means HiddenMessage has a bug.
With full rendering, a bug in Fade means dozens of tests are going to fail across multiple test suites.
Then you get the fun job of tracking down where the bug originated.
With unit tests, you know exactly where the bug is, because only the test suite for the Fade component will break.
If `<Fade />` is well tested, and you assert that `<HiddenMessage />` passes the correct props to `<Fade />` based on user interaction, then you can be confident in your code.

## Tests should be comprehensive

Is there a place for integration testing, as Kent explains?
Absolutely.
But not at the expense of unit testing.
Apart from being faster, unit testing also tests something integration tests simply cannot do: complex permutations.

If a particular component has three key behaviors, it requires three unit tests*.
If its child component has three key behaviors, it requires three unit tests.
If you plan only to test those behaviors via integration tests, you need three times three unit tests, because you have to check how every permutation behaves.

But your app isn't just two components, so let's keep going.
If you have a grandchild component with three key behaviors, you need to multiply all your integration tests by three, so you need 27 integration tests.
Four interacting components mean 81 tests.

My codebase has hundreds of components.
I asked my calculator how many tests that would need, and it gave me an answer with an _e_ in it, if that tells you something.
How many components are in your codebase?

Even a moderately sized app will need tens of thousands of tests to cover all the possible permutations of component behaviors.
If you rely solely on integration tests, you will _never_ have confidence in the behavior of your application, because you will never be able to write thousands of tests, let alone wait the hours required to run them all.

<small>*I'm simplifying, of course. In reality, the component probably needs  six to ten unit tests, because you need to assert negative conditions as well, and error handling. So you can see that the problem will actually compound much worse that I've stated here.</small>

But with unit tests, it's much simpler.
Assert that each component does what it should when given certain props, and when certain user interactions occur.
Then assert that each component sets the correct props on its children components.
If those child components are similarly tested, you can be confident with far fewer tests than checking all the ways those behaviors can mix and match in integration.

## React has shot itself in the foot

What really gets me about all this is it's not just the community that has gone down this road, the React library itself has encouraged it.
They have [essentially abandoned their shallow renderer](https://github.com/facebook/react/issues/17321), and with the rise of hooks, third party libraries such as Enzyme can't see into React's internals enough to do it either.
The way React is structured now, you simply can't exercise some hooks like `useEffect` in a shallow render.
And yet nobody with any clout in the community seems to care.
