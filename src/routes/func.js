import { thanks } from './gratitude_list_10000.js';

export function extractFiveThanks() {
    console.log("extractFiveThanks")
    let fiveThanks = [];
	for (let i = 0; i < 5; i++) {
		fiveThanks.push((thanks[Math.floor(Math.random() * thanks.length)]) + ' 감사합니다.');
	}
    console.log(fiveThanks);
    return fiveThanks;
}