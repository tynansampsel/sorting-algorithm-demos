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
		let newArr = Array(10).fill(0);
		for(let i = 0; i < newArr.length; i++){
			newArr[i] = i;
		}

		for(let i = (newArr.length-1); i > 0; i--){

			let j = Math.floor(Math.random() * (i+1));

			[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
		}

		console.log(newArr)
		setMixedArray(newArr)
	}

	const sortA = () => {
		const startTime = Date.now()

		// for(let i = 0; i < 1000; i++){
		// 	console.log("v")
		// }

		let mixedArrayCopy = [...mixedArray];
		let isSorted = false;

		while(!isSorted) {
			let madeChanges = false;
			for(let i = 0; i < mixedArrayCopy.length; i++){
				if(i >= mixedArrayCopy.length) continue

				if(mixedArrayCopy[i] > mixedArrayCopy[i+1]){

					[mixedArrayCopy[i], mixedArrayCopy[i+1]] = [mixedArrayCopy[i+1], mixedArrayCopy[i]]

					madeChanges = true;
				}
			}

			if(!madeChanges) isSorted = true;
		}

		const endTime = Date.now()
		setTime(endTime - startTime)
		console.log(endTime - startTime)
		console.log(mixedArrayCopy)
	}


	//does not work yet. 
	const mergeSort = () => {
		const startTime = Date.now()
		let mixedArrayCopy = [...mixedArray];


		const middle = Math.floor((mixedArrayCopy.length)/2);
		const left = mixedArrayCopy.slice(0, middle)
		const right = mixedArrayCopy.slice(middle, mixedArrayCopy.length)
		console.log(mixedArrayCopy)

		console.log("["+left+"] : ["+ right+"]")


		const newLeft = rfunc(left);
		const newRight = rfunc(right);


		console.log("finished array")
		console.log(newLeft+"  "+ newRight)

		const newArr = newLeft[newLeft.length-1] < newRight[0] ? [...newLeft, ...newRight] : [...newRight, ...newLeft]

		const endTime = Date.now()
		setTime(endTime - startTime)
		console.log(endTime - startTime)
		console.log(newArr)
	}

	//takes 2 arrays, the low and high.
	const rfunc = (arr) => {
		console.log("r-------")
		//console.log(arr)

		if(arr.length <= 1){
			console.log("["+arr+"] E")
			return arr;
		}

		const middle = Math.floor((arr.length)/2);

		//get half of left
		const left = arr.slice(0, middle)
		
		//get half of right
		const right = arr.slice(middle, arr.length)

		console.log("["+left+"] : ["+ right+"] IN")


		//recurse over left
		//recurse over right
		const newLeft = rfunc(left);
		const newRight = rfunc(right);

		//console.log("["+newLeft+"] : ["+ newRight+"] OUT")

		if(newLeft[newLeft.length-1] < newRight[0]) {
			console.log("["+newLeft+"] : ["+ newRight+"] OUT")

			return [...newLeft, ...newRight]

		} else {
			console.log("["+newRight+"] : ["+ newLeft+"] OUT")

			return [...newRight, ...newLeft]
		}

		//compare left to right and order and return
		//return newLeft[newLeft.length-1] < newRight[0] ? [...newLeft, ...newRight] : [...newRight, ...newLeft]
	}

	//bucket

	//merge

	const generateRandom = () => {
		
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>{time} miliseconds</h1>
				<div 
					className="sortButton"
					onClick={sortA}
				>
					bubble Sort
				</div>

				<div 
					className="sortButton"
					onClick={mergeSort}
				>
					Merge Sort
				</div>
				{/* <div onClick={generateRandom}>
					generate
				</div> */}
			</header>
		</div>
	);
}

export default App;
