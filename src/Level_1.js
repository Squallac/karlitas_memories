
BasicGame.Level_1 = function (game) {

	//Variables
	var player;
	var cursors;
	var map;
	var background;
	var platforms;
	var spikes;
	var star;
	var starCollected = false;
	var hurtSFX;
	var music;
	var jumpTimer = 0;

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Level_1.prototype = {

    create: function () {        
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 300;        

        map = this.add.tilemap('Nivel_1');
        map.addTilesetImage('scifi_platformTiles_32x32', 'tileSet');

        background = this.game.add.sprite(0,0,'background_LVL_1');

        platforms = map.createLayer('platforms');
        spikes = map.createLayer('spikes');

        map.setCollisionBetween(430, 431, true, 'platforms');
        map.setCollision(432, true, 'spikes');

        cursors = this.input.keyboard.createCursorKeys();

        this.setup_world();
        this.setup_player();
        this.setup_star();        
        this.play_background_music();       

    },

    update: function () {

        var player_velocity_x = 150;
        var player_velocity_y = 280;

        this.physics.arcade.collide(player,platforms);
        this.physics.arcade.overlap(player, spikes, this.touch_spike, null, this);
        this.physics.arcade.collide(star,platforms);
        this.physics.arcade.overlap(player,star, this.star_collect, null, this);

        player.body.velocity.x = 0;


        if (cursors.left.isDown) {
            player.body.velocity.x = -player_velocity_x;
            player.animations.play('left');
            
        } else if (cursors.right.isDown) {
            player.body.velocity.x = player_velocity_x;
            player.animations.play('right');
            
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if(cursors.up.isDown && player.body.blocked.down && this.time.now > jumpTimer) {
            player.body.velocity.y = -player_velocity_y;
            jumpTimer = this.time.now + 750;
        }      

        var transition = false;

        this.game.camera.x = player.position.x * 0.5;   

    },

    setup_world: function() {         
        this.world.setBounds(0,0,960,800);        
    },

    setup_player: function() {
        player = this.add.sprite(32, 350, 'karla');
        this.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.bounce.y = 0.1;

        player.animations.add('left', [0,1,2,3], 10, true);
        player.animations.add('right', [5,6,7,8], 10, true);
    },    

    play_background_music: function() {
        music = this.add.audio('background_music');
        music.fadeIn(2000, true);        
    },

    setup_star: function() {
        star = this.add.sprite(900, 0, 'star');
        this.physics.enable(star,Phaser.Physics.ARCADE);
    },

    star_collect: function () {
        var number_of_memory = 1;
        var state = this.state;

        music.fadeOut(1000);        
        
        setTimeout(function(){
            player.kill();
            star.kill();
            music.stop();
            state.start('Memories', true, false, number_of_memory);
        },1000);
        
    },    

    touch_spike: function () {        
        
        this.game_over();
    },

    game_over: function() {
        player.kill();
        star.kill();

        music.fadeOut(1000);
        music.stop();
        
        this.state.start('Level_1');        
    }
};
