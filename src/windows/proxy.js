var ScanditSDKProxy=function(){var s="closed",d="shown",i="active",r="paused",v={root:null,preview:null,capture:null,settings:null,scanSettings:null,margins:null,deviceOrientationChangeListener:null,continuousMode:!1,cancelCallback:null,paused:!1,running:!1,startOnWindowVisible:!1,state:s,desiredState:s,pendingStateTransition:null};function c(){var e=Windows.Graphics.Display,t=e.DisplayInformation.getForCurrentView().currentOrientation;return t===e.DisplayOrientations.portrait||t===e.DisplayOrientations.portraitFlipped}function p(e){var t=e.viewfinderDimension;return c()?{width:t[0],height:t[1]}:{width:t[2],height:t[3]}}function u(e){return c()?e.portrait:e.landscape}function h(e){var t=JSON.stringify(e),n=new BarcodeScannerPlugin.ScanSettingsProxy(t),i=e.scanningHotSpot;n.setScanningHotSpot(i.x,i.y);var r=e.activeScanningAreaPortrait;n.setActiveScanningAreaPortrait(r.x,r.y,r.width,r.height);var o=e.activeScanningAreaLandscape;return n.setActiveScanningAreaLandscape(o.x,o.y,o.width,o.height),n.setCameraFacing(e.cameraFacingPreference),n}function o(e,t,n){return null==e?null:void 0!==e.substr&&"%"===e.substr(e.length-1,1)?.01*parseFloat(e.substr(0,e.length-1))*n:parseFloat(e)*t}function y(e){var t=Windows.Graphics.Display.DisplayInformation.getForCurrentView(),n=t.rawDpiX/t.logicalDpi,i=t.rawDpiY/t.logicalDpi,r={left:o(e.leftMargin,n,window.innerWidth),right:o(e.rightMargin,n,window.innerWidth),top:o(e.topMargin,i,window.innerHeight),bottom:o(e.bottomMargin,i,window.innerHeight),height:o(e.height,i,window.innerHeight),width:o(e.width,n,window.innerWidth)};return null===r.left&&(null!==r.right&&null!==r.width?r.left=window.innerWidth-r.right-r.width:r.left=0),null===r.right&&(null!==r.width?r.right=window.innerWidth-r.left-r.width:r.right=0),null===r.top&&(null!==r.bottom&&null!==r.height?r.top=window.innerHeight-r.height-r.bottom:r.top=0),null===r.bottom&&(null!==r.height?r.bottom=window.innerHeight-r.height-r.top:r.bottom=0),r}function g(e,t){var n=y(t);e.style.margin=n.top+"px "+n.right+"px "+n.bottom+"px "+n.left+"px";var i=window.innerWidth,r=window.innerHeight;return e.style.width=i-n.left-n.right+"px",e.style.height=r-n.top-n.bottom+"px",n}function w(e,t){for(var n in e)e.hasOwnProperty(n)&&"function"!=typeof e[n]&&"picker"!==n&&"properties"!==n&&(t[n]=e[n])}function f(e){return 4===e.length?[17*parseInt(e[1],16),17*parseInt(e[2],16),17*parseInt(e[3],16)]:7===e.length?[parseInt(e.substr(1,2),16),parseInt(e.substr(3,2),16),parseInt(e.substr(5,2),16)]:[0,0,0]}function m(e,t){var n=document.createElement("canvas");n.width=e.width,n.height=e.height;var i=n.getContext("2d"),r=document.createElement("img");r.src="/www/img/scanline-inactive.png",r.width=e.width,r.height=e.height;var o=document.createElement("img");o.src="/www/img/scanline-active.png",o.width=e.width,o.height=e.height;var a=i.createRadialGradient(n.width/2,n.height/2,4*n.width/10,n.width/2,n.height/2,5*n.width/10);if(t)var l=f(v.scanLineColorActive);else l=f(v.scanLineColor);a.addColorStop(0,"rgba("+l[0]+", "+l[1]+", "+l[2]+", 1)"),a.addColorStop(1,"rgba("+l[0]+", "+l[1]+", "+l[2]+", 0)"),i.fillStyle=a,i.fillRect(0,0,e.width,e.height),i.globalCompositeOperation="source-in",i.drawImage(r,0,0,r.width,r.height),i.globalCompositeOperation="source-atop",i.fillStyle="rgba("+l[0]+", "+l[1]+", "+l[2]+", 1)",i.fillRect(0,0,e.width,e.height),t&&(i.globalCompositeOperation="source-atop",i.drawImage(o,0,0,r.width,r.height)),e.src=n.toDataURL()}function S(e,t,n,i,r,o){var a=y(e),l=window.innerWidth-a.left-a.right,s=window.innerHeight-a.top-a.bottom,d=t.y*s,c=t.x*l,p=n.width*l,u=n.height*s;i.style.top=d-.5*u+"px",i.style.left=c-.5*p+"px",i.style.width=p+"px",i.style.height=u+"px",i.style.borderColor=v.overlay.viewfinderColor;var h=n.width*l,g=47/748*h;o.style.top=d-.5*g+"px",o.style.left=c-.5*h+"px",o.style.width=h+"px",o.style.height=g+"px",m(o,!0);r.style.width="55px",r.style.height="20px",v.overlay.guiStyle==Scandit.ScanOverlay.GuiStyle.DEFAULT?(i.style.display="block",o.style.display="none",r.style.left=c+.5*p-55+"px",r.style.top=d+.5*u+"px"):v.overlay.guiStyle==Scandit.ScanOverlay.GuiStyle.LASER?(i.style.display="none",o.style.display="block",r.style.left=c+.5*h-55-25+"px",r.style.top=d+.5*g+"px"):(i.style.display="none",o.style.display="none",r.style.left=c+.5*p-55+"px",r.style.top=d+.5*u+"px")}function b(e){if(null!=e.capture){var t=e.capture.videoWidth,n=e.capture.videoHeight;if(0!==t&&0!==n){if(c()){var i=t;t=n,n=i}var r,o,a=t/n;a<e.root.clientWidth/e.root.clientHeight?(r=e.root.clientWidth,o=Math.round(r/a)):(o=Math.round(e.root.clientHeight),r=o*a);var l=Math.floor((e.root.clientHeight-o)/2)+"px",s=Math.floor((e.root.clientWidth-r)/2)+"px";setTimeout(function(){e.preview&&(e.preview.style.width=r+"px",e.preview.style.height=o+"px",e.preview.style.margin=l+" "+s)},50),setTimeout(function(){e.preview&&(e.preview.style.height=o+1+"px")},1e3)}}}function C(){O()}function x(e){v.preview&&("hidden"===document.visibilityState&&v.running?(v.startOnWindowVisible=!0,a()):v.startOnWindowVisible&&(F({paused:v.paused}),v.startOnWindowVisible=!1))}function L(e){if(null!=v.capture){v.errorPanel.style.display="table",v.errorPanel.style.width=v.root.style.width,v.errorPanel.style.height=v.root.style.height,v.errorPanel.style.fontSize="160%";v.errorPanel.innerHTML='<div style="display:table-cell;text-align:center;text-transform:none;vertical-align:middle;opacity:1.0;padding:50px">'+e+"</div>",v.viewFinder.style.display="none",v.logo.style.display="none"}}function P(){return-1===navigator.appVersion.indexOf("MSAppHost/3.0")&&(-1===navigator.appVersion.indexOf("Windows Phone 8.1;")&&-1!==navigator.appVersion.indexOf("MSAppHost/2.0;"))}function E(e){return e&&(void 0!==e.width||void 0!==e.height||void 0!==e.topMargin||void 0!==e.bottomMargin||void 0!==e.leftMargin||void 0!==e.rightMargin)}function k(e,t){if(e.state=t,null!==e.pendingStateTransition&&e.state===e.desiredState){var n=e.pendingStateTransition;e.pendingStateTransition=null,n()}}function D(e,t,n){if(e.desiredState!==t){if(e.desiredState===e.state)return(e.desiredState=t)===s?e.state===d?void l(e.root):void function(){if(null==v.capture)return;var e=v.root;a().then(function(){l(e)})}():t===i?(e.state===r&&function(){if(!v.capture)return;v.paused=!1,v.capture.resumeScanning(),v.handleEvent("didChangeState",Scandit.BarcodePicker.State.ACTIVE),k(v,i),m(v.scanLine,!0)}(),void(e.state===d&&F({paused:!1}))):t===r?(e.state===i&&function(){if(!v.capture)return;v.paused=!0,v.capture.pauseScanning(),v.handleEvent("didChangeState",Scandit.BarcodePicker.State.PAUSED),k(v,r),m(v.scanLine,!1)}(),void(e.state===d&&F({paused:!0}))):void(t!==d||e.state===s&&function(i,e,t,n,r){v.scanSettings=t,v.overlay={beep:!0,viewfinderColor:"#fff",viewfinderDecodedColor:"#fff",guiStyle:Scandit.ScanOverlay.GuiStyle.DEFAULT,viewfinderDimension:[.9,.4,.6,.4]},w(r,v.overlay),r.hasOwnProperty("viewfinderColor")||r.hasOwnProperty("viewfinderDecodedColor")?(v.scanLineColorActive=v.overlay.viewfinderColor,v.scanLineColor=v.overlay.viewfinderDecodedColor):(v.scanLineColorActive="#00a2ba",v.scanLineColor="#00a2ba");v.isFullScreen=!(E(n.landscapeConstraints)||E(n.portraitConstraints)),function(e){if(e.root=document.createElement("div"),e.root.style.position="absolute",e.root.style.margin="0px",e.root.style.background="black",e.root.style.overflow="hidden",e.root.style.top="0px",e.root.style.left="0px",e.root.style.zIndex=999,e.errorPanel=document.createElement("div"),e.errorPanel.style.position="absolute",e.errorPanel.style.margin="0px",e.errorPanel.style.background="black",e.errorPanel.style.color="white",e.errorPanel.style.textAlign="center",e.errorPanel.style.verticalAlign="middle",e.errorPanel.style.opacity=.7,e.errorPanel.style.display="none",e.errorPanel.style.zIndex=1e3,e.errorPanel.style.padding="0px",e.errorPanel.innertHTML="One, two, three",e.root.appendChild(e.errorPanel),document.body.appendChild(e.root),e.preview=document.createElement("video"),e.preview.msZoom=!0,e.preview.style.background="black",e.preview.style.zIndex=1e3,e.root.appendChild(e.preview),e.logo=document.createElement("img"),e.logo.src="/www/img/scandit-logo.svg",e.logo.style.position="absolute",e.logo.style.zIndex=1001,e.logo.msUserSelect="none",e.root.appendChild(e.logo),e.viewFinder=document.createElement("div"),e.viewFinder.style.zIndex=1001,e.viewFinder.style.position="absolute",e.viewFinder.style.borderWidth="1px",e.viewFinder.style.borderStyle="solid",e.viewFinder.style.borderRadius="10px",e.scanLine=document.createElement("img"),e.scanLine.src="/www/img/scanline-active.png",e.scanLine.style.width="374px",e.scanLine.style.height="24px",e.scanLine.style.position="absolute",e.scanLine.style.zIndex=1001,e.scanLine.msUserSelect="none",e.root.appendChild(e.scanLine),e.root.appendChild(e.viewFinder),P()&&e.isFullScreen){var t=document.createElement("div");t.style.width="100%",t.style.background="black",t.style.opacity=.4,t.style.zIndex=1001,t.style.color="white",t.style.color="white",t.style.fontSize="200%",t.style.textTransform="none",t.style.bottom="0px",t.style.left="0px",t.style.padding="5px",t.style.position="absolute",t.style.msUserSelect="none";var n=document.createElement("span");n.onclick=A,n.innerHTML="Cancel",t.appendChild(n),n.style.opacity=1,e.root.appendChild(t)}else t=null;e.beeper=document.createElement("audio");var i=document.createElement("source");i.src="/www/wav/scan-beep.wav",e.beeper.appendChild(i)}(v),v.continuousMode=n.continuousMode,v.cancelCallback=e,v.handleEvent=function(e,t){if(i){var n=[e];n.push(t),i(n,{keepCallback:!0})}};var o=h(t);v.constraints={landscape:n.landscapeConstraints||{},portrait:n.portraitConstraints||{}};var a=u(v.constraints);g(v.root,a);var l=p(v.overlay);S(a,t.scanningHotSpot,l,v.viewFinder,v.logo,v.scanLine),document.addEventListener("visibilitychange",x),window.addEventListener("resize",C),v.isFullScreen&&!P()&&document.addEventListener("backbutton",A,!1);v.capture=new BarcodeScannerPlugin.Capture(o),null!==i&&v.capture.addDidScanDelegate(function(e){t.codeRejectionEnabled||v.overlay.beep&&v.beeper.play(),v.handleEvent("didScan",e.session),t.codeRejectionEnabled&&function(e,t){if(!e||0===e.length)return!0;for(var n=t.newlyRecognizedCodes,i=0;i<e.length;++i){for(var r=e[0],o=!1,a=0;a<n.length;++a)if(n[a].uniqueId===r){o=!0;break}if(!o)return!0}return!1}(v.rejectedCodeIds,e.session)&&v.overlay.beep&&v.beeper.play(),v.continuousMode||D(v,s),e.done()});null!==v.cancelCallback&&v.capture.addFailDelegate(function(e){v.cancelCallback(e)});v.capture.addOrientationChangedCallback(function(){v.capture&&b(v)}),v.capture.addRecognitionFailedDelegate(L),k(v,d)}.apply(this,n));e.pendingStateTransition=function(){D(e,t,n)}}}function a(){v.preview.pause();var e=v.capture;return e.stopAsync().then(function(){return v.preview.src=null,e.closeAsync()}).then(function(){v.running&&(v.handleEvent("didChangeState",Scandit.BarcodePicker.State.STOPPED),v.running=!1),k(v,d)})}function l(e){e&&document.body.removeChild(e),document.removeEventListener("visibilitychange",x),document.removeEventListener("backbutton",A),window.removeEventListener("resize",C),v.preview=null,v.capture=null,v.settings=null,v.margins=null,v.root=null,v.beeper=null,v.otherElements=null,k(v,s)}function t(){v.capture&&v.preview&&(v.preview.removeEventListener("loadeddata",t),v.capture.startAsync(v.paused).then(function(){b(v)}))}function F(e){v.capture&&v.desiredState!==i&&(v.running=!0,v.desiredState=i,v.capture.initAsync().then(function(){v.capture&&null!==v.capture.mediaCaptureSource&&(v.preview.src=URL.createObjectURL(v.capture.mediaCaptureSource),v.paused=e.paused,v.preview.addEventListener("loadeddata",t),v.preview.play(),v.handleEvent("didChangeState",Scandit.BarcodePicker.State.ACTIVE),k(v,i))}),m(v.scanLine,!0))}function O(){if(null!==v.preview){var e=u(v.constraints);g(v.root,e);var t=p(v.overlay);S(e,v.scanSettings.scanningHotSpot,t,v.viewFinder,v.logo,v.scanLine),b(v)}}function A(){v.desiredState!==s&&(v.cancelCallback&&v.cancelCallback("Canceled",{keepCallback:!0}),D(v,s))}return{show:function(e,t,n){D(v,d,[e,t,n[0],n[1],n[2]])},cancel:function(){A()},start:function(e,t,n){F(n[0])},initLicense:function(e,t,n){BarcodeScannerPlugin.Capture.appKey=n[0]},applySettings:function(e,t,n){!function(e){if(v.capture){var t=h(e);v.capture.applySettingsAsync(t)}}(n[0])},stop:function(){D(v,r),D(v,d),a()},pause:function(){D(v,r)},resume:function(){D(v,i)},torch:function(){},updateOverlay:function(e,t,n){w(n[0],v.overlay);var i=p(v.overlay);S(u(v.constraints),v.scanSettings.scanningHotSpot,i,v.viewFinder,v.logo,v.scanLine)},resize:function(e,t,n){var i;v.isFullScreen||(i=n[0],v.capture&&(v.constraints={landscape:i.landscapeConstraints,portrait:i.portraitConstraints},O()))},finishDidScanCallback:function(e,t,n){var i;i=n[1],v.rejectedCodeIds=i}}}();cordova.commandProxy.add("ScanditSDK",ScanditSDKProxy);
