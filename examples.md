---
layout: index
---

# examples

basic usage
===========

  <div style="width: 200px; height:200px">
    <img src="/images/photo-sf.jpeg" id="photo1"/>
  </div>

<script type="text/javascript">
$('#photo1').dragncrop();
</script>

{% highlight js %}
$('#photo1').dragncrop();
{% endhighlight %}


overflow + overlay
==================

  <div style="width: 200px; height:200px">
    <img src="/images/photo-sf.jpeg" id="photo2"/>
  </div>

<script type="text/javascript">
$('#photo2').dragncrop({overlay: true, overflow: true});
</script>

{% highlight javascript %}
$('#photo2').dragncrop({overlay: true, overflow: true});
{% endhighlight %}


initial position
================

  <div style="width: 200px; height:200px">
    <img src="/images/photo-sf.jpeg" id="photo3"/>
  </div>

<script type="text/javascript">
$('#photo3').dragncrop({position: { offset: [0.75,0]}});
</script>

{% highlight javascript %}
$('#photo3').dragncrop({position: { offset: [0.75,0]}});
{% endhighlight %}


vertical photo with instruction
=================================

  <div style="width: 200px; height:200px">
    <img src="/images/photo-ny.jpeg" id="photo4"/>
  </div>

<script type="text/javascript">
$('#photo4').dragncrop({instruction: true});
</script>

{% highlight javascript %}
$('#photo4').dragncrop({instruction: true});
{% endhighlight %}


event listeners
=================================

  <div style="width: 200px; height:200px">
    <img src="/images/photo-sf.jpeg" id="photo5"/>
  </div>
  <div id="photo5-log">Drag to see events</div>

<script type="text/javascript">
$('#photo5').dragncrop({
  start: function(){
    $('#photo5-log').css('background', '#ccc')
  },
  drag: function(event, position){
    console.log(arguments)
    $('#photo5-log').html('Event: dragging. Postion (offset): ' + position.offset)
  },
  stop: function(e){
    $('#photo5-log').css('background', '#fff')
  }
});
</script>

{% highlight javascript %}
$('#photo5').dragncrop({
  start: function(){
    $('#photo5-log').css('background', '#ccc')
  },
  drag: function(event, position){
    $('#photo5-log').html('Event: dragging. Postion (offset): ' + position.offset)
  },
  stop: function(e){
    $('#photo5-log').css('background', '#fff')
  }
});
{% endhighlight %}





chaining
=================================

  <div style="width: 100px; height:100px">
    <img src="/images/photo-sf.jpeg" id="photo6-small"/>
  </div>

  <div style="width: 300px; height:300px">
    <img src="http://lorempixel.com/400/300/city/9/" id="photo6-large"/>
  </div>


<script type="text/javascript">
$('#photo6-small').dragncrop({
  drag: function(event, position){
    $('#photo6-large').dragncrop('move', position);
  }
});
$('#photo6-large').dragncrop({
  drag: function(event, position){
    $('#photo6-small').dragncrop('move', position);
  }
});
</script>


{% highlight javascript %}
$('#photo6-small').dragncrop({
  drag: function(event, position){
    $('#photo6-large').dragncrop('move', position);
  }
});
$('#photo6-large').dragncrop({
  drag: function(event, position){
    $('#photo6-small').dragncrop('move', position);
  }
});
{% endhighlight %}