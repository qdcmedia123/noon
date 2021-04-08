// Create unique array from the 
function run(input, result) {
	if(input.length === 0) {
		return result;
	}

	// Add the first row to the result 
	result = result.concat(input.shift()) 

	// Get the last index of each remaining array 
	input.forEach(function(item) {
		result.push(item.pop());
	})

	// Add the last row in reverse order 
	result = result.concat(input.pop().reverse());

	// Now add the first element in remaining row 
	var temp = [];
	input.forEach(function(leftEnd) {
		temp.push(leftEnd.shift());
	})

	// Push the temp in reverse order 
	result =result.concat(temp.reverse());

	return run(input, result);
}

const array4 = [[1,2,3,4],
 [5,6,7,8],
 [9,10,11,12],
 [13,14,15,16]];
var result = run(array4, []);

console.log(result)