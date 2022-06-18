
import fs from 'fs'
import { execFile } from 'child_process'
import validator from 'validator'

import { playlistPath, songsPath, ytdlpPath } from "./EnvVar.js"

const songQueueMap = new Map()
const songName = ["song1.mp3", "song2.mp3"]

var curr = 0;

export function enqueueSong(url) {
    url = validator.trim(url)
    let valid = validator.isURL(url) && (url.includes("youtube") || url.includes("soundcloud"))

    if (!valid) return false;

    songQueueMap.set(url, (songQueueMap.get(url) || 0) + 1)
    console.log(songQueueMap);
    return true;
}

function nextSong() {
    let max = 0
    let url = undefined
    for (const [key, value] of songQueueMap) {
        if (value > max) {
            max = value
            url = key
        }
    }
    if (url)
        songQueueMap.delete(url)
    return url
}

export function playlist5() {
    let playlistArr = [];
    let oldMax = 50000;
    for (let i = 0; i < (songQueueMap.size > 5 ? 5 : songQueueMap.size); i++) {
        let max = 0;
        let url = undefined;
        for (const [key, value] of songQueueMap) {
            if (value <= oldMax && value > max && !playlistArr.find((e) => e.url === key)) {
                max = value;
                url = key;
            }
        }
        oldMax = max;
        if (url) {
            playlistArr.push({ url: url, count: max });
        }
    }
    return playlistArr;
}

export async function playNextSong() {

    return new Promise(resolve => {
        const nextsong = nextSong()
        if (nextsong != undefined) {
            execFile(ytdlpPath, ['-f', 'ba', '-x', '--no-playlist', '--audio-format', 'mp3', `${nextsong}`, `-o`, `${songsPath}${songName[curr]}`, '--force-overwrites', '--embed-metadata'], (error, stdout, stderr) => {
                console.log(error)
                console.log(stdout)
                console.log(stderr)
            }).on('close', () => {
                fs.writeFile(playlistPath, songsPath + songName[curr], (err) => { })
                curr = (curr + 1) % 2
            })
        }
        resolve('resolved')
    })
}
