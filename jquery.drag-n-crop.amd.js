/*!
 * jquery.drag-n-crop
 * https://github.com/lukaszfiszer/drag-n-crop
 *
 * Copyright (c) 2013 Lukasz Fiszer
 * Licensed under the MIT license.
 */

define(['jquery',
       'jqueryui/draggable',
       'jqueryui/core',
       'jqueryui/mouse',
       'jqueryui/widget'
       ], function ($) {

  $.widget( "lukaszfiszer.dragncrop" , {

        classes: {
          // Basic classes
          container: 'dragncrop',
          containerActive: 'dragncrop-dragging',
          containment: 'dragncrop-containment',
          horizontal: 'dragncrop-horizontal',
          vertical: 'dragncrop-vertical',

          // Options' classes
          overflow: 'dragncrop-overflow',
          overlay: 'dragncrop-overlay',
          instruction: 'dragncrop-instruction',
          instructionHide: 'dragncrop-instruction-autohide',
          instructionText: 'dragncrop-instruction-text'
        },

        options: {
          // Initial position
          position: {},
          centered: false,

          // Simple overflow:
          overflow: false,

          // Overflaid overflow
          overlay: false,

          // Drag instruction
          instruction: false,
          instructionText: 'Drag to crop',
          instructionHideOnHover: true,
        },

        move: function ( position ) {

          var left, top, x, y;

          if( !position ){
            throw new Error('position object must be provided');
          }

          if (position.offset === undefined && position.dimension === undefined ) {
            throw new Error('position object must contain "left" or "top" props');
          }

          if( this.axis === 'x' && position.offset ){
            left = -position.offset[0] * this.offsetX;
            this.element.css('left', left);
            this.element.css('top', 0);
          } else
          if( this.axis === 'x' && position.dimension ){
            left = -position.dimension[0] * this.width;
            this.element.css('left', left);
            this.element.css('top', 0);
          } else

          if( this.axis === 'y' && position.offset ){
            top = -position.offset[1] * this.offsetY;
            this.element.css('left', 0);
            this.element.css('top', top);
          } else
          if( this.axis === 'y' && position.dimension ){
            top = -position.dimension[1] * this.height;
            this.element.css('left', 0);
            this.element.css('top', top);
          }

          this._setPosition( { left: left, top: top });

        },

        _create: function () {

          this.container = $(this.element.parent());
          this.container.addClass(this.classes.container);

          if( this.options.overflow || this.options.overlay){
            $(this.container).addClass(this.classes.overflow);
          }

          var dfd = this.element.imagesLoaded();
          var self = this;

          dfd.done(function(){
            if(self._setAxis.call(self)){
              self._getDimensions.call(self);
              self._makeDraggable.call(self);
              if (self.options.loaded) {
                self.options.loaded();
              }
            }
          });

        },

        _destroy: function() {
          this.draggable.draggable('destroy');
          this.container.find('.' + this.classes.containment + ',' +
                              '.' + this.classes.overlay  + ',' +
                              '.' + this.classes.instruction).remove();
          this.element.removeClass(this.classes.horizontal)
                      .removeClass(this.classes.vertical);
        },

        getPosition: function() {
          return {
            offset : [
              ( -this.position.left / this.offsetX) || 0,
              ( -this.position.top / this.offsetY) || 0
            ],
            dimension : [
              ( -this.position.left / this.width) || 0,
              ( -this.position.top / this.height) || 0
            ]
          };

        },

        _getDimensions: function() {

          this.width = this.element.width();
          this.height = this.element.height();

          this.containerWidth = this.container.width();
          this.containerHeight = this.container.height();

          this.offsetX = this.width - this.containerWidth;
          this.offsetY = this.height - this.containerHeight;

        },

        _setAxis: function() {

          this.photoRatio = this.element.width() / this.element.height();
          this.containerRatio = this.container.width() / this.container.height();

          if (this.photoRatio > this.containerRatio) {

            this.axis = 'x';
            $(this.element).addClass(this.classes.horizontal);
            return true;

          } else if (this.photoRatio < this.containerRatio) {

            this.axis = 'y';
            $(this.element).addClass(this.classes.vertical);
            return true;

          }else{

            return false;

          }

        },

        _setPosition: function( obj ) {
          this.position = obj;
        },

        _makeDraggable : function () {

          var axis         = this.axis;
          var position     = this.options.position;
          var containement = this._insertContainment();

          var draggable = this.draggable = this.element.draggable({
            axis: axis,
            containment: containement
          });

          this._on({
            dragstart: function (event, ui) {
              this._dragStart( event , ui );
              this.container.addClass( this.classes.containerActive );
            },
            drag: function( event, ui ){
              this._dragging( event , ui );
              if (this.options.overlay) {
                this._adaptOverlay( ui );
              }
            },
            dragstop: function( event, ui ){
              this._dragStop( event , ui );
              this.container.removeClass( this.classes.containerActive );
            }
          });

          if(this.options.overlay){
            this._insertOverlay();
          }

          if(this.options.instruction){
            this._insertInstruction();
          }

          if(this.options.centered){
            position = { offset : [0.5, 0.5] };
          }

          if( position && ( position.offset || position.coordinates)) {
            this.move(position);
          }else{
            this._setPosition({ left: 0, top: 0 });
          }

        },

        _dragStart: function( event, ui ) {
          this._setPosition(ui.position);
          this._trigger('start', event, this.getPosition() );
        },

        _dragging: function( event, ui ) {
          this._setPosition(ui.position);
          this._trigger('drag', event, this.getPosition() );
        },

        _dragStop: function( event, ui ) {
          this._setPosition(ui.position);
          this._trigger('stop', event, this.getPosition() );
        },


        _insertOverlay: function(){

          var overlay = $('<div>').addClass(this.classes.overlay);
          this.overlay = overlay.insertBefore(this.element);
          return this.overlay;

        },

        _adaptOverlay: function( ui ) {

          if ( this.axis === 'x' ) {

            this.overlay.css('left', ui.position.left)
                        .css('border-left-width', -ui.position.left)
                        .css('right', -ui.position.left - this.offsetX)
                        .css('border-right-width', ui.position.left + this.offsetX);

          } else if ( this.axis === 'y' ){

            this.overlay.css('top', ui.position.top)
                        .css('border-top-width', -ui.position.top)
                        .css('bottom', -ui.position.top - this.offsetY )
                        .css('border-bottom-width', ui.position.top + this.offsetY );
          }

        },

        _insertContainment: function() {

          var top    = - this.offsetY;
          var bottom = - this.offsetY;
          var left   = - this.offsetX;
          var right  = - this.offsetX;

          var containment = $('<div/>').addClass(this.classes.containment)
                            .css('top',top).css('bottom', bottom)
                            .css('left',left).css('right',right)
                            .css('position','absolute');

          this.containment = containment.insertBefore(this.element);
          return this.containment;

        },

        _insertInstruction: function() {
          this.instruction = $('<div>').addClass(this.classes.instruction);
          if(this.options.instructionHideOnHover){
            this.instruction.addClass(this.classes.instructionHide);
          }
          this.instruction.append(
            $('<span></span>').text(this.options.instructionText)
                              .addClass(this.classes.instructionText)
          );
          this.instruction.insertAfter(this.element);
          return this.instruction;
        },

    });

});
