import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";

const QUERY_A_USER = gql`
	fragment PersonalInof on User {
		name
		age
		nationality
	}

	query User($userId: ID!) {
		user(id: $userId) {
			id
			...PersonalInfo
		}
	}
`;

const SpeUser = () => {
	const [userId, setUserId] = useState(null);
	const [fetchUser, { data /*obj*/, error }] = useLazyQuery(QUERY_A_USER);
	if (data) {
		const { name, userName, id, age } = data.user;
		console.log(name, userName, age);
	}
	return (
		<>
			<input type="text" required onChange={(e) => setUserId(e.target.value)} />
			{/* on click get the value from the input and fetch by filter */}
			<button
				onClick={
					() =>
						// fetchUser (filtering Method), accept obj contains variables the user will enter
						fetchUser({
							variables: {
								// variables define here
								userId,
							},
						})
					///
				}
			>
				search
			</button>
			{/* */}
			{data && <h3> {data.user.name} </h3>}
		</>
	);
};

export default SpeUser;
