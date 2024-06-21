App = window.App || {};
App.Init = (function Init() {

	
	async function traerCanales() {
		const response = await fetch('https://canaloncetv.s3.amazonaws.com/REST/data/mdb/channels.json');
		const shows = await response.json();

		var categorias = [];
		var n_categorias = [];
		var e_categorias = [];
		
		for (var i = 0; i < shows.length; i++) {
				if (shows[i].n_categoria &&  !n_categorias.includes(shows[i].n_categoria)) {
					categorias.push(shows[i].category);
					n_categorias.push(shows[i].n_categoria);
					e_categorias.push(i);
				}
		}
		
		for (i = 0; i < categorias.length; i++) {
			if(i === 0) {
				generadorHTML(categorias[i], n_categorias[i], i);
			}
			else {
				generadorHTML(categorias[i], n_categorias[i], i, categorias[i-1], n_categorias[i-1]);
			}
		}
		
		for (var i = 0; i < shows.length; i++) {
			html = "<div class='item'> <a data-list-item id='" + shows[i].slugc + "' type='button' class='btn button' role='button'> <div>"
				+ "<img src='https://canalonce.mx/REST/data/normal/"+ shows[i].imageWN +"' class='imagen-card'></div></a></div>";
			document.getElementById(shows[i].category).insertAdjacentHTML('beforeend', html);
		}
		
		
		for (i = 0; i < categorias.length; i++) {
			if(i === 0) {
				generadorMenus(null, n_categorias[i], n_categorias[i+1], i);
			}
			else if (i === categorias.length-1){
				j = 'max';
				generadorMenus(n_categorias[i-1], n_categorias[i], null, j);
			}
			else {
				generadorMenus(n_categorias[i-1], n_categorias[i], n_categorias[i+1], i);
			}
		}
	}
	
	async function traerImagenHorizontal(imagen) {
		const response = await fetch('https://canalonce.mx/REST/data/normal/' + imagen);
		return response.blob();
	}

	function generadorHTML(cat, n_cat, i, ant_cat, act_n_cat) {
		n_cat = n_cat.replace(/\s/g, '');
		html = "<h1 style='color: #FFFFFF'>" + n_cat + "<br /></h1><section id='" + n_cat + "'> <div class='wrapper'> <section id='" + cat + "' class='seccion'> </section></div></section>";
		document.getElementById('menus').innerHTML += html;
	}
	
	function generadorMenus(pre_cat, n_cat, post_cat, i) {
		if(i === 'max') {
			pre_cat = pre_cat.replace(/\s/g, '');
			n_cat = n_cat.replace(/\s/g, '');
			App.Navigation.registerMenu({
		        domEl: document.querySelector('#' + n_cat),
		        name: n_cat,
		        previousMenu: pre_cat
		    });
		}
		else if(i === 0) {
			n_cat = n_cat.replace(/\s/g, '');
			post_cat = post_cat.replace(/\s/g, '');
			App.Navigation.registerMenu({
		        domEl: document.querySelector('#' + n_cat),
		        name: n_cat,
		        nextMenu: post_cat
		    });
		} else {
			pre_cat = pre_cat.replace(/\s/g, '');
			n_cat = n_cat.replace(/\s/g, '');
			post_cat = post_cat.replace(/\s/g, '');
			App.Navigation.registerMenu({
		        domEl: document.querySelector('#' + n_cat),
		        name: n_cat,
		        previousMenu: pre_cat,
		        nextMenu: post_cat
		    });
		}
	}
	
	/*var player = videojs('my-player');
	var pivote = player.controlBar.getChild("ProgressControl");
	
	
	var indexS = player.controlBar.children().indexOf(pivote);

	var botonS = player.controlBar.addChild("button", {}, indexS);
	var botonSDom = botonS.el();
	botonSDom.innerHTML = "<span><i class='fa-solid fa-forward-step'></i></span>";
	botonSDom.onclick = function() {
		alert("Siguiente episodio");
	}

	var botonA = player.controlBar.addChild("button", {}, 0);
	var botonADom = botonA.el();
	botonADom.innerHTML = "<span><i class='fa-solid fa-backward-step'></i></span>";
	botonADom.onclick = function() {
		alert("Episodio anterior");
	}
	
	App.Navigation.registerMenu({
        domEl: document.querySelector('#my-player'),
        name: 'reproductor'
    });*/

	traerCanales();

}());
