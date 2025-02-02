import { thanks } from './gratitude_list_10000.js';

export const copyConfirmed = $state([0, 0, 0, 0, 0]);

export function handleClick(node, params) {
    const onClick = () => {
        console.log(params);
        copyToClipboard(params.thank, params.idx);
    };

    node.addEventListener('click', onClick);

    return {
        destroy() {
            node.removeEventListener('click', onClick);
        }
    };
}

export function extractFiveThanks() {
    console.log("extractFiveThanks")
    let fiveThanks = [];
	for (let i = 0; i < 5; i++) {
		fiveThanks.push((thanks[Math.floor(Math.random() * thanks.length)]) + ' 감사합니다.');
	}
    console.log(fiveThanks);
    return fiveThanks;
}

export function copyToClipboard(text, idx) {
    try {
        navigator.clipboard
            .writeText(text) // 복사하기
            .then(() => {
                // console.log('클립보드에 복사되었습니다.');
                copyConfirmed[idx] = 1;
                setTimeout(() => (copyConfirmed[idx] = 0), 2000);
            })
            .catch((err) => {
                // console.error('클립보드 복사에 실패했습니다.', err);
                copyConfirmed[idx] = -1;
                setTimeout(() => (copyConfirmed[idx] = 0), 2000);
            });
    } catch {
        console.log('error');
        copyConfirmed[idx] = -1;
        setTimeout(() => (copyConfirmed[idx] = 0), 1000);
    }
}

