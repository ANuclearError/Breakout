/*jslint node: true, browser: true */
"use strict";

function Model() {

    var boardWidth,
        boardHeight,
        boardBackground,
        paddle,
        ball,
        play = false,
        blocksNum = 40,
        blocks = [],
        lives,
        score = 0;

    function Paddle() {
        var height,
            width,
            x,
            y,
            colour;

        this.init = function (w, h, initX, initY, initColour) {
            width = w;
            height = h;

            x = initX;
            y = initY;

            colour = initColour;
        };

        /*
         * GETTERS
         */

        this.getHeight = function () {
            return height;
        };

        this.getWidth = function () {
            return width;
        };

        this.getX = function () {
            return x;
        };

        this.getY = function () {
            return y;
        };

        this.getColour = function () {
            return colour;
        };

        /*
         * SETTERS
         */

        this.setX = function (newX) {
            x = newX;
        };
    }

    function Block() {
        var height,
            width,
            x,
            y,
            colour,
            points;

        this.init = function (w, initX, initY, initColour, initPoints) {
            width = w;
            height = w / 2;

            x = initX;
            y = initY / 2;

            colour = initColour;

            points = initPoints;
        };

        /*
         * GETTERS
         */

        this.getHeight = function () {
            return height;
        };

        this.getWidth = function () {
            return width;
        };

        this.getX = function () {
            return x;
        };

        this.getY = function () {
            return y;
        };

        this.getColour = function () {
            return colour;
        };

        this.getPoints = function () {
            return points;
        };

        this.setX = function (newX) {
            x = newX;
        };

        this.setY = function (newY) {
            y = newY;
        };
    }

    function Ball() {
        var radius,
            vx,
            vy,
            x,
            y,
            colour;

        this.init = function (r, initX, initY, initVX, initVY, initColour) {
            radius = r;
            x = initX;
            vx = initVX;
            y = initY;
            vy = initVY;
            colour = initColour;
        };

        /*
         * GETTERS
         */

        this.getRadius = function () {
            return radius;
        };

        this.getX = function () {
            return x;
        };

        this.getY = function () {
            return y;
        };

        this.getVX = function () {
            return vx;
        };

        this.getVY = function () {
            return vy;
        };

        this.getColour = function () {
            return colour;
        };

        this.setVX = function (newVX) {
            vx = newVX;
        };

        this.setVY = function (newVY) {
            vy = newVY;
        };

        this.setX = function (newX) {
            x = newX;
        };

        this.setY = function (newY) {
            y = newY;
        };

        /*
         * ACTUALLY DOING STUFF FINALLY
         */

        this.move = function () {
            x = x + vx;
            y = y + vy;
        };
    }

    this.init = function (w, h, colour) {
        var paddleH,
            paddleW,
            paddleX,
            paddleY,
            ballR,
            blockSize,
            blockColours,
            blockColour,
            i,
            j,
            block;


        lives = 3;
        score = 0;

        boardWidth = w;
        boardHeight = h;
        boardBackground = colour;

        paddleW = boardWidth * 0.25;
        paddleH = boardHeight * 0.05;
        paddleX = (boardWidth / 2) - (paddleW / 2);
        paddleY = Math.round(boardHeight * 0.75);

        // Creating paddle
        paddle = new Paddle();
        paddle.init(paddleW, paddleH, paddleX, paddleY, "#212121");


        ballR = paddleW * 0.05;
        // Creating ball
        ball = new Ball();
        ball.init(ballR, boardWidth / 2, boardHeight / 2, 0, 5, "#212121");

        // ball.init(ballR, paddleX - 50, paddleY - 50, 2, 2, "#FFFFFF");
        // ball.init(ballR, paddleX + paddleW + 50, paddleY - 50, -2, 2, "#FFFFFF");
        // ball.init(ballR, paddleX - 50, paddleY + paddleH + 50, 2, -2, "#FFFFFF");
        // ball.init(ballR, paddleX + paddleW + 50, paddleY + paddleH + 50, -5, -5, "#FFFFFF");

        // Creating blocks
        blocks = [];
        blockSize = boardWidth * 0.10;
        blockColours = ["#388E3C", "#4CAF50", "#C8E6C9", "#FFFFFF"];
        for (i = 0; i < 4; i += 1) {
            blockColour = blockColours[i];
            for (j = 0; j < 10; j += 1) {
                block = new Block();
                block.init(blockSize,
                           j * blockSize,
                           i * blockSize, blockColour,
                           4 - i);
                blocks[blocks.length] = block;
            }
        }
    };



    /*
     * GETTERS
     */

    this.getBoardWidth = function () {
        return boardWidth;
    };

    this.getBoardHeight = function () {
        return boardHeight;
    };

    this.getBoardBackground = function () {
        return boardBackground;
    };

    this.getBall = function () {
        return ball;
    };

    this.getPaddle = function () {
        return paddle;
    };

    this.getBlocks = function () {
        return blocks;
    };

    this.getScore = function () {
        return score;
    };

    /*
     * ACTUALLY DOING STUFF FINALLY
     */
    this.wallCollisions = function () {

        // Left wall
        if (ball.getX() - ball.getRadius() < 0) {
            ball.setX(ball.getRadius());
            ball.setVX(ball.getVX() * -1);
            console.log("Left wall collision");
        }

        // Right wall
        if (ball.getX() + ball.getRadius() > boardWidth) {
            ball.setX(boardWidth - ball.getRadius());
            ball.setVX(ball.getVX() * -1);
            console.log("Right wall collision");
        }

        // Top wall
        if (ball.getY() - ball.getRadius() < 0) {
            ball.setY(ball.getRadius());
            ball.setVY(ball.getVY() * -1);
            console.log("Top wall collision");
        }

        // Bottom wall
        if (ball.getY() + ball.getRadius() > boardHeight) {
            ball.setY(boardHeight - ball.getRadius());
            ball.setVY(ball.getVY() * -1);
            console.log("Bottom wall collision");
            lives -= 1;
            console.log(lives);
            ball.setX(boardWidth / 2);
            ball.setY(boardHeight / 2);
            ball.setVX(0);
            ball.setVY(5);
            paddle.setX(boardWidth / 2 - paddle.getWidth() / 2);
        }
    };

    this.paddleCollisions = function () {
        var ballTop = ball.getY() - ball.getRadius(), // Ball stats
            ballBottom = ball.getY() + ball.getRadius(),
            ballLeft = ball.getX() - ball.getRadius(),
            ballRight = ball.getX() + ball.getRadius(),
            param1, // Conditions for collisions
            param2,
            param3,
            param4;

        // Top collision
        param1 = ballBottom >= paddle.getY();
        param2 = ballTop < paddle.getY();
        param3 = ballLeft <= paddle.getX() + paddle.getWidth();
        param4 = ballRight >= paddle.getX();
        if (param1 && param2 && param3 && param4) {
            console.log("Top paddle collision");
            ball.setY(paddle.getY() - ball.getRadius());
            ball.setVY(ball.getVY() * -1);

            if (ball.getX() < paddle.getX() + paddle.getWidth() / 3) {
                ball.setVX(ball.getVX() - 1);
            }

            if (ball.getX() > paddle.getX() + 2 * paddle.getWidth() / 3) {
                ball.setVX(ball.getVX() + 1);
            }
        }

        // Bottom collision, shares params3 and 4 of the top collision
        param1 = ballBottom > paddle.getY() + paddle.getHeight();
        param2 = ballTop <= paddle.getY() + paddle.getHeight();
        if (param1 && param2 && param3 && param4) {
            console.log("Bottom paddle collision");
            ball.setY(paddle.getY() + paddle.getHeight() + ball.getRadius());
            ball.setVY(ball.getVY() * -1);
        }

        // Left collision
        param1 = ballBottom <= paddle.getY() + paddle.getHeight();
        param2 = ballTop > paddle.getY();
        param3 = ballLeft < paddle.getX();
        param4 = ballRight > paddle.getX();
        if (param1 && param2 && param3 && param4) {
            console.log("Left paddle collision");
            ball.setX(paddle.getX() - ball.getRadius());
            ball.setVX(ball.getVX() * -1);
        }

        // Right collision, shares params3 and 4 of the top collision
        param3 = ballLeft <= paddle.getX() + paddle.getWidth();
        param4 = ballRight > paddle.getX() + paddle.getWidth();
        if (param1 && param2 && param3 && param4) {
            console.log("Right paddle collision");
            ball.setX(paddle.getX() + paddle.getWidth() + paddle.getRadius());
            ball.setVX(ball.getVX() * -1);
        }
    };

    this.blockCollisions = function () {
        var i,
            block;
        for(i = 0; i < blocks.length; i += 1) {
            block = blocks[i];
            if (this.blockCollide(block)) {
                blocks.splice(i, 1);

                score += block.getPoints();
                console.log(score);
            }
        }
    };

    this.blockCollide = function (block) {
        var ballTop = ball.getY() - ball.getRadius(), // Ball stats
            ballBottom = ball.getY() + ball.getRadius(),
            ballLeft = ball.getX() - ball.getRadius(),
            ballRight = ball.getX() + ball.getRadius(),
            param1, // Conditions for collisions
            param2,
            param3,
            param4;

        // Top collision
        param1 = ballBottom >= block.getY();
        param2 = ballTop < block.getY();
        param3 = ballLeft <= block.getX() + block.getWidth();
        param4 = ballRight >= block.getX();
        if (param1 && param2 && param3 && param4) {
            console.log("Top block collision");
            ball.setY(block.getY() - ball.getRadius())
            ball.setVY(ball.getVY() * -1);
            return true;
        }

        // Bottom collision, shares params3 and 4 of the top collision
        param1 = ballBottom > block.getY() + block.getHeight();
        param2 = ballTop <= block.getY() + block.getHeight();
        if (param1 && param2 && param3 && param4) {
            console.log("Bottom block collision");
            ball.setY(block.getY() + block.getHeight() + ball.getRadius());
            ball.setVY(ball.getVY() * -1);
            return true;
        }

        // Left collision
        param1 = ballBottom <= block.getY() + block.getHeight();
        param2 = ballTop > block.getY();
        param3 = ballLeft < block.getX();
        param4 = ballRight > block.getX();
        if (param1 && param2 && param3 && param4) {
            console.log("Left block collision");
            ball.setX(block.getX() - ball.getRadius());
            ball.setVX(ball.getVX() * -1);
            return true;
        }

        // Right collision, shares params3 and 4 of the top collision
        param3 = ballLeft <= block.getX() + block.getWidth();
        param4 = ballRight > block.getX() + block.getWidth();
        if (param1 && param2 && param3 && param4) {
            console.log("Right block collision");
            ball.setX(block.getX() + block.getWidth() + block.getRadius());
            ball.setVX(ball.getVX() * -1);
            return true;
        }

        return false;
    }

    this.update = function (x) {

        paddle.setX(paddle.getX() + x);


        // The paddle can not move outside of the board
        if ((paddle.getX() + paddle.getWidth()) >= boardWidth) {
            paddle.setX(boardWidth - paddle.getWidth());
        } else if (paddle.getX() <= 0) {
            paddle.setX(0);
        }

        ball.move();
        this.wallCollisions();
        this.paddleCollisions();
        this.blockCollisions();

    };

    this.getLives = function () {
        return lives;
    }
}