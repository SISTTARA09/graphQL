import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const QUERY_ONE_BOOK = gql`
	query ($bookName: String!) {
		book(bookName: $bookName) {
			id
			bookName
			author
			publicationYear
		}
	}
`;

const SpeBook = () => {
	const [book, setBook] = useState("");
	const [fetchBook, { data, loading }] = useLazyQuery(QUERY_ONE_BOOK);
	function handleClick() {
		fetchBook({
			variables: {
				bookName: book,
			},
		});
	}
	return (
		<div>
			<input
				type="text"
				name="bookName"
				placeholder="bookName"
				onChange={(e) => setBook(e.target.value)}
			/>
			<button type="button" onClick={handleClick}>
				get Book
			</button>
			{data && data.book.bookName}
		</div>
	);
};

export default SpeBook;
