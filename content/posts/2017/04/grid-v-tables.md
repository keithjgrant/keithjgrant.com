+++
categories = ["css"]
date = "2017-04-12T11:52:15-04:00"
title = "What Grid Can Do That Tables Can’t"

+++
There’s a kind of narrative out there that’s basically, “Silly CSS wonks: first they tell us tables are bad, now they give us grid.” Nevermind that this is completely ignorant of the original argument against tables for layout (tables were never bad for layout because of the way they looked on screen; they were bad because of what they did to your markup).

It’s true that grid looks a lot like tables at first glance. But it’s also worth noting the features grid provides that cannot be accomplished using tables. Here are just a few:

* [Overlapping cells](http://gridbyexample.com/examples/example15/)
* [Empty cells](http://gridbyexample.com/examples/example12/), without a bunch of empty tags
* Size columns (or rows!) in [proportion to one another](https://alligator.io/css/css-grid-layout-fr-unit/)
* [Complex alignment](http://gridbyexample.com/examples/example24/) of [contents within a cell](http://gridbyexample.com/examples/example25/)
* Specify a [flexible range of acceptable sizes](https://rachelandrew.co.uk/archives/2016/04/12/flexible-sized-grids-with-auto-fill-and-minmax/) for columns & rows
* Provide a full definition of responsive behavior, often without any media queries
