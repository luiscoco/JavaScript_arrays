'use strict';
/*
Arrays are objects with numeric indices as keys
They also have a 'length' property as well as additional methods to work with this indexed values collection.

Since they are objects, they:
- are passed by references;
- can contain any data type as values, including objects and other arrays
They are handy when order of the elements is important
*/

// # syntax
const arr = []; // creation

// type check
console.log(typeof arr); // object
// check for array:
console.log(Array.isArray([]));

const position = ['first', 'second', 'third'];
// to access the value we use the square brackets [] (it's logical, cause we are in fact accessing object's key)
// indexes start with 0, like in strings

console.log(position[0]);
console.log(position[1]);
// 🕮 <cyberbiont> c10bfeb7-dfff-4e6b-b9c2-16641382b71e.md

// overwrite the value
position[0] = 'left';
console.log(position);

// @if level !== 'basic'
// # sparse arrays
{
	const sparse = ['foo', , 'bar'];
	console.log(sparse);
	console.log(sparse.length);

	console.log(sparse[1]);
	console.log('1' in sparse); // false
	// the property with key '1' is not present!

	const dense = ['foo', undefined, 'bar'];
	console.log('1' in dense); // true
	// property with key '1' is present, but has value 'undefined'

	// sparse array can be created by calling new Array with a single number argument
	console.log(new Array(3)); // [, ,];
	console.log(new Array(1, 'x')); // [1, 'x']

	// ! sparse arrays break JS engine optimization for work with arrays because of these 'holes'
	// so should be used with caution
}
// @endif

// # length
{
	// = length of an array is bigger then the index of the last element in array by 1
	const arr = ['first', 'second', 'third'];
	console.log(arr.length);

	// = log the last value of an array
	// `at` method can be used to access the elements, negative values count form the end
	console.log(arr.at(-1));
	// same as
	console.log(arr[arr.length - 1]);

	// strings also have length property and indexed access to symbols
	console.log('string'.length, 'string'[5]);

	// = cleaning the array
	arr.length = 0;
	console.log(arr);

	// = creating filled array
	const newArr = new Array(10).fill(2);

	console.log(newArr);
}

// # methods
{
	// ~ iteration
	const array = ['first', 'second', 'third'];

	// = 'for' loop
	for (let i = 0; i < array.length; i++) {
		const value = array[i];
		console.log(value);
	}

	// = 'for... of' loop
	for (const value of array) {
		console.log(value);
	}
	// we don't have access to index value
	// how can we get it?
	// @if true
	for (const [i, value] of Object.entries(array)) {
		console.log(i, value);
	}
	// @endif

	// = forEach
	array.forEach((value, i, array) => {
		console.log(i, value);
	});

	const iterator = (value) => console.log(value);

	array.forEach(iterator);

	// + we can declare callback separately in some other place in our code
	// - we can't use break / continue in forEach
	// 🕮 <ltc> 62745cb7-fa44-4e3c-a476-d9fe95fed2a0.md
}

// ~ transformation
{
	// = map
	const array = ['first', 'second', 'third'];
	// map iterates over an array and returns a NEW array with processed values
	const newArray = array.map((value, i, array) => value.toUpperCase());

	console.log(array);
	console.log(newArray);

	console.log(array === newArray);

	// adv skipped 🕮 <cyberbiont> d07e83b8-628b-46f1-b9cd-d5d63b1b94d9.md

	// adv reverse, sort 🕮 <ltc> 408b4e12-9707-47ee-908e-1160b0714876.md
}

