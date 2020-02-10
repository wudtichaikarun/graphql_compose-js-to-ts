# graphql_compose-js-to-ts

### installation

---

init server

```
npm install
npm run dev
```

example query `http://localhost:4001/`

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
    id
    status
    user{
      id
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
