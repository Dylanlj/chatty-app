// var re = /quick\s(brown).+?(jumps)/ig;
// var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');

// console.log(result)


var myRe = /http.+?(png|jpg|gif)/ig;
var str = 'heyshdhd https://www.google.ca/images/branding/googlelogo/2x/googlelogo_color_272x92dp.jpg https://www.google.ca/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
const myObject ={};
var myArray;
while ((myArray = myRe.exec(str)) !== null) {
  var msg = 'Found ' + myArray[0];
  myObject[myRe.lastIndex] = myArray[0]
  // msg += 'Next match starts at ' + myRe.lastIndex;
  console.log(msg);
}


const bar = {2:"hello"}
console.log(bar["2"])
console.log(myObject)
