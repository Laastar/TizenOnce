window.onload = function() {
	traerCanales();
	console.log("aaaaaa");
};

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
		generadorHTML(categorias[i], n_categorias[i], i);
	}
	
	for (var i = 0; i < shows.length; i++) {
		html = "<div class='item'> <a data-list-item type='button' class='btn button' role='button'> <div>"
			+ "<img src='https://canalonce.mx/REST/data/normal/"+ shows[i].imageWN +"' class='imagen-card'></div></a></div>";
		document.getElementById(shows[i].category).insertAdjacentHTML('beforeend', html);
	}
}

async function traerImagenHorizontal(imagen) {
	const response = await fetch('https://canalonce.mx/REST/data/normal/' + imagen);
	return response.blob();
}

function generadorHTML(cat, n_cat, index) {
	html = "<h1 style='color: #FFFFFF'>" + n_cat + "<br /></h1><section id=''> <div class='wrapper'> <section id='" + cat + "' class='seccion'> </section></div></section>";
	document.getElementById('menus').innerHTML += html;
}