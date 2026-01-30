//(Q1)  VARIABLES and DATATYPES
// function getType(input) {
//     return typeof input
// }
// console.log(getType(5))
// console.log(getType("jagdish"))
// console.log(getType(false))
// console.log(getType({}))
// console.log(getType([]))


// console.log(typeof undefined)
// console.log(typeof null)
// console.log(null == undefined) 
// console.log(null === undefined)
// let mysteryBox; // not known yet but it surely have a value
// let box = null; // the box is empty now but can be assigned some stuff later.

// output: number
//         string
//         boolean
//         object
//         object

//---------------------------------------------

//(Q2) 
// null: you are explicitly stating that the value is null / nothing
// undefined: currently its not known but in future it will get assgined something


//---------------------------------------------
//(Q3)
// // Functions
// function addNormal(a, b) {
//     return a + b
// }
// const addArrow = (a, b) => a + b
// console.log(addNormal(3, 4))
// console.log(addArrow(3, 4))

//-----------------------------------------------
//(Q3)
// Strings
// the differance between == and === is "==" compares the value. it first does the type coehasion of first value and then compares it.
// where as "===" it stricly check the variable.

// function toTitleCase(str) {
//     str = str.toLowerCase()
//     let words = str.split(" ")
//     for (let i = 0; i < words.length; i++) {
//         words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
//     }
//     ans = words.join(" ")
//     return ans;
// }
// console.log(toTitleCase("hello world"))

//--------------------------------------------------------
//(Q4)
// // // Objects
// const user = {
//     name: "jagdish",
//     age: 22,
//     city: "Pune"
// }

// for (const key of Object.keys(user)) {
//     console.log(key)
// }
// console.log()
// for (const value of Object.values(user)) {
//     console.log(value)
// }
// console.log()
// for (const [k, v] of Object.entries(user)) {
//     console.log(`${k}: ${v}`)
// }

// Object.prototype.myAdd = function (key, value) {
//     this[key] = value
// }
// Object.prototype.myRemove = function (key) {
//     if (!this.hasOwnProperty(key)) {
//         console.log("key does not exist")
//         return
//     }
//     delete this[key]
// }

// console.log(user)
// user.myAdd("mobile_number", "8767939605")
// console.log(user)
// user.myRemove("city")
// user.myRemove("city")
// console.log(user)


// Convert below array of object group by role
// const users = [
//     { name: "Pratik", role: "admin" },
//     { name: "Amit", role: "user" },
//     { name: "Neha", role: "admin" },
//     { name: "Ravi", role: "user" },
// ];

// function groupByRole(obj) {
//     const newObj = {}

//     for (let v of Object.values(users)) {
//         if (!newObj.hasOwnProperty(v.role)) {
//             newObj[v.role] = [v];
//         } else {
//             newObj[v.role].push(v);
//         }
//     }

//     return newObj
// }

// console.log(groupByRole(users))

//-------------------------------------------------------------------

// (Q5)
// Array methods
// const arr = [20, 4, 23, 56, 1, 23, 65, 78, 45, 3, 9, 6, 23, 1, 50]
// console.log(arr.map((e) => e * 2))
// console.log(arr.filter(e => e > 10))
// console.log(arr.reduce((a, b) => a + b, 0))
// console.log(arr.reverse())

// outpot: [
//    40,   8,  46, 112,  2, 46,
//   130, 156,  90,   6, 18, 12,
//    46,   2, 100
// ]
// [
//   20, 23, 56, 23, 65,
//   78, 45, 23, 50
// ]
// 407
// [
//   50,  1, 23,  6, 9,  3,
//   45, 78, 65, 23, 1, 56,
//   23,  4, 20
// ]

//--------------------------------------------------------------------

//(Q6)
// ES6+
// const user = {
//     name: "Akshay",
//     age: 25,
//     city: "Pune"
// };
// const { name, age } = user
// console.log(name)
// console.log(age)

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// const mergedArray = [...arr1, ...arr2]
// console.log(mergedArray)

// function sum(...num) {
//     return num.reduce((a, b) => a + b, 0)
// }
// console.log(sum(1, 2, 3, 4, 5))


// output : Akshay
// 25
// [ 1, 2, 3, 4, 5, 6 ]
// 15

//---------------------------------------------------
//(Q7)
// // Closures
// function makeCounter() {
//     let count = 0;
//     return function () {
//         count++
//         console.log(count)
//     }
// }
// const counter = makeCounter();
// counter()
// counter()
// counter()

// output: 1
//         2
//         3

// Closures Definition: an inner function accesses the variables from its lexical scope it forms a closure. Meaning the inner function still
//  references the same variable in the memory until its execution context gets over and the references are garbage collected.

//-------------------------------------------

//(Q8)
// // callbacks
// function execAfter10Sec(func) {
//     setTimeout(func, 10000)
// }
// execAfter10Sec(() => console.log("Hello World"))

//-----------------------------------------------

//(Q9)
// // Promises
// function getUserData(userId) {
//     return new Promise((resolve, reject) => {
//         userId === 1 ? resolve({
//             name: "Jagdish",
//             age: 22,
//             city: "Pune"
//         }) : reject("Invalid User Id")
//     })
// }
// getUserData(1)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))
// getUserData(0)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))
 
//--------------------------------------------------

//(Q10)
// // async await
// async function getUserData(userId) {
//     // some asynchronous operation
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (userId === 0)
//                 reject(new Error("Invalid User Id"))
//             else
//                 resolve({
//                     name: "Sahil",
//                     age: 22,
//                     city: "Pune"
//                 })
//         }, 1000)
//     })
// }

// async function main() {
//     try {
//         const resp1 = await getUserData(1);
//         console.log(resp1)
//         const resp2 = await getUserData(0);
//         console.log(resp2)
//     } catch (error) {
//         console.log(error.message)
//     } finally {
//         console.log("Data Fetching Complete")
//     }
// }
// main();