/*global describe:false, it:false, assert:false,
beforeEach:false, afterEach:false, before:false, after:false */

describe('jquery.dragncrop.js', function() {

  beforeEach(function() {
    $('#sandbox').append($('<div style="width: 200px; height: 200px">\
                         <img src="350x250.gif" id="imgv" /></div>'));
    $('#sandbox').append($('<div style="width: 200px; height: 200px">\
                         <img src="250x350.gif" id="imgh"/></div>'));
  });

  afterEach(function() {
    $('#sandbox').html('');
  });

  it('is a jquery plugin', function() {
    assert.isFunction($.fn.dragncrop);
  });

  it('returns the object', function() {
    var el = $('#imgv');
    assert.equal(el, el.dragncrop());
  });

  describe('after initialization', function() {

    it('is an instance of jquery.ui.draggable', function() {
      var el = $('#imgv').dragncrop().imagesLoaded(function(){
        // if is not an instance, will throw error
        el.draggable('widget');
      });
    });

    it('adds class to the parent container if it is not present', function() {
      var el = $('#imgv').dragncrop();
      assert.isTrue(el.parent().hasClass('dragncrop'));
    });

    it('resizes img to container', function(done) {
      $('#imgv').dragncrop();
      $('#imgh').dragncrop();
      $('#sandbox img').imagesLoaded(function() {
        assert.equal($('#imgv').height(), 200);
        assert.equal($('#imgh').width(), 200);
        done();
      });
    });

  });

});