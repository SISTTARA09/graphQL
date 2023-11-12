const { UserList, moviesList, BOOKS_DATA } = require("../fakeData");

const _ = require("lodash");

const resolvers = {
	Query: {
		users: () => {
			return UserList;
		},
		movies: () => {
			return moviesList;
		},
		user: (parent, args) => {
			const id = args.id;
			const user = _.find(UserList, { id: Number(id) });
			return user;
		},
		movie: (parent, args) => {
			const movieName = args.name;
			return _.find(moviesList, { name: movieName });
		},
		// Book List //
		booksList: () => {
			return BOOKS_DATA;
		},
		// one Book
		book: (parent, args) => {
			const bookName = args.bookName;
			console.log(bookName);
			const searchName = bookName.toLowerCase().trim();
			const book = _.find(BOOKS_DATA, { searchName });
			return book;
		},
		// favoriteMovies: () => {
		// 	return _.filter(moviesList, (movie) => {
		// 		return movie.released > 2000 && movie.released < 2010;
		// 	});
		// },
	},
	
	User: {
		favoriteMovies: () => {
			return _.filter(moviesList, (movie) => {
				return movie.released > 2000 && movie.released < 2010;
			});
		},
	},

	Mutation: {
		addMovie: (parent, args) => {
			const movie = args.input;
			movie.id = Number(moviesList.length) + 1;
			moviesList.push(movie);
			return movie;
		},
		createUser: (parent, args) => {
			const user = args.input;
			user.id = Number(UserList.length) + 1;
			UserList.push(user);
			return user;
		},
		updateUserName: (parent, args) => {
			const { id, newUserName } = args.input;
			UserList.forEach((user) => {
				if (user.id === Number(id)) {
					user.userName = newUserName;
					userUpdated = user;
				}
			});
			const user = _.find(UserList, { id: Number(id) });
			return user;
		},
		deleteUser: (parent, args) => {
			const id = args.id;
			_.remove(UserList, (user) => user.id === Number(id));
			return null;
		},
		// add A Book

		addBook: (parent, args) => {
			const book = args.input;
			book.id = Number(BOOKS_DATA.length) + 1;
			book.searchName = book.bookName.toLowerCase().trim();
			BOOKS_DATA.push(book);
			return book;
		},
		deleteBook: (parent, args) => {
			const bookName = args.name;
			_.remove(
				BOOKS_DATA,
				(book) => book.searchName === bookName.toLowerCase().trim()
			);
			return null;
		},
		updateBook: (parent, args) => {
			const searchId = args.input.searchId;
			const newData = args.input;
			newData.id = searchId;
			let book = _.find(BOOKS_DATA, { id: searchId });
			book = { ...book, ...newData };
			return book;
		},
	},
};

module.exports = resolvers;
