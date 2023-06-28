 // Array with one missing number
const nums = Array.from(Array(100+1).keys()).slice() 
const numb = nums.sort( () => .5 - Math.random() )
const numbers = numb.slice(0,-1)
console.log(numbers)


function findMissingNumber(numbers) {
  const expectedSum = (100 * (100 + 1)) / 2; // Sum of numbers from 1 to 100
  const actualSum = numbers.reduce((sum, num) => sum + num, 0); // Sum of given numbers
  const missingNumber = expectedSum - actualSum;
  return missingNumber;
}

const missingNumber = findMissingNumber(numbers);
console.log("Missing number:", missingNumber);
