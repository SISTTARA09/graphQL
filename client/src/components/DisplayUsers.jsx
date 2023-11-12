import { gql, useQuery } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
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

const DisplayUsers = () => {
	const { loading, data } = useQuery(QUERY_ALL_USERS);
	return loading ? (
		<h3>Loading...</h3>
	) : data ? (
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
	) : (
		alert("Something went wrong!!")
	);
};

export default DisplayUsers;
