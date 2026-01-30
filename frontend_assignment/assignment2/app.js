// ================== 1. Scope Fix ==================
function printName() {
    if (true) {
        let name = "Akshay";
        console.log(name);
    }
}
printName();

// ================== 2. Strict Comparison Fix ==================
let age = "18";
if (Number(age) === 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// ================== 3. Loop Fix ==================
const arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// ================== 4. Async Fix ==================
let data;
setTimeout(() => {
    data = "Loaded";
    console.log(data);
}, 1000);

// ================== 5. Return Fix ==================
function add(a, b) {
    return a + b;
}
const result = add(2, 3);
console.log(result);

// ================== 6. Object Mutation ==================
var user = {
    name: "John",
    age: 25,
};
function updateAge(u) {
    u.age = 30;
}
updateAge(user);
console.log(user.age);

// ================== 7. Fetch Fix ==================
fetch("https://api.example.com/data")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(err => console.error(err));

// ================== 8. Map Fix ==================
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => {
    if (n % 2 === 0) {
        return n * 2;
    }
    return n;
});
console.log(doubled);

// ================== 9. this Fix ==================
const person = {
    name: "Amar",
    greet() {
        console.log("Hello " + this.name);
    },
};
person.greet();



// Find and fix the bug from below code
// —-----------------------------------------------------------------
//     function printName() {

//         if (true) {

//             var name = "Akshay";

//         }

//         console.log(name);

//     }



// printName();

// —----------------------------------------------------------------------



//     let age = "18";



// if (age === 18) {

//     console.log("Adult");

// } else {

//     console.log("Minor");

// }

 

// —-------------------------------------------------------------------------

// const arr = [10, 20, 30];



// for (let i = 0; i <= arr.length; i++) {

//     console.log(arr[i]);

// }

 

// —-------------------------------------------------------------------

//     let data;



// setTimeout(() => {

//     data = "Loaded";

// }, 1000);



// console.log(data);

 

// —-----------------------------------------------------------------------

//     function add(a, b) {

//         a + b;

//     }



// const result = add(2, 3);

// console.log(result);

 

// —-----------------------------------------------------------------------------

 

// const user = {

//     name: "John",

//     age: 25,

// };



// function updateAge(u) {

//     u.age = 30;

// }



// updateAge(user);

// console.log(user.age);

 

// —------------------------------------------------------------------

//     html file



//         < button id = "btn" > Click</button >

//             <script>

//                 const btn = document.getElementById("btn");

//                 btn.addEventListener("click", handleClick());



//                 function handleClick() {

//                     alert("Clicked");

//   }

//             </script>

 

// —---------------------------------------------------------------------------

//     fetch("https://api.example.com/data")

//         .then((res) => {

//             res.json();

//         })

//         .then((data) => {

//             console.log(data);

//         });

 

// —--------------------------------------------------------------------------

// const nums = [1, 2, 3, 4];



// const result = nums.map(No => {

//     if (n % 2 === 0) {

//         return n * 2;

//     }

// });



// console.log(result);

 

// —-----------------------------------------------------------------------

// const person = {

//     name: "Amar",

//     greet: () => {

//         console.log("Hello " + this.name);

//     },

// };



// person.greet();


