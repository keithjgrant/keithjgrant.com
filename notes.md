voxpelli: and yes, your h-card should probably only be on your homepage/about-page – at least your authoritative h-card

aaronpk: also <a class="p-url" should be <a class="u-url" otherwise the parser uses the text inside the <a> as the value of "url"
and if your post permalink is going to have more than one top-level h-* object, then you need to set the u-url property of the primary object which in your case is h-entry
