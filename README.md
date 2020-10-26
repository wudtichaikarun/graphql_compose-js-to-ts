# graphql_compose-js-to-ts

- Installation
- Data model example
- GraphQL Simple query
- GraphQL Query Fragment
- GraphQL Alias Example
- GraphQL Query Variables
- Middleware

---

## Installation

init server

```
npm install
npm run dev
```

---

## Data model example

```Json
{
  "order": {
    "id": "orderId_1",
    "status": "DONE"
  },
  "trip": {
    "id": "tripId_1",
    "staffId": "staffId_1",
    "orderId": "orderId_1",
    "status": "DONE"
  },
  "staff": {
    "id": "staffId_1",
    "userId": "userId_1",
    "status": "ONLINE"
  },
  "user": {
    "id": "userId_1",
    "firstName": "Romantic",
    "lastName": "Haha"
  }
}
```

---

## GraphQL Simple query

`http://localhost:4001/`

```
{
  staffs: StaffMany(filter: {}) {
    id
    userId
    status
    user{
      id
      firstName
      lastName
    }
  },

  staff: StaffOne(id:2222 ){
    staffId: id
    status
    user{
      userId: id
      firstName
      lastName
    }
  },

  users: UserMany(filter: {}){
    id
    firstName
    lastName
  },

  user: UserOne(id: 1234){
    id
    firstName
    lastName
  }
}

```

---

## GraphQL Query Fragment

```
{
  staffs: StaffMany(filter: {}) {
    id
    userId
    status
    user{
      ...fullUser
    }
  },

  staff: StaffOne(id:2222 ){
    id
    status
    user{
      ...fullUser
    }
  },

  users: UserMany(filter: {}){
    ...fullUser
  },

  user: UserOne(id: 1234){
    ...fullUser
  }
}

fragment fullUser on User {
  id
  firstName
  lastName
}

```

---

## GraphQL Alias Example

```
{
  staff: StaffOne(id: 2222){
    staffId: id
    staffStatus: status
    userInformation: user {
      ...fullUser
    }
  }
}


fragment fullUser on User {
  id
  firstName
  lastName
}

```

---

## GraphQL Query Variables

query

```
query Staff($id: String){
  StaffOne(id: $id){
    id
  	userId
    status
    user {
      ...fullUser
    }
  }
}


fragment fullUser on User {
  id
  firstName
  lastName
}

```

query variables

```
{
  "id": 2222
}
```

---

## Middleware

- apply to all root type (Mutation, Query)
- apply to specific root type(MutationTC or QueryTC)
- apply to specific resolver

### Apply to all root type (Mutation, Query)

### Apply to specific root type(MutationTC or QueryTC)

### Apply to specific resolver
