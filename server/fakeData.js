const UserList = [
	{
		id: 1,
		name: "john",
		userName: "john",
		age: 20,
		nationality: "CANADA",
	},
	{
		id: 2,
		name: "Sarah",
		userName: "sarahOne",
		age: 20,
		nationality: "SPAIN",
		friends: [
			{
				name: "Ahmed",
				age: 20,
			},
		],
	},
	{
		id: 3,
		name: "Ahmed",
		userName: "ahmedTwo",
		age: 22,
		nationality: "UNITED_STATES",
		freinds: [
			{
				name: "Ahmed",
				age: 20,
			},
		],
	},
	{
		id: 4,
		name: "salma",
		userName: "salmaSalma",
		age: 25,
		nationality: "UNITED_KINGDOM",
		freinds: [
			{
				name: "Ahmed",
				age: 20,
			},
		],
	},
	{
		id: 5,
		name: "smail",
		userName: "smailSmail",
		age: 23,
		nationality: "PORTUGUAL",
		freinds: [
			{
				name: "Ahmed",
				age: 20,
			},
		],
	},
];

const moviesList = [
	{
		id: 1,
		name: "Movie1",
		released: 2001,
		isAvailable: true,
	},
	{
		id: 2,
		name: "Movie2",
		released: 2005,
		isAvailable: false,
	},
	{
		id: 3,
		name: "Movie3",
		released: 1991,
		isAvailable: true,
	},
	{
		id: 4,
		name: "Movie4",
		released: 1891,
		isAvailable: false,
	},
	{
		id: 5,
		name: "Movie5",
		released: 2008,
		isAvailable: true,
	},
];

const BOOKS_DATA = [
	{
		id: 1,
		bookName: "Rich Dad Poor Dad",
		searchName: "Rich Dad Poor Dad".toLowerCase().trim(),
		author: "John Doe",
		publicationYear: 2010,
		isAvailable: false,
	},
	{
		id: 2,
		bookName: "The Richest Man In Babylone",
		searchName: "The Richest Man In Babylone".toLowerCase().trim(),
		author: "Ben Laden",
		publicationYear: 2001,
		isAvailable: true,
	},
	{
		id: 3,
		bookName: "The Millionaire Fast lane",
		searchName: "The Millionaire Fast lane".toLowerCase().trim(),
		author: "Al Mola Omar",
		publicationYear: 2009,
		isAvailable: true,
	},
];

module.exports = { UserList, moviesList, BOOKS_DATA };
