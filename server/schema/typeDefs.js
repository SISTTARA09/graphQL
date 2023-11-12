const { gql } = require("apollo-server");

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		userName: String!
		age: Int!
		friends: [User]
		favoriteMovies: [favoriteMovies!]
		nationality: Nationality!
	}

	input CreateUserInput {
		name: String!
		userName: String!
		age: Int
		nationality: Nationality = CANADA
	}

	input UpdateUserNameInput {
		id: ID!
		newUserName: String!
	}

	type Movie {
		id: ID!
		name: String!
		released: Int!
		isAvailable: Boolean!
	}
	type favoriteMovies {
		id: ID!
		name: String!
	}

	enum Nationality {
		CANADA
		SPAIN
		UNITED_STATES
		UNITED_KINGDOM
		PORTUGUAL
		INDIA
		BRAZIL
		MOROCCO
	}

	"Books List"
	type Book {
		id: ID!
		bookName: String!
		searchName: String!
		author: String!
		publicationYear: Int!
		isAvailable: Boolean
	}

	type Query {
		users: [User!]!
		user(id: ID!): User! # filter by id
		movies: [Movie!]!
		movie(name: String!): Movie!
		favoriteMovies: [favoriteMovies!]
		"books Provider"
		booksList: [Book!]!
		"one Book"
		book(bookName: String!): Book!
	}

	input CreateMovieInput {
		name: String!
		released: Int!
		isAvailable: Boolean
	}

	input CreateBookInput {
		bookName: String!
		searchId: ID!
		author: String!
		publicationYear: Int!
		isAvailable: Boolean
	}
	type Mutation {
		addMovie(input: CreateMovieInput!): Movie!
		createUser(input: CreateUserInput!): User!
		updateUserName(input: UpdateUserNameInput!): User
		deleteUser(id: ID!): User
		"Books"
		addBook(input: CreateBookInput!): Book!
		deleteBook(name: String!): Book
		updateBook(input: CreateBookInput!): Book
	}
`;

module.exports = typeDefs;
