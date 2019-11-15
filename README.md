# Dream API

### Mutations

Add user
```graphql
mutation{
  addUser(sub:"429721", name:"Amanda", email:"email@email.com"){
    sub
    name
    email
    id
    created_at
  }
}

```

Add dream
```
mutation{
  addDream(title:"title", content:"content test", category:"nightmare", user_id: "5dce198e5beb024a6453fdbd"){
    id
    title
    content
    category
    created_at
  }
}
```

Delete dream 
```
mutation{
  removeDream(id:"5dce2205ddb1114a34582af7"){
    id
  }
}
```

Edit dream
```
mutation{
  editDream(id:"5dce1d6640b93109fceca2e0", title:"NewTitle", content:"new content", category:"nigtmare"){
    id
    title
    content
    category
    created_at
  }
}
```

### Queries

Get users
```
{
  users{
    sub
    name
    email
    id
    created_at
    dreams{
      id
      title
      content
      category
      created_at
    }
  }
}
```

Get User by Sub
```
{
  user(sub:"429721"){
    id
    sub
    name
    email
    created_at
    dreams{
      id
      title
      content
      category
      created_at
    }
  }
}
```


