define(['base'], function(yOSON){
	yOSON.AppScript = (function(statHost, filesVers){
		var urlDirJs  = "";    /*Directorio relativo Js*/
		var urlDirCss = "";    /*Directorio relativo Css*/
		var version   = "";    /*Release version*/
		var ScrFnc    = {/**/}; /* u_r_l:{state:true, fncs:[fn1,..]} Funciones y estado para un script cargandose*/
		var collecionJS = [];

		/* Constructor */
		(function(url, vers){
			urlDirJs=url+'js/'; urlDirCss=url+'styles/'; version=(true)?vers:'';
		})(statHost, typeof(filesVers)!=="undefined"?filesVers:'');
		/* Convierte una cadena url separada de _ */
		var codear = function(url){
			return (url.indexOf('//')!=-1)?url.split('//')[1].split('?')[0].replace(/[/.:]/g,'_'):url.split('?')[0].replace(/[/.:]/g,'_');
		};
		/* Agregando funciones para ejecutar una vez cargado el Script */
		var addFnc = function(url, fnc){
			if( !ScrFnc.hasOwnProperty(codear(url)) ){
				ScrFnc[codear(url)]={state:true, fncs:[]};/* State:true, para seguir agregando mas funcs a fncs) */
			}ScrFnc[codear(url)].fncs.push(fnc);
		};
		/* Ejecuta las funciones aosciadas a un script */
		var execFncs = function(url){
			ScrFnc[codear(url)].state = false;
			for(var i=0; i<ScrFnc[codear(url)].fncs.length; i++){
				if(ScrFnc[codear(url)].fncs[i]=='undefined'){
					//log(ScrFnc[codear(url)].fncs[i])
				}
				ScrFnc[codear(url)].fncs[i]();
			}
		};
		/* Cargador de Javascript */
		var loadJs = function(url, fnc, onLoadScript){
			var scr = document.createElement("script");
			scr.type = "text/javascript";
			if(scr.readyState){  /*IE*/
				scr.onreadystatechange = function(){
					if(scr.readyState=="loaded" || scr.readyState=="complete"){
					  scr.onreadystatechange=null;
					  if(onLoadScript) {
						onLoadScript();
					  } else {
						fnc(url);
					  }
					}
				};
			  }else{
				  scr.onload=function(){
					  if(onLoadScript) {
						onLoadScript();
					  } else {
						fnc(url);
					  }
				  }
			}
			scr.src = url;
			document.getElementsByTagName("head")[0].appendChild(scr);

		};
		/* description :Cargador de Css */
		var loadCss = function(url, fnc){ /*Para WebKit (FF, Opera ...)*/

			var link = document.createElement('link');
			link.type='text/css';link.rel='stylesheet';link.href=url;
			document.getElementsByTagName('head')[0].appendChild(link);
			if(document.all){link.onload=function(){fnc(url);}}
			else{
				//log("Creando IMG charge para: "+url);
				var img=document.createElement('img');
				img.onerror=function(){
					//log("dentro de img.onerror: "+url);
					if(fnc){fnc(url);}document.body.removeChild(this);
				}
				document.body.appendChild(img);
				img.src=url;
			}
		};
		/* description :Carga el Script (js o css para luego ejecutar funcionalidades asociadas)
		 * dependency : Es necesario tener implementado el metodo remove extendido al objeto array
		 **/
		return {
			chargeSync: function(aUrl, fFnc, sMod, lev){
				var x = 0;

				var loopArray = function(src){
						var srcItem=src[x],
							  isJs   = (srcItem.indexOf('.js') !=-1),
							  isCss  = (srcItem.indexOf('.css')!=-1);

						if(!isJs && !isCss)return false;

						var parts = srcItem.split('/');
						var nameJS = parts[parts.length-1]

						var exists = collecionJS.indexOf(nameJS);
						if(exists !== -1) return false
						collecionJS.push(nameJS)

						parts[parts.length-1]=((yOSON.min!=='undefined'&&isJs)?yOSON.min:'')+nameJS;
						//aUrl = parts.join('/');
						var urlDir = isJs?urlDirJs:urlDirCss;
						var srcItem = (srcItem.indexOf('http')!=-1) ? (srcItem+version) : (urlDir+srcItem+version+(isCss?(new Date().getTime()):''));
						//if(!ScrFnc.hasOwnProperty(codear(srcItem))){
						if(!ScrFnc.hasOwnProperty(codear(srcItem))){
							//Adicionando a la collecion de requests
							ScrFnc[codear(srcItem)] = {};
							ScrFnc[codear(srcItem)].item = srcItem;
							ScrFnc[codear(srcItem)].status = 0;
						}
						//loading
						loadJs(srcItem, execFncs, function(){
							//ready!
							//ScrFnc[codear(srcItem)].status = 1;
							//addFnc(srcItem, fFnc);
							//execFncs(srcItem);
							//siguiente item
							x++;
							//existe mas items en el array?
							if(x < src.length){
								loopArray(src);
								//cuando termine la carga
							} else {
								fFnc();
							}
						});
				};
				loopArray(aUrl);
			},
			charge : function(aUrl, fFnc, sMod, lev){
				var THAT = this;  /*Referencia a este objeto*/
				if(aUrl.length==0||aUrl=='undefined'||aUrl==''){return false;} /*aUrl no valido*/
				if(aUrl.constructor.toString().indexOf('Array')!=-1 && aUrl.length==1){var aUrl = aUrl[0];} /*Array de 1 elemento*/
				var lev = (typeof(lev)!='number')?1:lev;   /*Nivel de anidamiento en esta funcion*/
				//log('[mod:'+sMod+'][level:'+lev+'][script:'+aUrl+']', ( aUrl.indexOf && aUrl.indexOf('ColorB')!=-1 )); /*Debug niveles de anidamiento*/
				//log("ScrFnc ---------> ");log(ScrFnc);
				if(aUrl.constructor.toString().indexOf('String')!=-1){    /*Si es una String*/
					var isJs   = (aUrl.indexOf('.js') !=-1); /*Es script Js*/
					var isCss  = (aUrl.indexOf('.css')!=-1); /*Es script Css*/
					if(!isJs && !isCss)return false;         /*Si no es un script css o js termina la ejecucion*/
					var parts = aUrl.split('/');
					parts[parts.length-1]=((yOSON.min!=='undefined'&&isJs)?yOSON.min:'')+parts[parts.length-1];
					aUrl = parts.join('/');
					var urlDir = isJs?urlDirJs:urlDirCss;
					if(isJs||isCss){  /* Si se va a cargar un Css o Js  (El numero randon es para SF-5.0.3 el cual necesita request diferentes para disparar onerror en img)*/
						var aUrl = (aUrl.indexOf('http')!=-1) ? (aUrl+version) : (urlDir+aUrl+version+(isCss?(new Date().getTime()):''));
						if( !ScrFnc.hasOwnProperty(codear(aUrl)) ){  /* Si es que no esta Registrado el script*/
							addFnc(aUrl, fFnc); isJs?loadJs(aUrl, execFncs):loadCss(aUrl, execFncs); /*neoScr(url, true) true?? no va creo?*/
						}else{                      /* Si se va a cargar un CSS*/
							if(ScrFnc[codear(aUrl)].state){addFnc(aUrl,fFnc)}else{fFnc();}
						}
					}
				}else{
					if(aUrl.constructor.toString().indexOf('Array')!=-1){  /*Si es una Array de 2 a mas aelementos (Arrba de valida 0 a 1 elementos)*/
						this.charge(aUrl[0], function(){//log((lev+1),(sMod.indexOf('popup')!=-1));
							THAT.charge(fnyOSON.remove(aUrl,0), fFnc, sMod, (lev+2))
						}, sMod, (lev+1));
					}else{
						//log(aUrl+' - no es un Array');
				}
				}
			}
		};
	})(yOSON.statHost, yOSON.statVers);
    return yOSON;
});