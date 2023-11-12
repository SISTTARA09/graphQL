<h3>fragments</h3>

<i>
allow us to group more filed in one to fetch from the api
</i>

```graphql

"in place of using this"

query User($userId: ID!) {
		user(id: $userId) {
			id
			name
      userName
      age
      nationality
		}
	}

"use this"


fragment PersonalInfo on User {
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

```
