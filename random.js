let random;
export const randomCompMove=(arrayToRandom)=>{
    random=Math.floor(Math.random()*arrayToRandom.length);
    console.log(random,arrayToRandom[random]);
    let selected=arrayToRandom[random]
    arrayToRandom.splice(random,1);
    return selected;
};