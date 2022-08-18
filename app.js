// A Promise is something that gives you a value some time in the future.

//console.log(fetch(`https://jsonplaceholder.typicode.com/users/1`));
const emailRef = document.querySelector(`.email`);
console.log(emailRef);

// two ways to get access the data
/*
// 1. Then //runs in the background anything inside this happens after as it doenst wait
fetch(`https://jsonplaceholder.typicode.com/users/1`).then((response) => {
    //console.log(response.json()); //.json() to convert the response from backend to frontend, but its still a promise
    response.json().then((data) => { //to unlock the promise again we use .then() method that has a callback
        console.log(data); //now we are getting the object we unlocked through this promise
        emailRef.innerHTML = data.email;
    })
})

//but instead of nesting the .then()s. a better way is like this:
fetch(`https://jsonplaceholder.typicode.com/users/1`) //fetch backend, a promise
.then((response) => { //unlock promise
    return response.json(); //convert for frontend, new promise
}).then((data) => { //unlock promise
    console.log(data); //now we can use it
    emailRef.innerHTML = data.email;
})
*/

// 2. async/await //much cleaner, better practise. this runs line by line
async function main(){ //await only works in async function
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`); //just store response in a variable
    const data = await response.json(); //.json() to convert for frontend, but its still locked up in a promise so you need the await to unlock it
    console.log(data); //now you can use it
    emailRef.innerHTML = data.email;
}

main();


const statusRef = document.querySelector(`.status`)
const videoRef = document.querySelector(`.video`)

//creating a promise
function getSubscriptionStatus(){
    return new Promise((resolve, reject) => {
        resolve(`free`)
    })
}

function getVideo(subscriptionStatus){
    return new Promise((resolve, reject) => {
        if(subscriptionStatus === `VIP`) resolve(`show video`)
        else if(subscriptionStatus === `free`) resolve(`show trailer`)
        else reject(`no video`)
    })
}

//unlocking promise
async function main2(){
    const status = await getSubscriptionStatus();
    statusRef.innerHTML = status
    try{
        console.log(await getVideo(status));
        videoRef.innerHTML = await getVideo(status);
    }
    catch (e){ //to get the reject error to use.
        console.log(e)
        videoRef.innerHTML = e;
    }
}

main2();
