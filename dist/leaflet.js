/*
 Copyright (c) 2010, CloudMade
 Leaflet is a BSD-licensed JavaScript library for map display and interaction.
 Check out the source on GitHub: http://github.com/CloudMade/Leaflet/
*/
var L={VERSION:"0.0.2",ROOT_URL:function(){for(var a=document.getElementsByTagName("script"),b=0,c=a.length;b<c;b++){var d=a[b].src;if((d=d&&d.match(/^(.*\/)leaflet-*\w*\.js.*$/))&&d[1])return d[1]}return"../dist/"}(),noConflict:function(){L=this._originalL;return this},_originalL:L};L.Util={extend:function(a){for(var b=Array.prototype.slice.call(arguments,1),c=0,d=b.length,e;c<d;c++){e=b[c]||{};for(var f in e)if(e.hasOwnProperty(f))a[f]=e[f]}return a},bind:function(a,b){return function(){return a.apply(b,arguments)}},stamp:function(){var a=0;return function(b){b._leaflet_id=b._leaflet_id||++a;return b._leaflet_id}}(),limitExecByInterval:function(a,b,c){function d(){e=false;if(f){g.callee.apply(c,g);f=false}}var e,f,g;return function(){g=arguments;if(e)f=true;else{e=true;setTimeout(d,
b);a.apply(c,g)}}},deferExecByInterval:function(a,b,c){function d(){f=false;a.apply(c,e)}var e,f;return function(){e=arguments;if(!f){f=true;setTimeout(d,b)}}},falseFn:function(){return false},formatNum:function(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}};L.Class=function(){};
L.Class.extend=function(a){function b(){!L.Class._prototyping&&this.initialize&&this.initialize.apply(this,arguments)}L.Class._prototyping=true;var c=new this;L.Class._prototyping=false;c.constructor=b;b.prototype=c;c.superclass=this.prototype;if(a.statics){L.Util.extend(b,a.statics);delete a.statics}if(a.includes){L.Util.extend.apply(null,[c].concat(a.includes));delete a.includes}if(a.options&&c.options)a.options=L.Util.extend(c.options,a.options);L.Util.extend(c,a);b.extend=arguments.callee;b.include=
function(e){L.Util.extend(this.prototype,e)};for(var d in this)if(this.hasOwnProperty(d)&&d!="prototype")b[d]=this[d];return b};L.Mixin={};
L.Mixin.Events={addEventListener:function(a,b,c){var d=this._leaflet_events=this._leaflet_events||{};d[a]=d[a]||[];d[a].push({action:b,context:c});return this},hasEventListeners:function(a){return"_leaflet_events"in this&&a in this._leaflet_events&&this._leaflet_events[a].length>0},removeEventListener:function(a,b,c){if(!this.hasEventListeners(a))return this;for(var d=0,e=this._leaflet_events,f=e[a].length;d<f;d++)if(e[a][d].action===b&&(!c||e[a][d].context===c)){e[a].splice(d,1);return this}return this},fireEvent:function(a,
b){if(this.hasEventListeners(a)){for(var c=L.Util.extend({type:a,target:this},b),d=this._leaflet_events[a].slice(),e=0,f=d.length;e<f;e++)d[e].action.call(d[e].context||this,c);return this}}};L.Mixin.Events.on=L.Mixin.Events.addEventListener;L.Mixin.Events.off=L.Mixin.Events.removeEventListener;L.Mixin.Events.fire=L.Mixin.Events.fireEvent;(function(){var a=navigator.userAgent.toLowerCase(),b=!!window.ActiveXObject,c=a.indexOf("webkit")!=-1,d=a.indexOf("mobile")!=-1;L.Browser={ie:b,ie6:b&&!window.XMLHttpRequest,webkit:c,webkit3d:c&&"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,mobileWebkit:c&&d,gecko:a.indexOf("gecko")!=-1}})();L.DomEvent={addListener:function(a,b,c,d){function e(g){return c.call(d||a,g||L.DomEvent._getEvent())}var f=L.Util.stamp(c);a["_leaflet_"+b+f]=e;if("addEventListener"in a){b=="mousewheel"&&a.addEventListener("DOMMouseScroll",e,false);a.addEventListener(b,e,false)}else"attachEvent"in a&&a.attachEvent("on"+b,e)},removeListener:function(a,b,c){c=L.Util.stamp(c);c="_leaflet_"+b+c;handler=a[c];if("removeEventListener"in a){b=="mousewheel"&&a.removeEventListener("DOMMouseScroll",handler,false);a.removeEventListener(b,
handler,false)}else if("detachEvent"in a){a.detachEvent("on"+b,handler);delete a[c]}},_getEvent:function(){var a=window.event;if(!a)for(var b=arguments.callee.caller;b;){if((a=b.arguments[0])&&Event==a.constructor)break;b=b.caller}return a},stopPropagation:function(a){if(a.stopPropagation)a.stopPropagation();else a.cancelBubble=true},preventDefault:function(a){if(a.preventDefault)a.preventDefault();else a.returnValue=false},getMousePosition:function(a,b){var c=new L.Point(a.pageX?a.pageX:a.clientX+
document.body.scrollLeft+document.documentElement.scrollLeft,a.pageY?a.pageY:a.clientY+document.body.scrollTop+document.documentElement.scrollTop);return b?c.subtract(L.DomUtil.getCumulativeOffset(b)):c},getWheelDelta:function(a){var b=0;if(a.wheelDelta)b=a.wheelDelta/120;if(a.detail)b=-a.detail/3;return b}};L.DomUtil={get:function(a){return typeof a=="string"?document.getElementById(a):a},getStyle:function(a,b){var c=a.style[b];if(typeof c=="undefined"&&a.currentStyle)c=a.currentStyle[b];if(typeof c=="undefined")c=(c=document.defaultView.getComputedStyle(a,null))?c[b]:null;return c=="auto"?null:c},getCumulativeOffset:function(a){var b=0,c=0;do{b+=a.offsetTop-a.scrollTop||0;c+=a.offsetLeft||0;a=a.offsetParent}while(a);return new L.Point(c,b)},TRANSLATE_OPEN:"translate"+(L.Browser.webkit3d?"3d(":"("),
TRANSLATE_CLOSE:L.Browser.webkit3d?",0)":")",getTranslateString:function(a){return L.DomUtil.TRANSLATE_OPEN+a.x+"px,"+a.y+"px"+L.DomUtil.TRANSLATE_CLOSE},setPosition:function(a,b){a._leaflet_pos=b;if(L.Browser.webkit)a.style.webkitTransform=L.DomUtil.getTranslateString(b);else{a.style.left=b.x+"px";a.style.top=b.y+"px"}},getPosition:function(a){return a._leaflet_pos}};L.Draggable=L.Class.extend({includes:L.Mixin.Events,statics:{START:L.Browser.mobileWebkit?"touchstart":"mousedown",END:L.Browser.mobileWebkit?"touchend":"mouseup",MOVE:L.Browser.mobileWebkit?"touchmove":"mousemove"},initialize:function(a,b){this._element=a;this._dragStartTarget=b||a},enable:function(){if(!this._enabled){L.DomEvent.addListener(this._dragStartTarget,L.Draggable.START,this._onDown,this);this._enabled=true}},disable:function(){if(this._enabled){L.DomEvent.removeListener(this._dragStartTarget,
L.Draggable.START,this._onDown);this._enabled=false}},_onDown:function(a){if(!(a.shiftKey||a.which!=1&&a.button!=1&&!a.touches)){a.touches||L.DomEvent.preventDefault(a);if(!(a.touches&&a.touches.length>1)){if(a.touches&&a.touches.length==1)a=a.touches[0];this._dragStartPos=L.DomUtil.getPosition(this._element);this._startX=a.clientX;this._startY=a.clientY;this._disableTextSelection();this._setMovingCursor();L.DomEvent.addListener(document,L.Draggable.MOVE,this._onMove,this);L.DomEvent.addListener(document,
L.Draggable.END,this._onUp,this)}}},_onMove:function(a){L.DomEvent.preventDefault(a);if(!(a.touches&&a.touches.length>1)){if(a.touches&&a.touches.length==1)a=a.touches[0];this._newPos=this._dragStartPos.add(new L.Point(a.clientX-this._startX,a.clientY-this._startY));this._updatePosition();if(!this._moved){this.fire("dragstart");this._moved=true}this.fire("drag")}},_updatePosition:function(){L.DomUtil.setPosition(this._element,this._newPos)},_onUp:function(){this._enableTextSelection();this._restoreCursor();
L.DomEvent.removeListener(document,L.Draggable.MOVE,this._onMove);L.DomEvent.removeListener(document,L.Draggable.END,this._onUp);if(this._moved){this.fire("dragend");this._moved=false}},_setMovingCursor:function(){this._bodyCursor=document.body.style.cursor;document.body.style.cursor="move"},_restoreCursor:function(){document.body.style.cursor=this._bodyCursor},_disableTextSelection:function(){document.selection&&document.selection.empty&&document.selection.empty();if(!this._onselectstart){this._onselectstart=
document.onselectstart;document.onselectstart=L.Util.falseFn}},_enableTextSelection:function(){document.onselectstart=this._onselectstart;this._onselectstart=null}});L.LatLng=L.Class.extend({statics:{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1.0E-9},initialize:function(a,b,c){if(c!==true){a=Math.max(Math.min(a,90),-90);b=(b+180)%360+(b<-180?180:-180)}this.lat=a;this.lng=b},equals:function(a){if(!(a instanceof L.LatLng))return false;return Math.max(Math.abs(this.lat-a.lat),Math.abs(this.lng-a.lng))<=L.LatLng.MAX_MARGIN},toString:function(){return"LatLng( "+L.Util.formatNum(this.lat,5)+", "+L.Util.formatNum(this.lng,5)+" )"}});L.LatLngBounds=L.Class.extend({initialize:function(a,b){for(var c=a instanceof Array?a:[a,b],d=0,e=c.length;d<e;d++)this.extend(c[d])},extend:function(a){if(!this._southWest&&!this._northEast){this._southWest=new L.LatLng(a.lat,a.lng);this._northEast=new L.LatLng(a.lat,a.lng)}else{this._southWest.lat=Math.min(a.lat,this._southWest.lat);this._southWest.lng=Math.min(a.lng,this._southWest.lng);this._northEast.lat=Math.max(a.lat,this._northEast.lat);this._northEast.lng=Math.max(a.lng,this._northEast.lng)}},
getCenter:function(){return new L.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new L.LatLng(this._northEast.lat,this._southWest.lng)},getSouthEast:function(){return new L.LatLng(this._southWest.lat,this._northEast.lng)},contains:function(a){var b=this._southWest,c=this._northEast,d=a.getSouthWest();a=a.getNorthEast();return d.lat>=
b.lat&&a.lat<=c.lat&&d.lng>=b.lng&&a.lng<=c.lng}});L.Projection={};L.Projection.Mercator={MAX_LATITUDE:function(){var a=Math.exp(2*Math.PI);return Math.asin((a-1)/(a+1))*L.LatLng.RAD_TO_DEG}(),project:function(a){var b=L.LatLng.DEG_TO_RAD,c=L.Projection.Mercator.MAX_LATITUDE,d=a.lng*b;a=Math.max(Math.min(c,a.lat),-c)*b;a=Math.log(Math.tan(Math.PI/4+a/2));return new L.Point(d,a)},unproject:function(a,b){var c=L.LatLng.DEG_TO_RAD,d=a.x/c;return new L.LatLng((2*Math.atan(Math.exp(a.y))-Math.PI/2)/c,d,b)}};L.Point=function(a,b,c){this.x=c?Math.round(a):a;this.y=c?Math.round(b):b};
L.Point.prototype={add:function(a){return new L.Point(this.x+a.x,this.y+a.y)},subtract:function(a){return new L.Point(this.x-a.x,this.y-a.y)},divideBy:function(a,b){return new L.Point(this.x/a,this.y/a,b)},multiplyBy:function(a){return new L.Point(this.x*a,this.y*a)},distanceTo:function(a){var b=a.x-this.x;a=a.y-this.y;return Math.sqrt(b*b+a*a)},round:function(){return new L.Point(Math.round(this.x),Math.round(this.y))},toString:function(){return"Point( "+this.x+", "+this.y+" )"}};L.Bounds=L.Class.extend({initialize:function(a,b){for(var c=a instanceof Array?a:[a,b],d=0,e=c.length;d<e;d++)this.extend(c[d])},extend:function(a){if(!this.min&&!this.max){this.min=new L.Point(a.x,a.y);this.max=new L.Point(a.x,a.y)}else{this.min.x=Math.min(a.x,this.min.x);this.max.x=Math.max(a.x,this.max.x);this.min.y=Math.min(a.y,this.min.y);this.max.y=Math.max(a.y,this.max.y)}},getCenter:function(a){return new L.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,a)},contains:function(a){return a.min.x>=
this.min.x&&a.max.x<=this.max.x&&a.min.y>=this.min.y&&a.max.y<=this.max.y}});L.Transformation=L.Class.extend({initialize:function(a,b,c,d){this._a=a;this._b=b;this._c=c;this._d=d},transform:function(a,b){b=b||1;return new L.Point(b*(this._a*a.x+this._b),b*(this._c*a.y+this._d))},untransform:function(a,b){b=b||1;return new L.Point((a.x/b-this._b)/this._a,(a.y/b-this._d)/this._c)}});L.TileLayer=L.Class.extend({includes:L.Mixin.Events,options:{tileSize:256,minZoom:0,maxZoom:18,subdomains:"abc",copyright:"",unloadInvisibleTiles:L.Browser.mobileWebkit,updateWhenIdle:L.Browser.mobileWebkit,errorTileUrl:""},initialize:function(a,b){L.Util.extend(this.options,b);this._url=a;if(typeof this.options.subdomains=="string")this.options.subdomains=this.options.subdomains.split("")},onAdd:function(a){this._map=a;this._container=document.createElement("div");this._container.className="leaflet-layer";
a.getPanes().tilePane.appendChild(this._container);this._tileImg=document.createElement("img");this._tileImg.className="leaflet-tile";this._tileImg.galleryimg="no";var b=this.options.tileSize;this._tileImg.style.width=b+"px";this._tileImg.style.height=b+"px";a.on("viewreset",this._reset,this);if(this.options.updateWhenIdle)a.on("moveend",this._update,this);else{this._limitedUpdate=L.Util.limitExecByInterval(this._update,100,this);a.on("move",this._limitedUpdate,this)}this._reset();this._update()},
onRemove:function(){this._map.getPanes().tilePane.removeChild(this._container);this._map.off("viewreset",this._reset);this.options.updateWhenIdle?this._map.off("moveend",this._update):this._map.off("move",this._limitedUpdate)},_reset:function(){this._tiles={};this._container.innerHTML=""},_update:function(){var a=this._map.getPixelBounds(),b=this.options.tileSize,c=new L.Point(Math.floor(a.min.x/b),Math.floor(a.min.y/b));a=new L.Point(Math.floor(a.max.x/b),Math.floor(a.max.y/b));this._loadTiles(c,
a);this.options.unloadInvisibleTiles&&this._unloadOtherTiles(c,a)},getTileUrl:function(a,b){return this._url.replace("{s}",this.options.subdomains[(a.x+a.y)%this.options.subdomains.length]).replace("{z}",b).replace("{x}",a.x).replace("{y}",a.y)},_loadTiles:function(a,b){for(var c=a.y;c<=b.y;c++)for(var d=a.x;d<=b.x;d++)d+":"+c in this._tiles||this._loadTile(new L.Point(d,c))},_unloadOtherTiles:function(a,b){var c,d,e;for(e in this._tiles){kArr=e.split(":");c=parseInt(kArr[0]);d=parseInt(kArr[1]);
if(c<a.x||c>b.x||d<a.y||d>b.y){this._container.removeChild(this._tiles[e]);delete this._tiles[e]}}},_loadTile:function(a){var b=this._map.getPixelOrigin();b=a.multiplyBy(this.options.tileSize).subtract(b);var c=this._map.getZoom(),d=1<<c;a.x=(a.x%d+d)%d;if(!(a.y<0||a.y>=d)){d=this._tileImg.cloneNode(false);this._tiles[a.x+":"+a.y]=d;L.DomUtil.setPosition(d,b);d.onload=this._tileOnLoad;d.onselectstart=d.onmousemove=L.Util.falseFn;d._leaflet_layer=this;d.src=this.getTileUrl(a,c);this._container.appendChild(d)}},
_tileOnLoad:function(){this.className+=" leaflet-tile-loaded";this._leaflet_layer.fire("tileload",{tile:this})}});L.ImageOverlay=L.Class.extend({includes:L.Mixin.Events,initialize:function(a,b){this._url=a;this._bounds=b},onAdd:function(a){this._map=a;this._image=document.createElement("img");this._image.style.visibility="hidden";this._image.style.position="absolute";L.Util.extend(this._image,{className:"leaflet-image-layer",galleryimg:"no",onselectstart:L.Util.falseFn,onmousemove:L.Util.falseFn,onload:this._onImageLoad,src:this._url});this._map.getPanes().overlayPane.appendChild(this._image);this._map.on("viewreset",
this._reset,this);this._reset()},_reset:function(){var a=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),b=this._map.latLngToLayerPoint(this._bounds.getSouthEast()).subtract(a);L.DomUtil.setPosition(this._image,a);this._image.style.width=b.x+"px";this._image.style.height=b.y+"px"},_onImageLoad:function(){this.style.visibility=""}});L.Handler=L.Class.extend({initialize:function(a,b){this._map=a;b&&this.enable()},enabled:function(){return!!this._enabled}});L.Handler.MapDrag=L.Handler.extend({enable:function(){if(!this._enabled){if(!this._draggable){this._draggable=new L.Draggable(this._map._mapPane,this._map._container);var a=this._map.getSize();if(a.x*a.y>=7E5&&L.Browser.gecko)this._draggable._updatePosition=L.Util.deferExecByInterval(this._draggable._updatePosition,0,this._draggable);this._draggable.on("dragstart",this._onDragStart,this);this._draggable.on("drag",this._onDrag,this);this._draggable.on("dragend",this._onDragEnd,this)}this._draggable.enable();
this._enabled=true}},disable:function(){if(this._enabled){this._draggable.disable();this._enabled=false}},_onDragStart:function(){this._map.fire("movestart");this._map.fire("dragstart")},_onDrag:function(){this._map.fire("move");this._map.fire("drag")},_onDragEnd:function(){this._map.fire("moveend");this._map.fire("dragend")}});L.Handler.TouchZoom=L.Handler.extend({enable:function(){if(!(!L.Browser.mobileWebkit||this._enabled)){L.DomEvent.addListener(this._map._container,"touchstart",this._onTouchStart,this);this._enabled=true}},disable:function(){if(this._enabled){L.DomEvent.removeListener(this._map._container,"touchstart",this._onTouchStart,this);this._enabled=false}},_onTouchStart:function(a){if(!(!a.touches||a.touches.length!=2)){var b=this._map.mouseEventToLayerPoint(a.touches[0]),c=this._map.mouseEventToLayerPoint(a.touches[1]),
d=this._map.containerPointToLayerPoint(this._map.getSize().divideBy(2));this._startCenter=b.add(c).divideBy(2,true);this._startDist=b.distanceTo(c);this._startTransform=this._map._mapPane.style.webkitTransform;this._centerOffset=d.subtract(this._startCenter);L.DomEvent.addListener(document,"touchmove",this._onTouchMove,this);L.DomEvent.addListener(document,"touchend",this._onTouchEnd,this);L.DomEvent.preventDefault(a)}},_onTouchMove:function(a){if(!(!a.touches||a.touches.length!=2)){var b=this._map.mouseEventToLayerPoint(a.touches[0]),
c=this._map.mouseEventToLayerPoint(a.touches[1]);this._scale=b.distanceTo(c)/this._startDist;this._delta=b.add(c).divideBy(2,true).subtract(this._startCenter);this._map._mapPane.style.webkitTransform=[this._startTransform,L.DomUtil.getTranslateString(this._delta),L.DomUtil.getTranslateString(this._startCenter),"scale("+this._scale+")",L.DomUtil.getTranslateString(this._startCenter.multiplyBy(-1))].join(" ");L.DomEvent.preventDefault(a)}},_onTouchEnd:function(a){if(!(!a.touches||a.touches.length>=
2||!this._scale)){a=this._map.getZoom()+Math.round(Math.log(this._scale)/Math.LN2);var b=this._centerOffset.subtract(this._delta).divideBy(this._scale);b=this._map.unproject(this._map.getPixelOrigin().add(this._startCenter).add(b));map.setView(b,a,true);this._scale=null;L.DomEvent.removeListener(document,"touchmove",this._onTouchMove);L.DomEvent.removeListener(document,"touchend",this._onTouchEnd)}}});L.Handler.ScrollWheelZoom=L.Handler.extend({enable:function(){if(!this._enabled){L.DomEvent.addListener(this._map._container,"mousewheel",this._onWheelScroll,this);this._delta=0;this._enabled=true}},disable:function(){if(this._enabled){L.DomEvent.removeListener(this._map._container,"mousewheel",this._onWheelScroll);this._enabled=false}},_onWheelScroll:function(a){this._delta+=L.DomEvent.getWheelDelta(a);this._lastMousePos=this._map.mouseEventToContainerPoint(a);clearTimeout(this._timer);this._timer=
setTimeout(L.Util.bind(this._performZoom,this),50);L.DomEvent.preventDefault(a)},_performZoom:function(){var a=Math.round(this._delta);if(a){var b=this._getCenterForScrollWheelZoom(this._lastMousePos,a);a=this._map.getZoom()+a;this._map.setView(b,a);this._delta=0}},_getCenterForScrollWheelZoom:function(a,b){var c=this._map.getPixelBounds().getCenter(),d=this._map.getSize().divideBy(2);d=a.subtract(d).multiplyBy(1-Math.pow(2,-b));return this._map.unproject(c.add(d))}});L.Handler.DoubleClickZoom=L.Handler.extend({enable:function(){if(!this._enabled){this._map.on("dblclick",this._onDoubleClick,this._map);this._enabled=true}},disable:function(){if(this._enabled){this._map.off("dblclick",this._onDoubleClick,this._map);this._enabled=false}},_onDoubleClick:function(a){this.setView(a.position,this._zoom+1)}});L.Map=L.Class.extend({includes:L.Mixin.Events,options:{projection:L.Projection.Mercator,transformation:new L.Transformation(0.5/Math.PI,0.5,-0.5/Math.PI,0.5),scaling:function(a){return 256*(1<<a)},center:new L.LatLng(0,0),zoom:0,layers:[],dragging:true,touchZoom:L.Browser.mobileWebkit,scrollWheelZoom:!L.Browser.mobileWebkit,doubleClickZoom:true,updateWhenIdle:L.Browser.mobileWebkit},initialize:function(a,b){this._container=L.DomUtil.get(a);L.Util.extend(this.options,b);this._initLayout();var c=this.options.layers;
c=c instanceof Array?c:[c];this._initLayers(c);if(L.DomEvent){this._initEvents();L.Handler&&this._initInteraction()}this.setView(this.options.center,this.options.zoom,true)},setView:function(a,b,c){b=this._limitZoom(b);var d=this._zoom!=b;if(!c&&this._layers){c=this._getNewTopLeftPoint(a).subtract(this._getTopLeftPoint());if(d?this._zoomToIfCenterInView(a,b,c):this._panByIfClose(c))return this}this._resetView(a,b);return this},setZoom:function(a){return this.setView(this.getCenter(),a)},zoomIn:function(){return this.setZoom(this._zoom+
1)},zoomOut:function(){return this.setZoom(this,zoom-1)},fitBounds:function(a){var b=this.getBoundsZoom(a);return this.setView(a.getCenter(),b,true)},panTo:function(a){return this.setView(a,this._zoom)},panBy:function(a){this.fire("movestart");this._rawPanBy(a);this.fire("viewupdate");this.fire("move");this.fire("moveend")},addLayer:function(a){this._layers.push(a);a.onAdd(this);this._layersMaxZoom=Math.max(this._layersMaxZoom||0,a.options.maxZoom||Infinity);this._layersMinZoom=Math.min(this._layersMinZoom||
Infinity,a.options.minZoom||0);this.fire("layeradd",{layer:a});return this},removeLayer:function(a){a.onRemove(this);for(var b=0,c=this._layers.length;b<c;b++)if(this._layers[b]===a){this._layers.splice(b,1);this.fire("layerremove",{layer:a});break}return this},invalidateSize:function(){this._sizeChanged=true;this.fire("viewupdate");return this},getCenter:function(a){var b=this.getSize().divideBy(2);return this.unproject(this._getTopLeftPoint().add(b),this._zoom,a)},getZoom:function(){return this._zoom},
getMinZoom:function(){return isNaN(this.options.minZoom)?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return isNaN(this.options.maxZoom)?this._layersMaxZoom||Infinity:this.options.maxZoom},getBoundsZoom:function(a){var b=this.getSize(),c=this.getMinZoom(),d=this.getMaxZoom(),e=a.getNorthEast();a=a.getSouthWest();var f,g;do{f=this.project(e,c);g=this.project(a,c);f=new L.Point(f.x-g.x,g.y-f.y);c++}while(f.x<=b.x&&f.y<=b.y&&c<=d);return c-1},getSize:function(){if(!this._size||
this._sizeChanged){this._size=new L.Point(this._container.clientWidth,this._container.clientHeight);this._sizeChanged=false}return this._size},getPixelBounds:function(){var a=this._getTopLeftPoint(),b=this.getSize();return new L.Bounds(a,a.add(b))},getPixelOrigin:function(){return this._initialTopLeftPoint},mouseEventToContainerPoint:function(a){return L.DomEvent.getMousePosition(a,this._container)},mouseEventToLayerPoint:function(a){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))},
mouseEventToLatLng:function(a){return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))},containerPointToLayerPoint:function(a){return a.subtract(L.DomUtil.getPosition(this._mapPane))},layerPointToLatLng:function(a){return this.unproject(a.add(this._initialTopLeftPoint))},latLngToLayerPoint:function(a){return this.project(a).subtract(this._initialTopLeftPoint)},project:function(a,b){var c=this.options.projection.project(a),d=this.options.scaling(isNaN(b)?this._zoom:b);return this.options.transformation.transform(c,
d)},unproject:function(a,b,c){b=this.options.scaling(isNaN(b)?this._zoom:b);return this.options.projection.unproject(this.options.transformation.untransform(a,b),c)},getPanes:function(){return this._panes},_initLayout:function(){this._container.className+=" leaflet-container";this._container.style.position=L.DomUtil.getStyle(this._container,"position")=="absolute"?"absolute":"relative";this._panes={};this._panes.mapPane=this._mapPane=this._createPane("leaflet-map-pane");this._panes.tilePane=this._createPane("leaflet-tile-pane");
this._panes.overlayPane=this._createPane("leaflet-overlay-pane")},_createPane:function(a){var b=document.createElement("div");b.className=a;(this._mapPane||this._container).appendChild(b);return b},_resetView:function(a,b){var c=this._zoom!=b;this.fire("movestart");this._zoom=b;this._initialTopLeftPoint=this._getNewTopLeftPoint(a);L.DomUtil.setPosition(this._mapPane,new L.Point(0,0));this.fire("viewreset");this.fire("viewupdate");this.fire("move");c&&this.fire("zoomend");this.fire("moveend")},_initLayers:function(a){this._layers=
[];for(var b=0,c=a.length;b<c;b++)this._addLayer(a[b])},_rawPanBy:function(a){var b=L.DomUtil.getPosition(this._mapPane);L.DomUtil.setPosition(this._mapPane,b.subtract(a))},_panByIfClose:function(a){if(this._offsetIsWithinView(a)){this.panBy(a);return true}return false},_zoomToIfCenterInView:function(a,b,c){if(this._offsetIsWithinView(c,0.5)){this._resetView(a,b);return true}return false},_initEvents:function(){L.DomEvent.addListener(this._container,"click",this._onMouseClick,this);L.DomEvent.addListener(this._container,
"dblclick",this._fireMouseEvent,this)},_onMouseClick:function(a){this.dragging&&this.dragging._moved||this._fireMouseEvent(a)},_fireMouseEvent:function(a){this.hasEventListeners(a.type)&&this.fire(a.type,{position:this.mouseEventToLatLng(a),layerPoint:this.mouseEventToLayerPoint(a)})},_initInteraction:function(){var a={dragging:L.Handler.MapDrag,touchZoom:L.Handler.TouchZoom,doubleClickZoom:L.Handler.DoubleClickZoom,scrollWheelZoom:L.Handler.ScrollWheelZoom};for(var b in a)if(a.hasOwnProperty(b)&&
a[b])this[b]=new a[b](this,this.options[b])},_getTopLeftPoint:function(){return this._initialTopLeftPoint.subtract(L.DomUtil.getPosition(this._mapPane))},_getNewTopLeftPoint:function(a){var b=this.getSize().divideBy(2,true);return this.project(a).subtract(b).round()},_offsetIsWithinView:function(a,b){var c=b||1,d=this.getSize();return Math.abs(a.x)<=d.width*c&&Math.abs(a.y)<=d.height*c},_limitZoom:function(a){var b=this.getMinZoom(),c=this.getMaxZoom();return Math.max(b,Math.min(c,a))}});L.Map.include({locate:function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(L.Util.bind(this._handleGeolocationResponse,this),L.Util.bind(this._handleGeolocationError,this));return this},_handleGeolocationError:function(a){this.fire("locationerror",{message:a.message})},_handleGeolocationResponse:function(a){var b=180*a.coords.accuracy/4E7,c=b*2,d=a.coords.latitude;a=a.coords.longitude;var e=new L.LatLng(d-b,a-c);b=new L.LatLng(d+b,a+c);b=new L.LatLngBounds(e,b);this.fitBounds(b);
this.fire("locationfound",{latlng:new L.LatLng(d,a),bounds:b})}});
