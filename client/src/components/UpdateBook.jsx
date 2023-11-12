import { gql, useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { QUERY_ALL_BOOKS } from "./Books";

const UPDATE_BOOK = gql`
	mutation UpdateBook($input: CreateBookInput!) {
		updateBook(input: $input) {
			id
			bookName
		}
	}
`;

const UpdateBook = () => {
	const [check, setCheck] = useState(false);
	const formRef = useRef(null);
	const { refetch } = useQuery(QUERY_ALL_BOOKS);
	const [updateBook] = useMutation(UPDATE_BOOK);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const bookData = Object.fromEntries(formData);
		updateBook({
			variables: {
				input: {
					...bookData,
					searchId: bookData.searchId,
					publicationYear: Number(bookData.publicationYear),
					isAvailable: Boolean(check),
				},
			},
		});
		refetch();
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<input type="text" name="searchId" placeholder="searchName" />
			<input type="text" name="bookName" placeholder="new Name" />
			<input type="text" name="author" placeholder="author" />
			<input
				type="number"
				name="publicationYear"
				placeholder="publicationYear"
			/>
			<input type="checkbox" onChange={() => setCheck(!check)} />
			<input type="submit" />
		</form>
	);
};

export default UpdateBook;
