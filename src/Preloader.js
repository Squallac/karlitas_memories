
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.load.tilemap('Nivel_1','assets/niveles/nivel1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('Nivel_2','assets/niveles/nivel2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('Nivel_3','assets/niveles/nivel3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('Nivel_4','assets/niveles/nivel4.json', null, Phaser.Tilemap.TILED_JSON);
		
		this.load.image('tileSet', 'assets/scifi_platformTiles_32x32.png');
		this.load.image('background_LVL_1', 'assets/backgrounds/dunas.jpg');
		this.load.image('background_LVL_2', 'assets/backgrounds/universidad.jpg');
		this.load.image('background_LVL_3', 'assets/backgrounds/muse_background.jpg');
		this.load.image('background_LVL_4', 'assets/backgrounds/castillo.jpg');

		this.load.image('memory_1', 'assets/backgrounds/memoria_1.jpg');
		this.load.image('memory_2', 'assets/backgrounds/memoria_2.jpg');
		this.load.image('memory_3', 'assets/backgrounds/memoria_3.jpg');

		this.load.image('blank', 'assets/backgrounds/blank.png');
		this.load.image('MainMenu_Logo', 'assets/backgrounds/MainMenu.png');

		this.load.image('Dialog_1', 'assets/backgrounds/dialogo1.jpg');
		this.load.image('Dialog_2', 'assets/backgrounds/dialogo2.jpg');
		this.load.image('The_End', 'assets/backgrounds/fin.jpg');
		
		this.load.image('foto_1', 'assets/backgrounds/foto_1.jpg');
		this.load.image('foto_2', 'assets/backgrounds/foto_2.jpg');
		this.load.image('foto_3', 'assets/backgrounds/foto_3.jpg');
		this.load.image('foto_4', 'assets/backgrounds/foto_4.jpg');

		this.load.spritesheet('karla','assets/karla.png',32, 48);
		this.load.spritesheet('rulo','assets/rulo.png',32, 48);
		this.load.spritesheet('enemigo','assets/malo.png',32, 48);

		this.load.image('star','assets/star.png');
		
		this.load.audio('background_music',['assets/sonidos/background.mp3','assets/sonidos/background.ogg']);
		this.load.audio('background_music_memories',['assets/sonidos/memories.mp3','assets/sonidos/memories.ogg']);
		this.load.audio('Romantic_Music',['assets/sonidos/romantica.mp3','assets/sonidos/romantica.ogg']);

		this.load.audio('Level_4_Music',['assets/sonidos/BellHell.mp3','assets/sonidos/BellHell.ogg']);
		this.load.audio('enemy_sound',['assets/sonidos/i_see_you.mp3','assets/sonidos/i_see_you.ogg']);
		this.load.audio('magic',['assets/sonidos/magia.mp3','assets/sonidos/magia.flac']);
		
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Cargando", {font:"20px monospace", fill: "#fff"});
		this.loadingText.anchor.setTo(0.5,0.5);

		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('background_music') && this.ready == false)
		{
			this.ready = true;
			//this.state.start('Memories', true, false, 1);
			this.state.start('MainMenu');
		}

	}

};
