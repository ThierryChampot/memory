// le proto des images
function Memory(elementId,images){
	this.element = document.querySelector('#'+elementId);
	this.images = images.concat(images);
	this.launchGame()
}

Memory.prototype.launchGame = function() {
// efface tout et appelle lance createBoard

	// images retournees
	this.revealed = [];

	// paires  trouvees
	this.found = [];

	this.shuffle();
	this.createBoard();
}

Memory.prototype.shuffle = function() {
	// mélage les images
	var i
	var j
	for (var i = this.images.length -1; i >= 0; i--){
		// nbe aléatoire entre 0 et i
		j = Math.floor(Math.random() * i);

		// récupère image courante (la dernière)
		k = this.images[i]

		// j inverse l'image courante et l'image d'index j (nbe aléatoire généré plus haut)
		this.images[i] = this.images[j]
		this.images[j] = k
	}
}

Memory.prototype.createBoard = function() {
	// lit le tableau des images et pour chaque image, lance la fonction create image
	for (var i = 0; i < this.images.length; i++) {
		this.createImage(this.images[i]);
	}
}

Memory.prototype.createImage = function(image) {
	// création de la case
	var p = document.createElement('p');
	// onclik sur le p
   	p.onclick = this.reveal.bind(this);

   	// création des images
	var img = document.createElement('img');
	// récupérer le lien de l'image
	img.src="./images/img"+image;
	// cacher l'image
	img.className='hidden';
	// fixer la hauteur de l'image
    img.height = 128;
    // fixer la largeur de l'image
    img.width = 128;

    // insérer l'image dans l'élément
   	p.appendChild(img)
   	this.element.appendChild(p)
}

Memory.prototype.reveal = function(ev) {
	ev.stopPropagation();
	// on vérifie s'il n'y a pas déjà 2 images visibles et si 2 images sont déjà affichées, je ne fais rien
	if (this.revealed.length === 2) return;

	// j'affiche l'image contenue dans mon p
	var img = ev.target.firstElementChild
	img.className="";

	// j'ajoute l'image affichée à this.revealed
	this.revealed.push(img);
	console.log(this.revealed)

	// je vérifie si j'ai trouvé une paire
	this.checkFound();

	// si les images sont différentes, je les cache après une seconde
	if (this.revealed.length === 2) {
		setTimeout(this.hide.bind(this),1000);
	}
}

Memory.prototype.hide = function() {
// 
this.revealed.forEach(function(image){image.className="hidden"})
this.revealed = []
}

Memory.prototype.checkFound = function() {
	// test
	if (this.revealed.length < 2) return;

	// ajout au tableau des paires trouvees
	if (this.revealed[0].src===this.revealed[1].src){
		this.found.push(this.revealed[0],this.revealed[1]);
		this.revealed = []
		} 
	if (this.found.length === this.images.length) {alert('bravo !')}
}
