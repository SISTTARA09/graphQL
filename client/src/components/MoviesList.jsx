import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

export const QUERY_ALL_MOVIES = gql`
	query GetAllMovies {
		movies {
			name
			id
			released
		}
	}
`;

const MoviesList = () => {
	const { data, loading, error } = useQuery(QUERY_ALL_MOVIES);
	console.log(data);

	return (
		<>
			{loading ? (
				<h3>Loading...</h3>
			) : data ? (
				<ul>
					{data.movies.map((movie) => {
						const { id, name, released } = movie;
						return (
							<li key={id}>
								<h4>movie: {name} </h4>
								<h4>year: {released} </h4>
							</li>
						);
					})}
				</ul>
			) : (
				alert("SomeThing Went Wrong!!")
			)}
		</>
	);
};

export default MoviesList;
