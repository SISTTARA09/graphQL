<h2>GraphQl</h2>

<h3>data-base</h3>

```js
["data-base.js"];

const UserList = [
	{
		id: 1,
		name: "john",
		userName: "john",
		age: 20,
		nationality: "Canada",
	},
	{
		id: 2,
		name: "Sarah",
		userName: "sarahOne",
		age: 20,
		nationality: "spain",
	},
	{
		id: 3,
		name: "Ahmed",
		userName: "ahmedTwo",
		age: 22,
		nationality: "United States",
	},
	{
		id: 4,
		name: "salma",
		userName: "salmaSalma",
		age: 25,
		nationality: "United Kingdom ",
	},
	{
		id: 5,
		name: "smail",
		userName: "smailSmail",
		age: 23,
		nationality: "portugual",
	},
];
// export it to work with them in the resolvers
module.exports = UserList;
//
```

<h3>server</h3>

PRE-REQUIRIES:

<pre>
insall:
apollo-server,graphql
nodemon [to facilate running the server]
</pre>

```js
["server.js"];

// get the server constructor
const { ApolloServer } = require("apollo-server");
///

// create the server
const serever = new ApolloServer({ typeDefs, resolvers }); // require one obj contains two args
//

// returns a promise that you can work with it [.then.catch]
server.listen(); // listenning on the server by default [4000]
///
```

<h3> schema</h3>

```js
["./schema/typeDefs.js"];

const { gql } = require("apollo-server"); // allow us to create the schema

const typeDefs = gql`
"define types"
"type name"
type User {
"fieldtitle": "field value"
  id: ID!
  name: String!
  age: Int!
  nationality: String!
}

"Query (Built-in) used to get the data from data-base"
type Query {
"list name"
users: [User!]! " [User] returns a list of users"
}
`;

// export the typeDefs to work with in the server
module.exports = typeDefs;
```

<h3>resolvers</h3>

```js
["./schema/resolvers.js"];

// import the UserList
const UserList = require("../fakeData");
///

// define resolvers
const resolvers = {
	// Query
	Query: {
		users: () => {
			return UserList; // when calling users query return UserList
		},
	},
	/// syntax
};
///

// export it to work with it in the server
module.exports = resolvers;
///
```

<h3>Running the server</h3>

```sh
npm start # will run nodemon
```

THEN

open the localhost:4000

<h3>Enum in schema</h3>

<i>
is a data type that represents a set of predefined values. It allows you to specify a list of values that a column can contain. Each value in the ENUM data type must be one of the explicitly specified values.</i>

```js
['schema/typeDefs.js']

	type User {
...
		nationality: Nationality!
	}
// if the nationality of the user is one of those will be pass if not (crash!!)
enum Nationality {
CANADA
SPAIN
UNITED_STATES
UNITED_KINGDOM
PORTUGUAL
}
```

<h3>Nesting the type</h3>

```js
['schema/typeDefs.js']

type User {
	...
	friends: [User!] // you can use a list or just a one friend
}

```

```js

['fakeData.js']

	{
		id: 1,
		name: "john",
		userName: "john",
		age: 20,
		nationality: "CANADA",
		freinds: [ // use a list or just one friend
			{
				name: "Ahmed",
				age: 20,
			},
		],
	},
	...

```

<h3>search by filter</h3>

```js
['schema/typeDefs.js']

...
type Query {
	...
	user(id: ID!): User!
}

```

```js
['schema/resolvers.js']

const _ = require('lodash')
const resolvers = {

Query: {
	...;
	user: (parent, args) => {
		const id = args.id
		const user = _.find(UserList, {id: Number(id)}) // find the user by its id (Number)
	return user
		}
}}

```

<h3>search for a specific list</h3>

```js
['typeDefs.js']

type User {
	...
	favoriteMovies: [Movies]
}

```

```js
['resolvers.js']

const reslovers = {
	...

	User {
		favoriteMovies: () => {
			return _.filter(moviesLilst, movie => {
				return movie.rleased > 2000 && movie.released < 2010
			})
		}
	}
}
```

<h3>Add To DataBase</h3>

Using Mutation

```js
['typeDefs.js']
// Using input is best practice
	input CreateUserInput {
		name: String!
		userName: String!
		age: Int
		nationality: Nationality  = BRAZIL
	}

	type Mutation {
	/*same*/	createUser(input: CreateUserInput!): User!
	}
```

```js
["resolvers.js"];

Mutation: {
	/*same*/ createUser: (parent, args) => {
		const user = args.input;
		user.id = UserList.length + 1;
		userList.push(user);
		return user;
	};
}
```

```graphql
['graphql']

# this will put the data in the data-base
mutation CreateUser ($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    userName
    nationality
  }
}
##

```

<h3>Update Mutation</h3>

```js
['typeDefs.js']

input UpdateUserNameInput {
id: ID!
	newUserName: String!
}
type Mutation {
	createUser(input: CreateUserInput!): User!
	updateUserName(input: UpdateUserNameInput!): User
}
```

