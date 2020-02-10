# graphql_compose-js-to-ts

- Installation
- GraphQL Simple query
- GraphQL Query Fragment
- GraphQL Alias Example
- GraphQL Query Variables

---

## Installation

init server

```
npm install
npm run dev
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
query Staff($id: Int!){
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
