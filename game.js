(function()
{
    window.requestAnimFrame = (function()
    {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback)
            {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var ctx = null;

    var Game =
    {
        canvas: document.getElementById("gamecanvas"),

        setup: function()
        {
            if (this.canvas.getContext)
            {
                ctx = this.canvas.getContext('2d');
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                AssetLoader.loadAssets();
                this.runGame();
                this.frameCount = 0;
            }
        },

        init: function()
        {
            Ctrl.init();
            Screen.init();
            CharacterSet.init();
        },

        animate: function()
        {
            Game.play = requestAnimFrame(Game.animate);
            Game.draw();
        },

        draw: function()
        {
            this.frameCount++;
            Screen.draw();
            if (this.frameCount >= Number.MAX_VALUE - 1000) this.frameCount = 0;
        },

        runGame: function()
        {
            Game.init();
            Game.animate();
        }
    };

    var Screen =
    {
        init: function()
        {
        },

        draw: function()
        {
            this.update();

            ctx.save();
            ctx.clearRect(0, 0, Game.width, Game.height);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, Game.width, Game.height);
            ctx.restore();

            CharacterSet.draw();
        },

        update: function()
        {
            var speed = 3;

            if(Ctrl.up)
            {
                CharacterSet.positions[0][1] -= speed;
            }

            if(Ctrl.left)
            {
                CharacterSet.positions[0][0] -= speed;            
            }

            if(Ctrl.down)
            {
                CharacterSet.positions[0][1] += speed;
            }

            if(Ctrl.right)
            {
                CharacterSet.positions[0][0] += speed;
            }
        }
    };

    var AssetLoader = {
        loadAssets: function() {
            this.cSprites = new Image();
            this.cSprites.src = 'res/ld35-chars.png';
        }
    };

    var CharacterSet =
    {
        cCount : 10,
        sprites : [],
        positions: [],

        init: function()
        {
            this.generateCharacters();
        },

        generateCharacters: function()
        {
            for (var i = 0; i < this.cCount; i++)
            {
                var hair = getRand(0,4);
                var face = getRand(0,4);
                var shirt = getRand(0,4);
                var pants = getRand(0,4);
                var x = 100 + (i * 60);
                var y = 100;

                if(this.sprites.indexOf([hair, face, shirt, pants]) == -1)
                {
                    this.sprites.push([hair, face, shirt, pants]);
                    this.positions.push([x, y]);
                }
                else
                {
                    i--;
                }
            }
        },

        draw: function()
        {
            for(var i = this.cCount - 1; i >= 0; i--)
            {
                var char = this.sprites[i];
                var pos = this.positions[i];
                var x = pos[0];
                var y = pos[1];

                drawImage(AssetLoader.cSprites, x, y + 45,  20, 20, char[3] * 20, 60,  20, 20);
                drawImage(AssetLoader.cSprites, x, y + 25,  20, 20, char[2] * 20, 40,  20, 20);
                drawImage(AssetLoader.cSprites, x, y + 5,   20, 20, char[1] * 20, 20,  20, 20);
                drawImage(AssetLoader.cSprites, x, y,       20, 20, char[0] * 20, 0,   20, 20);
            }
        }
    };

    var Ctrl = 
    {
        init: function() {
            window.addEventListener('keydown', this.keyDown, true);
            window.addEventListener('keyup', this.keyUp, true);
        },

        keyDown: function(event) {
            switch (event.keyCode) {
                case 87://W
                    Ctrl.up = true;
                    break;
                case 65://A
                    Ctrl.left = true;
                    break;
                case 83://S
                    Ctrl.down = true;
                    break;
                case 68://D
                    Ctrl.right = true;
                    break;
                default:
                    break;
            }
        },

        keyUp: function(event) {
            switch (event.keyCode) {
                case 87://W
                    Ctrl.up = false;
                    break;
                case 65://A
                    Ctrl.left = false;
                    break;
                case 83://S
                    Ctrl.down = false;
                    break;
                case 68://D
                    Ctrl.right = false;
                    break;
                default:
                    break;


            }
        },
    };

    function drawCircle(x, y, size)
    {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'orange';
        ctx.fill();        
    }

    function drawImage(src, x, y, w, h, sx, sy, cw, ch)
    {
        ctx.drawImage(src, sx, sy, cw, ch, x, y, w, h);
    }

    function getRand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.onload = function()
    {
        Game.setup();
    }
}());