import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 5000

// const users = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Abebe Kebede' },
//   { id: 3, name: 'Kim Ung' },
// ];

const users = [
  { id: 1, name: 'John Doe', city: 'New York', age: 30 },
  { id: 2, name: 'Abebe Kebede', city: 'Addis Ababa', age: 25 },
  { id: 3, name: 'Kim Ung', city: 'Seoul', age: 35 },
  { id: 4, name: 'Jane Smith', city: 'New York', age: 28 },
  { id: 5, name: 'Tadesse Lemma', city: 'Addis Ababa', age: 40 },
];

app.use(bodyParser.json())

// app.get('/api/users',(req,res) => {
//   res.status(200).json(users)
// })

app.get('/api/users', (req, res) => {

  // Query parameters are key-value pairs that are appended to the end of a URL after a question mark (?). They are used to pass additional information to the server to modify the request. Multiple query parameters are separated by ampersands (&).
  const {maxAge,minAge,sort,city} = req.query

  let filteredUsers = [...users]

  if(city){
    filteredUsers = filteredUsers.filter(user => user.city.toLowerCase() === city.toLowerCase())
  }

  if(maxAge){
    let max = parseInt(maxAge)
    if(!isNaN(max)){
      filteredUsers = filteredUsers.filter(user => user.age <= max)
    }
  }
  if(minAge){
    let min = parseInt(minAge)
    if(!isNaN(min)){
      filteredUsers = filteredUsers.filter(user => user.age >= min)
    }
  }
  
  if(sort === 'name'){
    filteredUsers = filteredUsers.sort((a,b) => a.name.localeCompare(b.name))
  }else if(sort === 'age'){
    filteredUsers = filteredUsers.sort((a,b) => a.age - b.age)
  }
  res.status(200).json(filteredUsers)

//   http://localhost:5000/api/users?city=New%20York (Filtering users in New York - note the URL encoding for spaces)
// http://localhost:5000/api/users?minAge=25&maxAge=35 (Filtering users between 25 and 35 years old)
// http://localhost:5000/api/users?sort=name (Sorting users by name alphabetically)
// http://localhost:5000/api/users?city=Addis%20Ababa&sort=age (Filtering users in Addis Ababa and sorting them by age)
});

app.get('/api/users/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const user = users.find(user => user.id === id)
  if(user){
    res.status(200).json(user)
  }else{
    res.status(404).send(`There is no user with id: ${id}`)
  }
})
app.post('/api/users',(req,res) => {
const user = req.body
users.push(user)
res.status(201).json(user)
})

app.put('/api/users/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(user => user.id === id)
  if(index !== -1){
    const updatedUser = req.body
    users[index] = updatedUser;
    res.status(200).json(updatedUser)
  }else{
    res.status(404).send(`There is no user with id: ${id}`)
  }
})
app.patch('/api/users/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(user => user.id === id)
  if(index !== -1){
    const updatedUser = req.body
    users[index] = {...users[index],...updatedUser};
    res.status(200).json(updatedUser)
  }else{
    res.status(404).send(`There is no user with id: ${id}`)
  }
})
app.delete('/api/users/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(user => user.id === id)
  if(index !== -1){
    users.splice(index,1)
    res.status(200).send(`User with id ${id} deleted`)
  }else{
    res.status(404).send(`There is no user with id: ${id}`)
  }
})
app.listen(PORT,() => {
  console.log(`The server is running on port ${PORT}`);
  
})