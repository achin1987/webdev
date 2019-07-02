function average(arr){
	var sum = 0;
	for (var i=0; i<arr.length; i++){
		sum += arr[i];
		var average = Math.round(sum/arr.length);
	}
	return(average);
}

var scores = [1, 2, 3, 4, 5];
console.log(average(scores));

var scores2 = [9, 8, 7, 6];
console.log(average(scores2));