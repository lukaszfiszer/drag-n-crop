![jquery.drag-n-crop](assets/logo.png "jQuery drag'n'crop logo")

A jQuery plugin for croping images by dragging, inspired by Facebook cover photo.

It aims to be minimalistic and very easy to use for the end-user. It allows to crop only one dimension of the image. A typical usecase is to crop photos into the same ratio.  If you search for a more advanced croping plugin, there are some [other](https://github.com/tapmodo/Jcrop) [plugins](http://odyniec.net/projects/imgareaselect/) available.

Quick demo
-------------
![jquery.drag-n-crop](assets/demo.gif "jQuery drag'n'crop logo")

Dependencies
-------------

* jQuery
* jQuery UI draggable
* [imagesloaded](/desandro/imagesloaded)


Usage
-----

1. Include drag'n'crop JS and CSS files (+ and its dependencies, if you dont have them already) on your site.
  ```
  <script src='jquery.drag-n-crop.js'></script>
  (...)
  <link rel="stylesheet" href="jquery.drag-n-crop.css">
  ```
2. Wrap the photo you want to crop in a element with desired width and height
  ```
  <div style="width: 200px; height:200px"><img src="/path/to/photo.jpg" id="photo"/></div>
  ```
3. Initialize the plugin
  ```
  $('#photo').dragncrop();
  ```

jQuery drag'n'crop automatically resizes your photo.

API
---

*jQuery.drag'n'crop* is build using [jQuery widget factory](http://api.jqueryui.com/jQuery.widget/), providing a standard way of interacting with the plugin. It inherits all default [options, events and methods](http://api.jqueryui.com/jQuery.widget/#jQuery-Widget2) but also provides some custom ones, described below:  

### Init options

You can customize behaviour of the plugin by passing an option object on initialization, example:

```
$('#photo').dragncrop({
  centered: true,
  overflow: true
});
```

Here's the complete list of available options

| Options                | Description                                       | Default |
| -----------------------|---------------------------------------------------|-------|
| position               | initial position                                  | undefined   |
| centered               | centers image in the container on init            |   false   |
| overflow               | show image oveflow when dragging                  |   false   |
| overlay                | show oveflow with a colored overlat when dragging |   false   |
| instruction            | show text instruction on image                    | false   |
| instructionText        | customize instruction text                        | 'Drag to crop' |
| instructionHideOnHover | hides instruction when hovering over image        | true   |


### Events

Event listener function are passed to the constructor in the same way as options.

### Instance methods

#### .move(*position*)

#### .getPosition(*position*)

#### .destroy(*position*)


Release History
---------------
_(Nothing yet)_


