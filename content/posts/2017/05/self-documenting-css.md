+++
date = "2017-05-28T09:00:24-04:00"
draft = true
title = "Experiments in Self-Documenting CSS"

+++
One of the best programming books I’ve ever read is [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/) by Robert C. Martin. If you have never read it, add it to your list.

In one section, Martin discusses code comments, and makes a strong argument against them. I won’t repeat all his arguments, but in short he maintains they hove a tendency to fall out of date. The computer ignores them, so nothing guarantees they accurately describe what the code does. It is far better when the code itself is clear; then both the programmer and the computer are reading the same thing. To be clear, he does not say comments should *never* be used, but rather you should always strive to render them unnecessary.

Consider the following:

```js
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) {

}
```
```js
if (employee.isEligibleForFullBenefits()) {

}
```

<blockquote>
  Every comment represents a failure to make the code self explanatory.
  <cite>Robert C. Martin</cite>
</blockquote>
test

* sass functions
* sass variables
* smart class names
* small modules
* smart divisions between modules
* CSS in JS?
* CSS wizardry: writing tidy code

https://blog.codinghorror.com/coding-without-comments/
