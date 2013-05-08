var cb = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
	renderer: new THREE.WebGLRenderer(),

	initCanvas: function() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		var geometry = new THREE.PlaneGeometry(5, 5);
		var camTexture = new THREE.Texture();
		var camLoader = new THREE.ImageLoader();
		camLoader.addEventListener('load', function (e) {
			camTexture.image = e.content;
			camTexture.needsUpdate = true;
		});
		camLoader.crossOrigin = true;
		camLoader.load('img/test.jpeg');
		var material = new THREE.MeshBasicMaterial({ 'map': camTexture });
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);

		this.camera.position.z = 5;

		this.renderCanvas();
		$(window).on('resize', $.proxy(cb.onWindowResize, this));
	},

	onWindowResize: function(e) {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
	},

	renderCanvas: function() {
		var self = this;
		requestAnimationFrame(function () { self.renderCanvas() });

		var translationDelta = this.translationDelta;
		console.log(translationDelta);

		this.renderer.render(this.scene, this.camera);
	},

	initLeap: function() {
		// Leap controller initialization options
		var controllerOptions = { enableGestures: true };
		var controller = new Leap.Controller(controllerOptions);
		this.controller = controller;

		this.frameHandlerRef = controller.on('animationFrame', $.proxy(cb.gotFrame, this));
		controller.connect();
	},

	gotFrame: function(frame) {
		// get translation
		var lastFrame = this.controller.frame(1);
		if (! lastFrame) return;

		var translation = frame.translation(lastFrame);
		this.translationDelta = translation;
	}
};

$(function() {
	cb.initCanvas();
	cb.initLeap();
});

