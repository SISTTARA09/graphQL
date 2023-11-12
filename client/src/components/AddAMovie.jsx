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
  const {refetch} = useQuery(QUERY_ALL_MOVIES)
	const [checkBox, setCheckBox] = useState(false);
	const [addMovie] = useMutation(ADD_A_MOVIE);
	const formRef = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		const form = formRef.current;
		const formData = new FormData(form);
		const moveiData = Object.fromEntries(formData);
		addMovie({
			variables: {
				input: {
					...moveiData,
					released: Number(moveiData.released),
					isAvailable: Boolean(moveiData.isAvailable),
				},
			},
    });
    refetch()
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
