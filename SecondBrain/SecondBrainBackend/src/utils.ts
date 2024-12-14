export function randHash(size:number): String{
    let options: String ="fadsflkjasdf09328o42r3wfavcvmncxzv14dafj";
    let len: number = options.length - 1;
    let hash: String = "";
    for(let i=0;i<size;i++){
        hash += options[Math.floor((Math.random()*len))];
    }
    return hash;
}