```js
['resolvers.js']

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

```

```graphql
mutation UpdateUserName($input: UpdateUserNameInput!) {
	updateUserName(input: $input) {
		id
		userName
	}
}
```

<h3>Delete Mutation</h3>

```js
['typeDefs.js']
type Mutation {
	deleteUser(id: ID!): User // nullable
}
```

```js
['resolvers.js']
deleteUser: (parent, args) => {
	const id = args.id;
	_.remove(UserList, (user) => user.id === Number(id));
	return null;
},
```

```graphql
mutation DeleteUser($deleteUserId: ID!) {
	deleteUser(id: $deleteUserId) {
		id
	}
}

VARIABLES:
{
  "deleteUserId": "5"
}
```

<h2>fetch to client side</h2>

```sh
npm i @apollo/client
```

<h3>define the client</h3>

```jsx
["App.jsx"];
// import the tools
import { ApolloClient /*constructor*/, ApolloProvider /*component*/, InMemoryCache /*constructor*/ } from "@apollo/client";
///
import DisplayUsers from "./components/DisplayUsers";
const App = () => {
	// create the client
	const client = new ApolloClient({
		cache: new InMemoryCache(), //
		uri: "http://localhost:4000/graphql", // the server url that we will work with
	});
	///
	return (
		{/*Provide the client to the components*/}
		<ApolloProvider client={client}>
			<DisplayUsers />
		</ApolloProvider>
		{/**/}
	);
};

export default App;
```

<h4>the whole list</h4>

```jsx
["components/DisplayUsers.jsx"];

import { gql, useQuery /*hook*/ } from "@apollo/client";

// the data that we want to fetch
const QUERY_ALL_USERS = gql`
	query GetAllUsers {
		users {
			id
			name
			age
			userName
			nationality
		}
	}
`;
///
const DisplayUsers = () => {
	// accept the query we created
	const { loading, data /*object*/, error } = useQuery(QUERY_ALL_USERS);
	///
	return (
		data && (
			<ul>
				{data.users.map((user) => {
					const { id, name, age, userName, nationality } = user;
					return (
						<li key={id}>
							<h3>name: {name}</h3>
							<h3>age: {age}</h3>
							<h3>userName: {userName}</h3>
							<h3>nationality: {nationality}</h3>
						</li>
					);
				})}
			</ul>
		)
	);
};

export default DisplayUsers;
```

<h4>fetch by filter</h4>

```jsx
["component/SpeUser.jsx"];

import { gql, useLazyQuery /*hook*/ } from "@apollo/client";
import React, { useState } from "react";

// create the query
const QUERY_A_USER = gql`
"define that the value intered should be an ID"
	query User($userId: ID!) {
		user(id "the same as typeDefs" : $userId "the variable") { 
			name
			userName
			id
			age
		}
	}
`;
///
const SpeUser = () => {
	const [userId, setUserId] = useState(null);
	const [fetchUser, { data, error }] = useLazyQuery(QUERY_A_USER);
	return (
		<>
			<input
				type="text"
				required
				onChange={(e) => setUserId(Number(e.target.value))}
			/>
			{/* on click get the value from the input and fetch by filter */}
			<button
				onClick={
					() =>
						// fetchUser (filtering Method), accept obj contains variables the user will enter
						fetchUser({
							variables: {
								// variables define here
								userId,
							},
						})
					///
				}
			>
				search
			</button>
			{/* */}
			{data && <h3> {data.user.name} </h3>}
		</>
	);
};

export default SpeUser;
```

<h3>Add a user to the list</h3>

```js
["components/AddAMovie.jsx"];

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { QUERY_ALL_MOVIES } from "./MoviesList";

const ADD_A_MOVIE = gql`
	mutation AddMovie($input: CreateMovieInput!) {
		addMovie(input: $input) {
			id
			name
			released
			isAvailable
		}
	}
`;

const AddAMovie = () => {
	const { refetch } = useQuery(QUERY_ALL_MOVIES); // destructure refetch
	const [checkBox, setCheckBox] = useState(false);

	// destruct the function that will deliver our data
	const [addMovie] = useMutation(ADD_A_MOVIE);
	///
	const formRef = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		const form = formRef.current;
		const formData = new FormData(form);
		const moveiData = Object.fromEntries(formData); // get the data form the form
		addMovie({
			// put the varaibles required
			variables: {
				// deliver the data
				input: {
					...moveiData,
					released: Number(moveiData.released),
					isAvailable: Boolean(moveiData.isAvailable),
				},
				///
			},
			///
		});
		refetch(); // refetch when adding a user
	}
	const handleClick = () => {
		setCheckBox(!checkBox);
	};
	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<input type="text" name="name" placeholder="name" />
			<input type="number" name="released" placeholder="released" />
			<input
				type="checkbox"
				name="isAvailable"
				value={checkBox}
				onClick={handleClick}
			/>
			<input type="submit" />
		</form>
	);
};

export default AddAMovie;
```
