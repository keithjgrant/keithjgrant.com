---
title: "Client Side NPM"
date: 2020-04-21T10:00:47-07:00
tags:
  - performance
  - javascript

image:
  url: "/images/2020/fast-car.jpg"
  alt: "A red Lamborghini driving on the freeway alongside the ocean"
  align: "50% 50%"
  author: "Street 965"
  authorUrl: "https://www.pexels.com/photo/photo-of-car-on-expressway-3422964/"
---


{{< alert >}}
Disclaimer: this is an _idea_.
At this point, I’m not entirely convinced it’s a _good_ idea, but it’s an idea nonetheless.
This is something I thought of about a year ago, and recent discussions brought it back to mind.
The point of this post is to flush out the idea a bit, as a sort of thought experiment.
Take this with a grain of salt, and I’d gladly welcome feedback and critique.
{{< /alert >}}

So the web has a performance problem.
Before I get into it, I’ll concede the point that some of this is due to either over-engineered solutions or lazy developers who add dependencies without much thought to the ramifications.
But there are plenty of sites and apps out there that legitimately require complexity, large dependencies, and lots of code.

This is a proposed solution to help address this problem: Client Side Package Management.

## Goal: Dramatically Cut Network Traffic

On many, many sites, the bulk of the JavaScript bundle comes from dependencies.
This means we spend most of our bandwidth downloading the same code over and over again as we browse the web.
“Client side package management” would be an effort to offload all of that into an efficient caching strategy.
If two completely unrelated sites both use React Router, they can use the same local copy without repeatedly pulling it down the wire.
If a user frequently visits your app, they only need to re-download the code you wrote; not all of its dependencies.

Conceptually, it would work like this:
Code split your app into two JavaScript files. The first would be your “core” app — all the code your team wrote. The second would be a bundle of all its dependencies.
So when a site needs a dependency such as React, instead of including React in the core bundle, it would be bundled in the dependencies file.
This dependencies bundle serves only as a backup for clients that don’t support package management.

If the browser does support it, it would fetch only the core script.
Then instead of downloading the dependencies bundle, it would go directly to NPM, fetch the appropriate version of React, and store it locally.
It would do likewise for any other dependencies.
On subsequent visits, the core script can be re-downloaded (or fetched from normal browser cache), but the dependencies would already be available locally in the package manager, so it would not need to be downloaded again.
And because the dependencies are indexed by their name on npm, they can be re-used on other sites that rely on the same packages.

If the browser does not support client side package management, it would fetch the the dependencies bundle from the page’s server.
The page would effectively work just like the web does today.
This can be a fully backwards-compatible enhancement.

In some ways, this is an iteration on the idea of a CDN, which among other things attempt to save bandwidth by relying on browser caching.
In practice, though, CDNs very rarely produce hits in the browser cache;
too many sites rely on slightly different version numbers or different host CDNs to ever gain that benefit.
But with package management, the host is always the user’s computer and it is fully aware of semantic versioning;
one site relying on `lodash ^4.17.4` and another using `lodash ^4.17.10` would share the same resource.
For reliability, packages are sourced directly from the package manager where their author has published them (i.e. npm.com).

## How to Accomplish This

This sounds nice in theory, but how could it actually be accomplished? And I mean, accomplished today, without waiting interminably for standards bodies to do their thing. I believe in the power of the open web platform — but wild new ideas generally need to be proven in the real world before a standards body would ever consider adding them to language specifications.

I see two potential approaches that could work.
The first approach would be through the use of a browser extension.
The second would be through the installation of a native application that leverages custom protocol URLs (something like `package://npmjs.com/react@^16.10.0`).
It’s possible a hybrid of both would be necessary to work around CORS issues and access to enough hard drive space to store downloaded packages.
Either way, web apps that are built for this approach could encourage their users to install the appropriate dependencies:
A banner with a link could appear at the top of the page that reads,
“This site has been optimized for client side package management. For a faster browsing experience, you can install the plugin for free.”

I’ll be the first to admit, this brings up flashbacks of old sites with the notice, “This site required Flash,” which is not a pleasant memory.
The key difference would be that the plugin is entirely _optional_.
The page remains fully functional without it, by downloading dependencies from the server, bundled in a normal JavaScript file.
And, unlike Flash, these dependencies would be built using native web technologies.

### Versioning and Storage

This must be fully aware of semantic versioning.
If a page depends on a version `^3.14.0` and version `3.14.7` is found in the local cache, the already-available package would be used.
Meanwhile, the client could even perform a check in the background if any newer version is available, and if it is, download it in a low-priority network request for use in subsequent visits to pages that rely on it.

I’m a little hesitant about that last part.
We wouldn’t want to chew through disk space eagerly storing unnecessary files.
But either way, there should probably some sort of cleanup algorithm that takes into account how frequently a specific package is used and how long it has been since last use, automatically deleting those that seem to be outdated.
The user could even customize how much disc space they wish to allocate for package storage.

## Miscellaneous Thoughts, Questions, Problems

### Bundling
This would definitely require code splitting to separate the “core” app script from the dependencies (and of course further splitting should be supported).
The exact specifics need to be worked out for how native JavaScript would load the secondary bundle while the plugin, if installed, would prevent that request and use package management instead.
Would this require a custom bundler, or could an existing bundler do this in an acceptable way?

### Testing & Debugging
This could complicate development as different users could end up with different combinations of package versions.
The plugin should probably provide a user-friendly means of creating a bug report with exact versions in use, and stack traces if available.

### Abuse by Developers
[More highways equals more traffic](https://usa.streetsblog.org/2017/06/21/the-science-is-clear-more-highways-equals-more-traffic-why-are-dots-still-ignoring-it/).
I’d hate for developers to see this as a carte blanche for dumping _more_ dependencies on a site, but that’s sure to happen.
I don’t have a great solution to this at this time, but I would certainly be on the lookout for any ways to incentivize developers to keep their dependencies in check.
The browser must pull them down the first time they’re required, after all.

### WASM
Client side package management addresses network bloat, but there remains the overhead of parsing those scripts every time they’re used.
Can we leverage (or even require) WASM to speed things up even more?

### Exit Strategy
I mentioned flashbacks to "this site requires Flash" notices.
This could be amazing now, but I would hate for this to still be the status quo ten years from now.
I would hope some future iteration on the idea (including a formalization of what constitutes a “package”) could make its way into the native platform and then this project could be sunset.

### Security
When it comes down to it, your webpage could be running code that was installed by some other unknown website.
This sounds _Really Bad_ when put in those terms.
However, this only applies to code installed directly off of a known package repository (e.g. npm), and only if your site explicitly asked for that same package to be run.
The key task here would be to ensure this can’t be spoofed.
I would also presents the user with a big red dialog box about “unfamiliar package repository” if a site ever tried to install a package from anywhere else.
(You could restrict it to npm only, but I want to leave the door open for alternatives like [Entropic](https://www.entropic.dev/).)
Fingerprinting based on which packages load instantly from cache could also be a concern.

## Conclusion

Obviously a lot of the technical details would need to be ironed out, if this is something to pursue.
I’ve resisted the temptation in this post to go down that road, and instead focused on more on the general concept.
So what do you think?
Am I crazy or could this work?
