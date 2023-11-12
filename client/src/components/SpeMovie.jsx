import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const QUERY_A_MOVIE = gql`
	query Movie($name: String!) {
		movie(name: $name) {
			name
			released
			isAvailable
		}
	}
`;

const SpeMovie = () => {
	const [movieName, setMovieName] = useState(null);
	const [fetchMovie, { data, error }] = useLazyQuery(QUERY_A_MOVIE);
	console.log(data);
	return (
		<>
			<input type="text" onChange={(e) => setMovieName(e.target.value)} />
			<button
				onClick={() => {
					fetchMovie({
						variables: {
							name: movieName,
						},
					});
				}}
			>
				movie
			</button>
			{data && <h4>Movie: {data.movie.name} </h4>}
		</>
	);
};

export default SpeMovie;
