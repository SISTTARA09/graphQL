import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { QUERY_ALL_BOOKS } from "./Books";

const DELETE_BOOK = gql`
	mutation DeleteBook($name: String!) {
		deleteBook(name: $name) {
			id
		}
	}
`;

const DeleteBook = () => {
	const [book, setBook] = useState("");
	const [deleteBook] = useMutation(DELETE_BOOK);
	const {refetch} = useQuery(QUERY_ALL_BOOKS)
	const handleClick = () => {
		deleteBook({
			variables: {
				name: book,
			},
    });
    refetch()
	};

	return (
		<div>
			<input
				type="text"
				name="bookName"
				onChange={(e) => setBook(e.target.value)}
			/>
			<button onClick={handleClick}>delete</button>
		</div>
	);
};

export default DeleteBook;
