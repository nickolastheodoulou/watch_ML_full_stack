(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{18:function(e,t,n){e.exports=n(42)},23:function(e,t,n){},24:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(11),i=n.n(r),c=(n(23),n(12)),s=n(13),l=n(16),u=n(14),f=n(17),p=(n(24),n(15)),d=n.n(p).a.create({baseURL:"0.0.0.0:8000/",timeout:1e4}),v=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={predictions:{brandPredictions:[]},imgSrc:""},n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"_onDragOver",value:function(e){e.preventDefault()}},{key:"_onDragLeave",value:function(e){e.preventDefault()}},{key:"_onDrop",value:function(e){var t=this;e.preventDefault();var n=e.dataTransfer.files[0],a=new FileReader;a.readAsDataURL(n),a.onloadend=function(e){t.setState({imgSrc:a.result})};var o=new FormData;o.append("image",n),d.post("/classify",o,{headers:{"Content-Type":n.type}}).then((function(e){t.setState({predictions:e.data})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e,t=this;this.state.imgSrc&&(e=o.a.createElement("img",{src:this.state.imgSrc,alt:"image-of-a-watch"}));var n=[];return this.state.predictions.brandPredictions.forEach((function(e,t){n.push(o.a.createElement("p",{key:"item-".concat(t)},e[0]," : ",e[1]))})),o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"file-dropzone",onDragOver:function(e){t._onDragOver(e)},onDragLeave:function(e){t._onDragLeave(e)},onDrop:function(e){t._onDrop(e)}},e),o.a.createElement("div",{className:"predictions"},n))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.3c4a0b08.chunk.js.map