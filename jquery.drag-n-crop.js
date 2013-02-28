/*
 * jquery.drag-n-crop
 * https://github.com/fiszer/drag-n-crop
 *
 * Copyright (c) 2012 Lukasz Fiszer
 * Licensed under the MIT license.
 */

;(function ( $, window, document, undefined ) {

    $.widget( "fotomaton.drag2crop" , {

        options: {
            containmentClass: 'containment',
            overlayClass: 'overlay',
            containerActiveClass: 'dragging',
            position: { top: 0, left: 0 },
            centered: false,
            overlay: false
        },

        move: function ( position ) {

          if( !position ){
            throw new Error('position object must be provided');
          }

          if (position.left === undefined && position.top === undefined ) {
            throw new Error('position object must contain "left" or "top" props');
          }

          if( $.isNumeric(position.left) && this.axis === 'x'){

            var left = - position.left * this.offsetX;
            this.element.css('left', left);

          } else if( $.isNumeric(position.top) && this.axis === 'y'){

            var top = - position.top * this.offsetY;
            this.element.css('top', top);

          }
        },

        getPosition: function( position ) {

          return {
            left : ( - position.left / this.offsetX) || 0,
            top : (- position.top / this.offsetY) || 0
          };

        },

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {

            this.container = $(this.element.parent());

            var dfd = this.element.imagesLoaded();
            var self = this;

            dfd.done( function( ){
              self._getDimensions.call(self);
              self._makeDraggable.call(self);
            } );

        },

        _getDimensions: function() {

          this.offsetX = this.element.width() - this.container.width();
          this.offsetY = this.element.height() - this.container.height();
          this.axis = this.element.width() / this.element.height() > 1 ? 'x' : 'y';

        },


        _makeDraggable : function () {

          var containement = this._insertContainment();
          var overlay      = this._insertOverlay();
          var axis         = this.axis;
          var position     = this.options.position;

          var draggable = this.draggable = this.element.draggable({
            axis: axis,
            containment: containement
          });

          draggable.bind('dragstart', $.proxy( function () {
            this.container.addClass( this.options.containerActiveClass );
          }, this) );

          draggable.bind('dragstop', $.proxy( function( event, ui ){
            this._dragStop( event , ui );
            this.container.removeClass( this.options.containerActiveClass );
          }, this) );

          if(this.options.overlay){
            draggable.bind('drag', $.proxy( function ( event, ui ) {
              this._adaptOverlay( ui );
            }, this) );
          }

          if(this.options.centered){
            position = {left: 0.5, top: 0.5};
          }

          if( position && ( position.top !== 0 || position.left !== 0)) {
            this.move(position);
          }

        },

        _dragStop: function( event, ui ) {

          this._trigger('dragged', event, this.getPosition(ui.position) );

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

          var containment = $('<div/>').addClass(this.options.containmentClass)
                            .css('top',top).css('bottom', bottom)
                            .css('left',left).css('right',right)
                            .css('position','absolute');

          return this.containment = containment.insertBefore(this.element);

        },

        _insertOverlay: function(){

          var overlay = $('<div>').addClass(this.options.overlayClass);
          this.overlay = overlay.insertBefore(this.element);
          return this.overlay;
        }

    });

})( jQuery, window, document );
