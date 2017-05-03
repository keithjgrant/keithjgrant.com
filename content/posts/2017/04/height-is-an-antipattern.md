+++
title = "Specifying height is an antipattern"
date = "2017-03-15T15:33:22-04:00"
draft = true

+++
The title says it all.

Reasons developers set height:

* hero image
* button height/row of nav buttons
* screen height
  * height: 100% Ha!
  * height: 100% works in grid (https://codepen.io/webcraftsman/pen/gmxoNO)
* aspect ratio
* fixed container (modal): okay as percent, or use top/bottom
* columns of equal height
* exception: transitioning to height auto
  * height: 0 is okay  :P
