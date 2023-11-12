import { gql, useMutation, useQuery } from "@apollo/client";
import { useRef } from "react";
import { QUERY_ALL_BOOKS } from "./Books";

const ADD_A_BOOK = gql`
	mutation AddBook($input: CreateBookInput!) {
		addBook(input: $input) {
			bookName
			author
			publicationYear
		}
	}
`;

const AddBook = () => {
	const {refetch} = useQuery(QUERY_ALL_BOOKS)
	const [addBook] = useMutation(ADD_A_BOOK);
	const formRef = useRef(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const bookData = Object.fromEntries(formData);
		addBook({
			variables: {
				input: {
					...bookData,
					publicationYear: Number(bookData.publicationYear),
				},
			},
		});
		refetch()
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<input type="text" name="bookName" placeholder="bookName" />
			<input type="text" name="author" placeholder="author" />
			<input
				type="number"
				name="publicationYear"
				placeholder="publicationYear"
			/>
			<input type="submit" value="addBook" />
		</form>
	);
};

export default AddBook;
