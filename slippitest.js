const slp = require('slp-parser-js');
const SlippiGame = slp.default;
const fs = require('fs');
const path = require('path');

let game = new SlippiGame('foxpeach1stock.slp');
//displayPercentChanges(game);
//displayMoves(game, 0);
//countSlowShines(game, 0, 1);
countSlowWaveDashes(game, 0);

function displayPercentChanges(game) {
    let lastPercentP1 = 0;
    let lastPercentP2 = 0;
    const frames = game.getFrames();
    for (let i = 0; frames[i] != undefined; i++) {
        if (frames[i].players[0].pre.percent !== lastPercentP1) {
            console.log("Fox took " + (frames[i].players[0].pre.percent - lastPercentP1) + " damage from Peach's " + (frames[i - 1].players[1].pre.actionStateId));
            lastPercentP1 = frames[i].players[0].pre.percent;
        }
        if (frames[i].players[1].pre.percent !== lastPercentP2) {
            console.log("Peach took " + (frames[i].players[1].pre.percent - lastPercentP2) + " damage from Fox's " + (frames[i - 1].players[0].pre.actionStateId));
            lastPercentP2 = frames[i].players[1].pre.percent;
        }
    }
}

function displayMoves(game, player) {
    const frames = game.getFrames();
    console.log("Pre | Post");
    for (let i = 0; frames[i] != undefined; i++) {
        let currentPlayer = frames[i].players[player];
        console.log(i + ". " + currentPlayer.pre.actionStateId + " | " + currentPlayer.post.actionStateId + " | " + frames[i].players[1].pre.percent.toFixed(0) + ", " + frames[i].players[1].post.percent.toFixed(0));

    }
}

function countSlowShines(game, player, opponent) {
    let firstFrame = 0;
    let oppPercent = 0;
    let numConnectedShines = 0;
    const frames = game.getFrames();
    for (let i = 0; frames[i] != undefined; i++) {
        if (frames[i].players[player].pre.actionStateId === 360 && frames[i].players[opponent].pre.percent !== oppPercent) {
            numConnectedShines++;
            console.log("Shine connected on frame " + i + ".");
            oppPercent = frames[i].players[opponent].pre.percent;
            i += 4;
            let count = 0;
            firstFrame = i;
            while (frames[i].players[player].post.actionStateId !== 24) {
                count++;
                i++;
            }
            console.log("Jumped out of shine after " + (i - firstFrame) + " frame(s).");
        }
        oppPercent = frames[i].players[opponent].pre.percent;
    }
    console.log("Number of shines connected: "+numConnectedShines);
}

function countSlowWaveDashes(game, player) {
    const frames = game.getFrames();
    for(let i = 0; frames[i]!=undefined; i++) {
        if(frames[i].players[player].pre.actionStateId===25) {
            let firstFrame = i;
            while(frames[i].players[player].post.actionStateId !== 43) {
                i++;
            }
            console.log("Frame "+(1+i-firstFrame)+" wavedash.");
        }
    }
}