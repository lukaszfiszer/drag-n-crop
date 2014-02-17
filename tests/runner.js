/*global describe:false, it:false, assert:false,
beforeEach:false, afterEach:false, before:false, after:false */

describe('jquery.dragncrop.js', function() {

  var sandbox, imgv, imgh, assert = chai.assert;

  before(function() {
    sandbox = $('<div id="sandbox"></div>').appendTo($('body'))
  })

  beforeEach(function() {
    sandbox.append($('<div style="width: 200px; height: 200px"><img src="/base/tests/fixtures/350x250.gif" id="imgh" /></div>'));
    sandbox.append($('<div style="width: 200px; height: 200px"><img src="/base/tests/fixtures/250x350.gif" id="imgv"/></div>'));
  });

  afterEach(function() {
    sandbox.html('');
  });

  it('is a jquery plugin', function() {
    assert.isFunction($.fn.dragncrop);
  });

  it('returns the object', function() {
    var el = $('#imgv');
    assert.equal(el, el.dragncrop());
  });

  describe('after initialization', function() {

    it('is an instance of jquery.ui.draggable', function(done) {
      var el = $('#imgv').dragncrop();
      setTimeout(function() {
        // if is not an instance, will throw error
        el.draggable('widget');
        done()
      }, 50);
    });

    it('adds class to the parent container if it is not present', function() {
      var el = $('#imgv').dragncrop();
      assert.isTrue(el.parent().hasClass('dragncrop'));
    });

    it('applies "dragncrop-horizontal" class on the element if horizontal', function(done) {
      $('#imgh').dragncrop();
      setTimeout(function() {
          assert.isTrue($('#imgh').hasClass('dragncrop-horizontal'));
          done();
      }, 50);
    });

    it('applies "dragncrop-horizontal" class on the element if vertical', function(done) {
      $('#imgv').dragncrop();
      setTimeout(function() {
        assert.isTrue($('#imgv').hasClass('dragncrop-vertical'));
        done();
      }, 50);
    });

    it('applies "dragncrop-vertical" class on the element in function of proportion', function(done) {
      $('#imgv').dragncrop();
      $('#sandbox img').imagesLoaded(function() {
        assert.isTrue($('#imgv').hasClass('dragncrop-vertical'));
        done();
      });
    });

    it('resizes vertical img to container', function(done) {
      $('#imgv').dragncrop();
      $('#sandbox img').imagesLoaded(function() {
        assert.equal($('#imgv').width(), 200);
        done();
      });
    });

    it('resizes horizontal img to container', function(done) {
      $('#imgh').dragncrop();
      $('#sandbox img').imagesLoaded(function() {
        assert.equal($('#imgh').height(), 200);
        done();
      });
    });

  });


  describe('getPosition method', function() {

    it('returns a dictionary with two types of coordinates for horizontal images', function(done) {
      var el = $('#imgh').dragncrop({centered: true});
      setTimeout(function() {
        var pos = el.dragncrop('getPosition');
        assert.equal(pos.offset[0], '0.5');
        assert.equal(pos.dimension[0].toPrecision(2), '0.14');
        done();
      }, 50);
    });

    it('returns a dictionary with two types of coordinates for vertical images', function(done) {
      var el = $('#imgv').dragncrop({centered: true});
      el.imagesLoaded(function() {
        var pos = el.dragncrop('getPosition');
        assert.equal(pos.offset[1], '0.5');
        assert.equal(pos.dimension[1].toPrecision(2), '0.14');
        done();
      });
    });

  });

  describe('destroy method', function() {

    it('removes draggable widget', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();

      el.imagesLoaded(function() {
        el.dragncrop('destroy');
        try {
          el.draggable('widget');
        }
        catch (e){
          err = e;
        }
        assert.isNotNull(err, 'Catched error');
        done();
      });
    });

    it('returns element inner html to the initial state', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();
      var before = el.parent().children();
      el.imagesLoaded(function() {
        var after = el.dragncrop('destroy').parent().children();
        assert.equal(before.length, after.length);
        done();
      });
    });

    it('cleans up classes from container', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();
      var before = el.parent().attr('class');
      el.imagesLoaded(function() {
        var after = el.dragncrop('destroy').parent().attr('class');
        assert.equal(before, after);
        done();
      });
    });

    it('cleans up classes from element', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();
      var before = el.attr('class') || '';
      el.imagesLoaded(function() {
        var after = el.dragncrop('destroy').attr('class');
        assert.equal(before, after);
        done();
      });
    });

  });

});