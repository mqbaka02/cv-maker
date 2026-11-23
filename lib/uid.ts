export function generateRandomLetter () {
    const letters= ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (var i= 0; i< 10; i++) letters.push(`${i}`);

    const randomIndex= Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
};

export function generateRandomId (listToAvoid: string[]|undefined= [], length: number|undefined= 6) {
    let output= "";
    do {
        output= "";
        for(var i= 0; i< length; i++) output+= generateRandomLetter();
    } while (listToAvoid.find(el=> el=== output));
    return output;
};