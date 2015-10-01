(function () {
	var game = new Phaser.Game(800, 600, Phaser.Auto, 'menuExample');
	var menuState = {
		preload: function() {},
		create: function() {}
	};
	game.state.add('MainMenu', menuState);
	game.state.start('MainMenu');
		
})();