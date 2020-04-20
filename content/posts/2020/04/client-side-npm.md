---
title: "Proposed: Client Side NPM"
date: 2020-04-20T10:13:48-07:00
draft: true
---

{{< alert >}}
Disclaimer: this is an _idea_.
At this point, I’m not entirely convinced it’s a _good_ idea, but it’s an idea nonetheless.
This is something I thought of about a year ago, and recent discussions brought it back to mind.
The point of this post is to flush out the idea a bit, as a sort of thought experiment.
Take this with a grain of salt, and I’d gladly welcome feedback and critique.
{{< /alert >}}

So the web has a performance problem.
I’ll concede the point that some of this is due to either over-engineered solutions or lazy developers who add dependencies without much thought to the ramifications.
But there are plenty of sites and apps out there that legitimately require complexity, large dependencies, and lots of code.

This is a proposed solution to help address this problem: Client Side Package Management.

## Cut Network Traffic

Conceptually, it would work like this:
When a site needs a dependency such as React, instead of including React in the core bundle, it would remain in a separate file.
If the browser supports client side package management, it would go directly to NPM, fetch the appropriate version, and store it locally.
On subsequent visits, the core script can be re-downloaded (or fetched from normal browser cache), but the React dependency would already be available locally in the package manager, so it would not need to be downloaded again.

On many, many sites, the bulk of the bundle comes from dependencies.
This means we spend most of our bandwidth downloading the same code over and over again as we browse the web.
Client side package management offloads all of that into an efficient caching strategy.
If two completely unrelated sites both use React Router, they can use the same local copy without repeatedly pulling it down the wire.
If a user frequently visits your app, they only need to re-download the code you wrote; not all of its dependencies.

If the browser does not support client side package management, it would fetch the scripts dependencies in a second bundle from the page’s server.
The page would effectively work just like the web does today.
This can be a fully backwards-compatible enhancement.

In some ways, this is an iteration on the idea of a CDN, which among other things attempt to save bandwidth by relying on browser caching.
In practice, though, CDNs very rarely produce hits in the browser cache;
too many sites rely on slightly different version numbers or different host CDNs to ever gain that benefit.
With this approach, the host is always the user’s computer and it is fully aware of semantic versioning;
One site relying on `lodash ^4.17.4` and another using `lodash ^4.17.10` would share the same resource.

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

### Versioning

This would be fully aware of semantic versioning.
If a page depends on a version `^3.14.0` and version `3.14.7` is found in the local cache, the already-available package would be used.
Meanwhile, the client could even perform a check in the background if any newer version is available, and if it is, download it in a low-priority network request for use in subsequent visits to pages that rely on it.

I’m a little hesitant about that last part.
We wouldn’t want to chew through disk space eagerly storing unnecessary files.
But either way, there should probably some sort of cleanup algorithm that takes into account how frequently a specific package is used and how long it has been since last use, automatically deleting those that seem to be outdated.
The user could even customize how much disc space they wish to allow for package storage.

## Questions, Problems, Miscellaneous Thoughts

* **Bundling**: This would definitely require code splitting to separate the “core” app script from the dependencies. The exact specifics need to be worked out for how native JavaScript would load the secondary bundle but the plugin would prevent that request and use package management instead. Would this require a custom bundler? Make this friendly with JavaScript modules!
* **Complicates testing**: This could complicate development as different users could end up with different combinations of package versions. It should probably include a user-friendly means of producing a bug report with exact versions in use, and stack traces if available.
* **Abuse**: [More highways equals more traffic](https://usa.streetsblog.org/2017/06/21/the-science-is-clear-more-highways-equals-more-traffic-why-are-dots-still-ignoring-it/). I’d hate for developers to see this as a carte blanche for dumping _more_ dependencies on a site, but that’s sure to happen. I don’t have a great solution to this at this time.
* **WASM**: Client side package management addresses network bloat, but there remains the overhead of parsing those scripts every time they’re used. Can we leverage (or even require) WASM to speed things up even more?
* **Exit Strategy**: I mentioned flashbacks to "this site requires Flash" notices. This could be amazing now, but I would hate for this to still be the status quo ten years from now. I would hope some future iteration on the idea (including a formalization of what constitutes a “package”) could make its way into the native platform and then this project could be sunset.