// ~ adding, deleting, copying elements
{
	// These methods change (mutate) the initial array

	// = push
	{
		const array = ['first', 'second', 'third'];

		console.log(array.push('fourth', 'fifth'));
		console.log(array);
	}

	// = pop
	{
		const array = ['first', 'second', 'third'];
		console.log(array.pop()); // returns the last value
		console.log(array);
	}

	// = unshift
	{
		const array = ['first', 'second', 'third'];
		console.log(array.unshift('zeroth'));
		console.log(array);
	}

	// = shift
	{
		const array = ['first', 'second', 'third'];

		console.log(array.shift()); // returns the first value
		console.log(array);
	}
	// unshift and shift require re-indexing of the elements, that's why they are slow

	// shift and pop return the deleted element
	// unshift and push return new array's length

	{
		{
			// = slice
			// does not mutate the array (returns a new array). strings have the same method
			const array = ['first', 'second', 'third'];

			console.log(array.slice(1, 2));
			console.log(array);
			// 🕮 <ltc> 72ddfcfc-c876-4e41-a4f9-078dc29e883d.md
		}

		{
			// = splice
			//  mutates the initial array. Returns deleted elements array
			const array = ['first', 'second', 'third'];

			console.log(array.splice(2));
			console.log(array);

			// second argument - number of elements we want to remove (unlike in slice)
			// third argument and further - elements we want to add in place of deleted elements

			{
				const array = ['first', 'second', 'third'];
				console.log(array);
				array.splice(1, 1, 'newSecond');
				console.log(array);
			}

			{
				const array = ['first', 'second', 'third'];
				// if we want just to insert something and without deleting anything,
				// we need to pass a falsy value (0, null, false...) as a second argument
				array.splice(1, null, 'insertedBetween');
				console.log(array);
			}

			{
				const array = ['first', 'second', 'third'];
				// if we omit the count of elements we want to delete, all the elements till the end are removed
				array.splice(1);
				console.log(array);
			}
		}

		// we can use negative indices with slice and splice
		{
			const array = ['first', 'second', 'third'];
			console.log(array.slice(-2)); // count from the end
			console.log(array.splice(-1, 1));
		}

		// 🕮 <cyberbiont> 14245682-0ff5-4608-8198-1c387ca6caef.md
	}
}

// ~ search
{
	// search methods do not mutate the array
	/* like in strings: indexOf/lastIndexOf and includes */
	const array = ['a', 'b', 'c', 41, 'b', false];

	console.log(array.includes('b'));

	console.log(array.indexOf('b'));
	console.log(array.indexOf('N')); // not found
	console.log(array.lastIndexOf('b')); // starts search from the end, finds position of the 'b' that is closer to the end
	// adv 🕮 <ltc> 1c9becc4-ff80-499b-b309-81bee35bb668.md

	// What if we want to find elements based on some condition?
	// = find / findIndex
	// return only the first match
	console.log(
		// like indexOf, but we can set a condition,and not just a strict equality
		array.findIndex((value, index, array) => typeof value !== 'string')
		//callback should return true if the element satisfies us
	);

	// `find` returns a value itself
	console.log(array.find((value) => typeof value !== 'string'));

	// `some / every` - return true / false if one of / all elements match the callback
	console.log(array.some((value) => typeof value !== 'string'));

	console.log(array.every((value) => typeof value === 'string'));

	// = filter
	// returns a new array of matches. does not mutate the original array
	console.log(array.filter((value) => typeof value === 'string'));
	console.log(array);
}

// @if level !== 'basic'
// ~ reducing
// = reduce / reduceRight
{
	const arr = [1, 2, 3, 4, 5];
	console.log(
		arr.reduce((previousValue, currentValue, currentIndex, array) => {
			console.log(previousValue, currentValue);
			return previousValue + currentValue;
		}, 0)
	);

	console.log(arr.reduce((accum, item) => accum + item));
}
// @endif

// = join
{
	// reverse of 'split' method of strings. Often used together
	const array = ['first', 'second', 'third'];
	const joinedString = array.join('-');
	console.log(joinedString);
	console.log(joinedString.split('-'));
}

// = flat
{
	const nestedArray = [
		[1, 2],
		[3, 4],
		[5, 6, [7, 8]],
	];
	console.log(nestedArray.flat());
	console.log(nestedArray.flat(2));
}

// adv 🕮 <cyberbiont> 30d62e71-be85-45ea-9bd2-29b0910f0fe6.md

// = concat
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [6, 7, 8];

console.log(arr1.concat(arr2, arr3));
console.log([].concat(arr1, arr2, arr3));

console.log([...arr1, ...arr2, ...arr3]);
