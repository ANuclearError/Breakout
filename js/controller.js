/*jslint node: true, browser: true */
"use strict";

function Controller() {
    var model = new Model(),
        view = new View(model),
        intervalTime = 16.667,
        intervalObject,
        x = 0,
        multiplier,
        flag = false;


    this.update = function () {
        if (model.getLives() === 0) {
            view.setVisibleDisplay("gameover");
        } else if (model.getBlocks().length === 0) {
            view.setVisibleDisplay("gamewin");
        } else {
            model.update(x * multiplier);
            view.update();
        }

    };

    this.playOrPause = function () {
        if (flag) {
            intervalObject = window.setInterval(this.update, intervalTime);
        } else {
            window.clearInterval(intervalObject);
        }
    };

    this.quitGame = function () {
        window.clearInterval(intervalObject);
    };

    this.getMultiplier = function () {
        var userAgent = navigator.userAgent;

        console.log(userAgent);

        if (userAgent.match(/Android/i)) {
            return -1;
        }

        return 1;
    };

    this.init = function () {
        var controller = this;

        multiplier = this.getMultiplier();

        view.menuButtonCallback(function () {
            view.setVisibleDisplay("home");
            view.resetHeader();
            flag = false;
            controller.playOrPause();
        });

        view.playGameCallback(function () {
            view.setVisibleDisplay("game");

            view.init();

            model.init(view.getCanvasWidth(),
                       view.getCanvasHeight(),
                       "#727272");

            flag = true;
            controller.playOrPause();
        });

        view.controlCallback(function () {
            view.setVisibleDisplay("controls");
        });

        view.quitCallback(function () {
            view.setVisibleDisplay("quitScreen");
        });

        view.pauseGameCallback(function () {
            flag = !flag;
            controller.playOrPause();
        });

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (event) {
                x = Math.round(event.accelerationIncludingGravity.x);
            });
        }
    };
}
var controller = new Controller();
window.addEventListener("load", controller.init(), false);
