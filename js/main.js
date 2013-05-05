var cb = {};

cb.gotFrame = function(frame) {
	console.log(frame);
	cb.controller.removeListener('animationFrame', cb.gotFrame);
};

cb.connected = function(frame) {
	console.log(frame);
};

$(function() {
	// Leap controller initialization options
	var controllerOptions = { enableGestures: true };
	var controller = new Leap.Controller(controllerOptions);
	cb.controller = controller;

	cb.frameHandlerRef = controller.on('connectionFrame', cb.connected);
	cb.frameHandlerRef = controller.on('animationFrame', cb.gotFrame);
	controller.connect();
});

