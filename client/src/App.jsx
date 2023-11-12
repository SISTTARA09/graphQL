import React from "react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import DisplayUsers from "./components/DisplayUsers";
import MoviesList from "./components/MoviesList";
import SpeUser from "./components/SpeUser";
import SpeMovie from "./components/SpeMovie";
import AddAUser from "./components/AddAUser";
import AddAMovie from "./components/AddAMovie";
import Books from "./components/Books";
import SpeBook from "./components/SpeBook";
import AddBook from "./components/AddBook";
import DeleteBook from "./components/DeleteBook";
import UpdateBook from "./components/UpdateBook";
const App = () => {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: "http://localhost:4000/graphql",
	});
	return (
		<ApolloProvider client={client}>
			{/* <DisplayUsers /> */}
			{/* <MoviesList /> */}
			{/* <SpeUser /> */}
			{/* <SpeMovie /> */}
			{/* <AddAUser /> */}
			{/* <AddAMovie/> */}
			<Books />
			<SpeBook />
			<AddBook />
			<DeleteBook />
			<UpdateBook/>
		</ApolloProvider>
	);
};

export default App;
