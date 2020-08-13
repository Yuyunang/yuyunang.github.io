function sharePost($){const $body=$(document.body);$body.on("click",(function(){$(".article-share-box.on").removeClass("on")})).on("click",".article-share-link",(function(e){e.stopPropagation();const $this=$(e.currentTarget),id="article-share-box-"+$this.attr("data-id");let box=$("#"+id);if(box.hasClass("on"))return void box.removeClass("on");box.length||(box=function(id,url){const encodedUrl=encodeURIComponent(url),html=['<div id="'+id+'" class="article-share-box">','<input class="article-share-box-input" value="'+url+'">','<div class="article-share-links">','<a href="https://twitter.com/intent/tweet?url='+encodedUrl+'" class="article-share-twitter" target="_blank" title="Twitter"></a>','<a href="https://www.facebook.com/sharer.php?u='+encodedUrl+'" class="article-share-facebook" target="_blank" title="Facebook"></a>','<a href="http://pinterest.com/pin/create/button/?url='+encodedUrl+'" class="article-share-pinterest" target="_blank" title="Pinterest"></a>','<a href="https://plus.google.com/share?url='+encodedUrl+'" class="article-share-google" target="_blank" title="Google+"></a>',"</div>","</div>"].join(""),box=$(html);return $body.append(box),box}(id,$this.attr("data-url")));$(".article-share-box.on").hide();const offset=$this.offset();box.css({top:offset.top+25,left:offset.left}).addClass("on")})).on("click",".article-share-box",(function(e){e.stopPropagation()})).on("click",".article-share-box-input",(function(e){$(e.currentTarget).select()})).on("click",".article-share-box-link",(function(e){e.preventDefault(),e.stopPropagation();const anchor=e.currentTarget;window.open(anchor.href,"article-share-box-window-"+Date.now(),"width=500,height=450")}))}function lightboxOnArticles($){$(".article-entry").each((function(i,div){$("img",div).each((function(j,imgEl){const $img=$(imgEl);if($img.parent().hasClass("fancybox"))return;const{src="",alt=""}=imgEl;$img.wrap(`<a href="${src}" title="${alt}" data-lightbox="image-${i}-${j}" />`)})),$("a[data-lightbox]",div).each((function(i,link){link.rel="article"+i}))}))}function app($){$(".sidenav").sidenav(),$(".circle-progress").each((i,node)=>{$(node).circleProgress({value:parseInt(node.dataset.value,10)/100,size:100,startAngle:-Math.PI/2,fill:{gradient:["white","white"]}}).on("circle-animation-progress",(event,progress,stepValue)=>{$(event.currentTarget).find("strong").text((100*stepValue).toFixed(0))})})}define("loadCss",[],()=>{const head=document.head;return(function(url,callback){return new Promise((res,rej)=>{const link=document.createElement("link");link.type="text/css",link.rel="stylesheet",link.id="loadCss-"+Date.now(),link.href=url,link.onload=()=>{res(link),callback&&callback(link)},link.onerror=rej,head.appendChild(link)})})}),define("share-post",["jquery"],sharePost),define("lightbox-on-articles",["jquery"],lightboxOnArticles),
/*!
 * Lightbox v2.11.1
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
function(root,factory){"function"==typeof define&&define.amd?define("lightbox",["jquery"],factory):"object"==typeof exports?module.exports=factory(require("jquery")):root.lightbox=factory(root.jQuery)}(this,(function($){function Lightbox(options){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=$.extend({},this.constructor.defaults),this.option(options)}return Lightbox.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},Lightbox.prototype.option=function(options){$.extend(this.options,options)},Lightbox.prototype.imageCountLabel=function(currentImageNum,totalImages){return this.options.albumLabel.replace(/%1/g,currentImageNum).replace(/%2/g,totalImages)},Lightbox.prototype.init=function(){var self=this;$(document).ready((function(){self.enable(),self.build()}))},Lightbox.prototype.enable=function(){var self=this;$("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",(function(event){return self.start($(event.currentTarget)),!1}))},Lightbox.prototype.build=function(){if(!($("#lightbox").length>0)){var self=this;$('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($("body")),this.$lightbox=$("#lightbox"),this.$overlay=$("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",(function(){return self.end(),!1})),this.$lightbox.hide().on("click",(function(event){"lightbox"===$(event.target).attr("id")&&self.end()})),this.$outerContainer.on("click",(function(event){return"lightbox"===$(event.target).attr("id")&&self.end(),!1})),this.$lightbox.find(".lb-prev").on("click",(function(){return 0===self.currentImageIndex?self.changeImage(self.album.length-1):self.changeImage(self.currentImageIndex-1),!1})),this.$lightbox.find(".lb-next").on("click",(function(){return self.currentImageIndex===self.album.length-1?self.changeImage(0):self.changeImage(self.currentImageIndex+1),!1})),this.$nav.on("mousedown",(function(event){3===event.which&&(self.$nav.css("pointer-events","none"),self.$lightbox.one("contextmenu",(function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(self),0)})))})),this.$lightbox.find(".lb-loader, .lb-close").on("click",(function(){return self.end(),!1}))}},Lightbox.prototype.start=function($link){var self=this,$window=$(window);$window.on("resize",$.proxy(this.sizeOverlay,this)),this.sizeOverlay(),this.album=[];var imageNumber=0;function addToAlbum($link){self.album.push({alt:$link.attr("data-alt"),link:$link.attr("href"),title:$link.attr("data-title")||$link.attr("title")})}var $links,dataLightboxValue=$link.attr("data-lightbox");if(dataLightboxValue){$links=$($link.prop("tagName")+'[data-lightbox="'+dataLightboxValue+'"]');for(var i=0;i<$links.length;i=++i)addToAlbum($($links[i])),$links[i]===$link[0]&&(imageNumber=i)}else if("lightbox"===$link.attr("rel"))addToAlbum($link);else{$links=$($link.prop("tagName")+'[rel="'+$link.attr("rel")+'"]');for(var j=0;j<$links.length;j=++j)addToAlbum($($links[j])),$links[j]===$link[0]&&(imageNumber=j)}var top=$window.scrollTop()+this.options.positionFromTop,left=$window.scrollLeft();this.$lightbox.css({top:top+"px",left:left+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&$("body").addClass("lb-disable-scrolling"),this.changeImage(imageNumber)},Lightbox.prototype.changeImage=function(imageNumber){var self=this,filename=this.album[imageNumber].link,filetype=filename.split(".").slice(-1)[0],$image=this.$lightbox.find(".lb-image");this.disableKeyboardNav(),this.$overlay.fadeIn(this.options.fadeDuration),$(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var preloader=new Image;preloader.onload=function(){var imageHeight,imageWidth,maxImageHeight,maxImageWidth,windowHeight,windowWidth;$image.attr({alt:self.album[imageNumber].alt,src:filename}),$(preloader),$image.width(preloader.width),$image.height(preloader.height),windowWidth=$(window).width(),windowHeight=$(window).height(),maxImageWidth=windowWidth-self.containerPadding.left-self.containerPadding.right-self.imageBorderWidth.left-self.imageBorderWidth.right-20,maxImageHeight=windowHeight-self.containerPadding.top-self.containerPadding.bottom-self.imageBorderWidth.top-self.imageBorderWidth.bottom-self.options.positionFromTop-70,"svg"===filetype&&(0!==preloader.width&&0!==preloader.height||($image.width(maxImageWidth),$image.height(maxImageHeight))),self.options.fitImagesInViewport?(self.options.maxWidth&&self.options.maxWidth<maxImageWidth&&(maxImageWidth=self.options.maxWidth),self.options.maxHeight&&self.options.maxHeight<maxImageHeight&&(maxImageHeight=self.options.maxHeight)):(maxImageWidth=self.options.maxWidth||preloader.width||maxImageWidth,maxImageHeight=self.options.maxHeight||preloader.height||maxImageHeight),(preloader.width>maxImageWidth||preloader.height>maxImageHeight)&&(preloader.width/maxImageWidth>preloader.height/maxImageHeight?(imageWidth=maxImageWidth,imageHeight=parseInt(preloader.height/(preloader.width/imageWidth),10),$image.width(imageWidth),$image.height(imageHeight)):(imageHeight=maxImageHeight,imageWidth=parseInt(preloader.width/(preloader.height/imageHeight),10),$image.width(imageWidth),$image.height(imageHeight))),self.sizeContainer($image.width(),$image.height())},preloader.src=this.album[imageNumber].link,this.currentImageIndex=imageNumber},Lightbox.prototype.sizeOverlay=function(){var self=this;setTimeout((function(){self.$overlay.width($(document).width()).height($(document).height())}),0)},Lightbox.prototype.sizeContainer=function(imageWidth,imageHeight){var self=this,oldWidth=this.$outerContainer.outerWidth(),oldHeight=this.$outerContainer.outerHeight(),newWidth=imageWidth+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,newHeight=imageHeight+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;function postResize(){self.$lightbox.find(".lb-dataContainer").width(newWidth),self.$lightbox.find(".lb-prevLink").height(newHeight),self.$lightbox.find(".lb-nextLink").height(newHeight),self.$overlay.focus(),self.showImage()}oldWidth!==newWidth||oldHeight!==newHeight?this.$outerContainer.animate({width:newWidth,height:newHeight},this.options.resizeDuration,"swing",(function(){postResize()})):postResize()},Lightbox.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},Lightbox.prototype.updateNav=function(){var alwaysShowNav=!1;try{document.createEvent("TouchEvent"),alwaysShowNav=!!this.options.alwaysShowNavOnTouchDevices}catch(e){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(alwaysShowNav&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),alwaysShowNav&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),alwaysShowNav&&this.$lightbox.find(".lb-next").css("opacity","1"))))},Lightbox.prototype.updateDetails=function(){var self=this;if(void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title){var $caption=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?$caption.text(this.album[this.currentImageIndex].title):$caption.html(this.album[this.currentImageIndex].title),$caption.fadeIn("fast")}if(this.album.length>1&&this.options.showImageNumberLabel){var labelText=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(labelText).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,(function(){return self.sizeOverlay()}))},Lightbox.prototype.preloadNeighboringImages=function(){this.album.length>this.currentImageIndex+1&&((new Image).src=this.album[this.currentImageIndex+1].link);this.currentImageIndex>0&&((new Image).src=this.album[this.currentImageIndex-1].link)},Lightbox.prototype.enableKeyboardNav=function(){this.$lightbox.on("keyup.keyboard",$.proxy(this.keyboardAction,this)),this.$overlay.on("keyup.keyboard",$.proxy(this.keyboardAction,this))},Lightbox.prototype.disableKeyboardNav=function(){this.$lightbox.off(".keyboard"),this.$overlay.off(".keyboard")},Lightbox.prototype.keyboardAction=function(event){var keycode=event.keyCode;27===keycode?(event.stopPropagation(),this.end()):37===keycode?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):39===keycode&&(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},Lightbox.prototype.end=function(){this.disableKeyboardNav(),$(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),this.options.disableScrolling&&$("body").removeClass("lb-disable-scrolling")},new Lightbox})),requirejs(["jquery","loadCss","share-post","lightbox-on-articles","lightbox"],app),define("app",(function(){}));