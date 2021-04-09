// serial promise to read N different values

let fs = require("fs");
let arr = ["./doc/f1.txt","./doc/f2.txt","./doc/f3.txt","./doc/f4.txt"];

let frp = fs.promises.readFile(arr[0]);
console.log("Before");
for(let i =1;i<arr.length;i++){
    frp = frp.then((data)=>{
        console.log(data+"");
        return fs.promises.readFile(arr[i]);
    })
}

frp.then((data)=>{
    console.log(data+"");
})
console.log("After");

