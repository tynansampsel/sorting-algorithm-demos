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


	const generateRandom = () => {
		
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>{time} miliseconds</h1>
				<div onClick={sortA}>
					run
				</div>
				<div onClick={generateRandom}>
					generate
				</div>
			</header>
		</div>
	);
}

export default App;
