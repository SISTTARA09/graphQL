import { gql, useQuery } from "@apollo/client";

export const QUERY_ALL_BOOKS = gql`
	query {
		booksList {
			id
			bookName
			author
			publicationYear
			isAvailable
		}
	}
`;

const Books = () => {
	const { data, loading, error } = useQuery(QUERY_ALL_BOOKS);
	console.log(error);
	if (!data) return;
	const { booksList } = data;
	return loading ? (
		<h4>Loading...</h4>
	) : data ? (
		booksList.map((book) => {
			const { id, bookName, author, publicationYear, isAvailable } = book;
			return (
				<div key={id}>
					<h4>Name: {bookName} </h4>
					<h4>Author: {author} </h4>
				</div>
			);
		})
	) : (
		alert("Something Went Wrong!!")
	);
};

export default Books;
