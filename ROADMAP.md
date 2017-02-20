# Quixote Roadmap

## Release Ideas

* **✔ v0.1** Basic DOM manipulation; raw position and style information
* **✔ v0.2** "Cooked" absolute position info; initial assertion API
* **✔ v0.3** Positioning relative to other elements
* **✔ v0.4** Advanced positioning (middle, center, height, width, arithmetic, fractions)
* **✔ v0.5** API hardening
* **✔ v0.6** Responsive design
* **✔ v0.7** Page and viewport assertions
* **✔ v0.8 - v0.11** Dogfooding and real-world usage (more dogfooding releases to come)
* **✔ v0.12** Element display status descriptors
* **v0.13** Element visibility descriptors, including @woldie's clip
* ...more TBD


## Current Feature: Element Visibility (0.13 release)

* ElementVisibleEdge descriptor
* ElementVisibleSize descriptor
* Visibility descriptor
* QElement.bounds.* (synonym for QElement.top, .height, .center. etc.)
* API docs
* changelog


## To Do: ElementVisibleEdge descriptor

(Note: do not include children's visibility)

* positioned off-screen
	* left
	* top
	* right?
	* bottom?
	* partially off-screen
* overflow
* clip
* opacity
* filter
* visibility
* display
* clip-path should throw exception
* 'QElement.bounds' descriptor (equivalent to QElement.top, .left, etc.)



## Dogfooding Notes

* Switch assertion errors to say what the correct value should be? In other words, rather than saying "top edge of '.navbar' was 13px lower than expected.", say "top edge of '.navbar' should be 13px lower."?
* Provide a better way of integrating with standard assertion libraries? Use `valueOf()`?
* Consider how to support less-than, greater-than, etc.
	* Alternative assert mechanism? `element.assert.equal()` `.assert.lessThan()` etc? with `should` as alias to `assert`?
* Provide better error message when cross-origin 'src' provided to quixote.createFrame
* Add workaround for IE 8 not working with `frame.add("<style>...</style>")` (addAll? browser feature detect? Need to check if there's no way to insert styles into the document, or if it just doesn't like the way `add()` works.)  
* Add `QElement.add()`?


## Future Features

* Z-ordering
* Support multiple assertions? (e.g., `top.diff([bar.left, baz.right]);`)
* Distances or Spans? (e.g., height of menu is equal to distance between logo top and headline bottom)
  * Could width and height be reimplemented as a Span? Would a Span have a center, for example?
    * Even if it could, would it be a good idea?
    * E.g., Me.width = function() { this.left.to(this.right) };
  * Use case: "the bottom edge of 'foo' is above the fold (600px)".
  * .max and .min?  `foo.assert({ bottom: top.plus(600).max });`   `foo.assert({ bottom: q.max(600) });`
* Colors? Contrast (fg color vs. bg color?))
* Plugin API
