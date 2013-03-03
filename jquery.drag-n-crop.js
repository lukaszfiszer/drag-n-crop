/*!
 * jquery.drag-n-crop
 * https://github.com/lukaszfiszer/drag-n-crop
 *
 * Copyright (c) 2013 Lukasz Fiszer
 * Licensed under the MIT license.
 */

;(function ( $, window, document, undefined ) {

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
          position: { x: 0, y: 0 },
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

          if( !position ){
            throw new Error('position object must be provided');
          }

          if (position.x === undefined && position.y === undefined ) {
            throw new Error('position object must contain "left" or "top" props');
          }

          if( $.isNumeric(position.x) && this.axis === 'x'){

            var left = - position.x * this.offsetX;
            this.element.css('left', left);

          } else if( $.isNumeric(position.y) && this.axis === 'y'){

            var top = - position.y * this.offsetY;
            this.element.css('top', top);

          }
        },

        _create: function () {

          this.container = $(this.element.parent());
          this.container.addClass(this.classes.container);

          if( this.options.overflow || this.options.overlay){
            $(this.container).addClass(this.classes.overflow);
          }

          var dfd = this.element.imagesLoaded();
          var self = this;

          dfd.done( function( ){
            if(self._checkProportions()){
              self._getDimensions.call(self);
              self._makeDraggable.call(self);
            }
          } );

        },

        _destroy: function() {
          this.draggable.draggable('destroy');
          this.container.find('.' + this.classes.containment + ',' +
                            '.' + this.classes.overlay  + ',' +
                            '.' + this.classes.instruction).remove();
          this.element.removeClass(this.classes.horizontal)
                      .removeClass(this.classes.vertical);
        },

        _getPosition: function( ui ) {

          return {
            position : {
              x : ( -ui.position.left / this.offsetX) || null,
              y : ( -ui.position.top / this.offsetY) || null
            },
            offset : {
              x : ( -ui.position.left / this.containerWidth) || null,
              y : ( -ui.position.top / this.containerHeight) || null
            }
          };

        },

        _checkProportions: function() {

          this.width = this.element.width();
          this.height = this.element.height();
          this.containerWidth = this.container.width();
          this.containerHeight = this.container.height();

          if (this.width > this.height) {
            $(this.element).addClass(this.classes.horizontal);
            return true;
          } else if (this.width < this.height) {
            $(this.element).addClass(this.classes.vertical);
            return true;
          }else{
            return false;
          }

        },

        _getDimensions: function() {

          this.offsetX = this.element.width() - this.container.width();
          this.offsetY = this.element.height() - this.container.height();
          this.axis = this.element.width() / this.element.height() > 1 ? 'x' : 'y';

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
            position = {x: 0.5, y: 0.5};
          }

          if( position && ( position.x !== 0 || position.y !== 0)) {
            this.move(position);
          }

        },

        _dragStart: function( event, ui ) {
          this._trigger('start', event, this._getPosition(ui) );
        },

        _dragging: function( event, ui ) {
          this._trigger('drag', event, this._getPosition(ui) );
        },

        _dragStop: function( event, ui ) {
          this._trigger('stop', event, this._getPosition(ui) );
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

})( jQuery, window, document );
