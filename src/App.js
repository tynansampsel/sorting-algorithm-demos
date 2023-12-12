import { useState, useEffect } from "react";


import './App.css';

function App() {

	const [time, setTime] = useState(0);
	const [mixedArray, setMixedArray] = useState([]);

	useEffect(() => {
		scrambleArray();
	}, [])

	//https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
	const scrambleArray = () => {
		let newArr = Array(10000).fill(0);
		for (let i = 0; i < newArr.length; i++) {
			newArr[i] = i;
		}
		for (let i = (newArr.length - 1); i > 0; i--) {

			let j = Math.floor(Math.random() * (i + 1));

			[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
		}
		setMixedArray(newArr)
	}

	const sortBuiltin = () => {
		const startTime = Date.now()

		let mixedArrayCopy = [...mixedArray];

		mixedArrayCopy.sort();

		const endTime = Date.now()
		setTime(endTime - startTime)
		console.log(endTime - startTime)
	}


	//
	const bubbleSort = () => {
		const startTime = Date.now()

		let mixedArrayCopy = [...mixedArray];
		let isSorted = false;

		while (!isSorted) {
			let madeChanges = false;
			for (let i = 0; i < mixedArrayCopy.length; i++) {
				if (i >= mixedArrayCopy.length) continue

				if (mixedArrayCopy[i] > mixedArrayCopy[i + 1]) {

					[mixedArrayCopy[i], mixedArrayCopy[i + 1]] = [mixedArrayCopy[i + 1], mixedArrayCopy[i]]

					madeChanges = true;
				}
			}

			if (!madeChanges) isSorted = true;
		}

		const endTime = Date.now()
		setTime(endTime - startTime)
		console.log(endTime - startTime)
	}


	//chatGPT's mergesort
	function runMergeSort() {
		const startTime = Date.now();

		let mixedArrayCopy = [...mixedArray];

		const sortedArray = mergeSort(mixedArrayCopy);
	
		const endTime = Date.now();
		setTime(endTime - startTime);
		console.log(endTime - startTime);
	}

	function mergeSort(arr) {
		if (arr.length <= 1) {
			return arr;
		}
	
		const middle = Math.floor(arr.length / 2);
		const left = arr.slice(0, middle);
		const right = arr.slice(middle);
	
		return merge(mergeSort(left), mergeSort(right));
	}
	
	function merge(left, right) {
		let result = [];
		let leftIndex = 0;
		let rightIndex = 0;
	
		while (leftIndex < left.length && rightIndex < right.length) {
			if (left[leftIndex] <= right[rightIndex]) {
				result.push(left[leftIndex]);
				leftIndex++;
			} else {
				result.push(right[rightIndex]);
				rightIndex++;
			}
		}
	
		return result.concat(left.slice(leftIndex), right.slice(rightIndex));
	}




	//my merge sort made without looking at code
	//its very slow, slower than bubblesort. but even if i failed to make it fast it was a fun challenge.
	const mergeSortSlow = () => {
		const startTime = Date.now()
		let mixedArrayCopy = [...mixedArray];


		const middle = Math.floor((mixedArrayCopy.length) / 2);
		const left = mixedArrayCopy.slice(0, middle)
		const right = mixedArrayCopy.slice(middle, mixedArrayCopy.length)

		const newLeft = split(left);
		const newRight = split(right);

		let mergedArray = [];
		let l = 0;
		let r = 0;
		while (l < newLeft.length && r < newRight.length) {
			if (newLeft[l] > newRight[r]) {
				mergedArray = [...mergedArray, newLeft[l]]
				l++
			} else {
				mergedArray = [...mergedArray, newRight[r]]
				r++
			}
		}
		//console.log("[" + a + "] : [" + newLeft.slice(l) + "] : [" + newRight.slice(r) + "] OUT")
		mergedArray = newLeft.length > 0 ? [...mergedArray, ...newLeft.slice(l)] : mergedArray;
		mergedArray = newRight.length > 0 ? [...mergedArray, ...newRight.slice(r)] : mergedArray;

		const endTime = Date.now()
		setTime(endTime - startTime)
		console.log(endTime - startTime)
	}

	//
	const split = (arr) => {
		if (arr.length <= 1) {
			//console.log("["+arr+"] E")
			return arr;
		}
		const middle = Math.floor((arr.length) / 2);

		//get left half
		const left = arr.slice(0, middle)

		//get right half
		const right = arr.slice(middle, arr.length)

		//recurse over left and right
		const newLeft = split(left);
		const newRight = split(right);

		let mergedArray = [];

		let l = 0;
		let r = 0;
		while (l < newLeft.length && r < newRight.length) {
			if (newLeft[l] > newRight[r]) {
				mergedArray = [...mergedArray, newLeft[l]]
				//newLeft.splice(i,1)
				l++
			} else {
				mergedArray = [...mergedArray, newRight[r]]
				//newRight.splice(i,1)
				r++
			}
		}
		mergedArray = newLeft.length > 0 ? [...mergedArray, ...newLeft.slice(l)] : mergedArray;
		mergedArray = newRight.length > 0 ? [...mergedArray, ...newRight.slice(r)] : mergedArray;

		return mergedArray
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>{time} miliseconds</h1>
				<div
					className="sortButton"
					onClick={sortBuiltin}
				>Builtin Sort</div>

				<div
					className="sortButton"
					onClick={bubbleSort}
				>Bubble Sort</div>

				<div
					className="sortButton"
					onClick={runMergeSort}
				>Merge Sort</div>

				<div
					className="sortButton"
					onClick={mergeSortSlow}
				>My Merge Sort</div>
			</header>
		</div>
	);
}

export default App;
