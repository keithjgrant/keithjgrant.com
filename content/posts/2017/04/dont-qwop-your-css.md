+++
date = "2017-04-07T15:45:07-04:00"
title = "Don’t QWOP Your Way Through CSS"

+++
[QWOP](http://www.foddy.net/Athletics.html), if you haven’t played it, is a ridiculous running game. Instead of pressing, say, the right arrow key to run, you must control each of the runner’s muscles independently. Pressing the keys Q, W, O, and P will each extend one leg or bend one knee. Coordinating them all is incredibly difficult, and you are usually lucky if you can make a full stride before falling on your head.

This is also how a lot of developers treat CSS. Instead of thinking constructing a robust system, they focus on only one specific part of the desired result. Instead of asking, “How do I run?”, they ask, “How do I flex my knee?” I can teach you how to flex your knee, but if QWOP shows us anything, that knowledge might actually make running more difficult.

CSS does a lot of work for you, if you will let it. Normal document flow ensures things all fit together on the page; this is why you should be judicious with positioning that breaks out of document flow. CSS automatically sizes your elements to contain their text; this is why you should avoid explicitly setting height. Relative units allow you to define one value in terms of another so they will respond together if the context changes; this is why I sometimes frown on pixel units. Margins collapse so that paragraphs stack with the correct spacing. Certain properties inherit down the DOM tree so you don’t have to specify a font for every single element.

You can get down to the “bare metal” in CSS, if you want. You can specify absolute positions for everything and set explicit heights and define every single value in pixels. You can override inheritance. But in the end, this will make more work for yourself.

The next time you find yourself asking something like, “How do I vertically center this?”, take a step back. Are you having trouble because you set the height on something? Why did you set a height? What are you *actually* trying to achieve? Instead of focusing on a specific metric, think about the system as a whole: perhaps you want several items to all have the same height. Now, the problem is defined in terms of some desired [system behavior](https://www.youtube.com/watch?v=TGHbkTGVqoU). Solve for that: flexbox or grid can align multiple elements with the same height (they can also center the contents within, too).

The automatic behaviors of CSS aren’t always apparent if you aren’t familiar with them. They can result in weird outcomes, and you will be frustrated by them. So, I think, the first tendency is to find a way to turn off this “help.” Don’t.

Trust CSS; it does good things for you if you let it. Learn how to solve for system behaviors. Unless you like running by pressing Q, W, O, and P.
