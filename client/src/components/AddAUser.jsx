import { useMutation, gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import { QUERY_ALL_USERS } from "./DisplayUsers";

// create the MUTATION
const ADD_A_USER = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			name
			age
			userName
			nationality
		}
	}
`;
///

const AddAUser = () => {
	const { refetch } = useQuery(QUERY_ALL_USERS); // destruct refetch
	const [addUser /*used to get the variables*/] = useMutation(ADD_A_USER);

	const formRef = useRef(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		const userForm = new FormData(formRef.current);
		const userData = Object.fromEntries(userForm);
		addUser({
			variables: {
				// put the variables in the input
				input: {
					...userData,
					nationality: userData.nationality.toUpperCase(),
					age: Number(userData.age),
				},
				///s
			},
		});
		refetch();
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<input type="text" placeholder="name" name="name" />
			<input type="text" placeholder="userName" name="userName" />
			<input type="number" placeholder="age" name="age" />
			<input type="text" placeholder="nationality" name="nationality" />
			<button type="submit">add user</button>
		</form>
	);
};

export default AddAUser;
