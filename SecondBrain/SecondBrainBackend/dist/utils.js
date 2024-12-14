"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randHash = randHash;
function randHash(size) {
    let options = "fadsflkjasdf09328o42r3wfavcvmncxzv14dafj";
    let len = options.length - 1;
    let hash = "";
    for (let i = 0; i < size; i++) {
        hash += options[Math.floor((Math.random() * len))];
    }
    return hash;
}
