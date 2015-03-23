/*jslint node: true, browser: true */
"use strict";

function View(game) {
    var visibleDisplay,
        model = game,
        canvas = document.getElementById("gameCanvas"),
        context = canvas.getContext("2d");

    this.getCanvasWidth = function () {
        return canvas.width;
    };

    this.getCanvasHeight = function () {
        return canvas.height;
    };

    this.showVisibleDisplay = function () {
        var x = document.getElementsByClassName("visibleDisplay");
        x[0].className = "hiddenDisplay";
        document.getElementById(visibleDisplay).className = "visibleDisplay";
    };

    this.setVisibleDisplay = function (display) {
        visibleDisplay = display.replace("Menu", "");
        this.showVisibleDisplay();
    };

    this.menuButtonCallback = function (callback) {
        var menuButton = document.getElementById("menuButton");
        menuButton.addEventListener("click", callback);
    };

    this.playGameCallback = function (callback) {
        var display = document.getElementById("newGame");
        display.addEventListener("click", callback);
    };

    this.controlCallback = function (callback) {
        var display = document.getElementById("control");
        display.addEventListener("click", callback);
    };

    this.quitCallback = function (callback) {
        var display = document.getElementById("quit");
        display.addEventListener("click", callback);
    };

    this.pauseGameCallback = function (callback) {
        canvas.addEventListener("click", callback);
    };

    this.drawPaddle = function () {
        var paddle = model.getPaddle();

        context.fillStyle = paddle.getColour();
        context.fillRect(paddle.getX(),
                         paddle.getY(),
                         paddle.getWidth(),
                         paddle.getHeight());
    };

    this.drawBall = function () {
        var ball = model.getBall();

        context.fillStyle = ball.getColour();
        context.strokeStyle = ball.getColour();

        context.beginPath();
        context.arc(ball.getX(), ball.getY(), ball.getRadius(), 0, 2 * Math.PI);
        context.lineWidth = 0;
        context.stroke();
        context.fill();
    };

    this.drawBlocks = function () {
        var blocks = model.getBlocks(),
            block,
            i;

        for (i = 0; i < blocks.length; i += 1) {
            block = blocks[i];

            context.fillStyle = block.getColour();
            context.fillRect(block.getX(),
                             block.getY(),
                             block.getWidth(),
                             block.getHeight());

        }
    };

    this.updateScore = function () {
        var header = document.getElementById("span");
        header.innerHTML = 'Score: ' + model.getScore() + " | Lives: " +
            model.getLives();
    };

    this.resetHeader = function () {
        var header = document.getElementById("span");
        header.innerHTML = "Breakout";
    };

    this.update = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = model.getBoardBackground();
        context.fillRect(0, 0, canvas.width, canvas.height);
        // context.lineWidth = 5;
        // context.strokeStyle = 'blue';
        // context.beginPath();
        // context.moveTo(0, 0);
        // context.lineTo(canvas.width, canvas.height);
        // context.moveTo(canvas.width, 0);
        // context.lineTo(0, canvas.height);
        // context.stroke();
        this.drawPaddle();
        this.drawBlocks();
        this.drawBall();
        this.updateScore();
    };

    this.init = function () {
        canvas.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
    };

}