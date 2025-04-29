import express from 'express'
import { authorizeMeadleware,usersMeadleware } from '../meadleware/meadlewares.js';

const router = express.Router()

const users = [
  { id: 1, name: 'John Doe', city: 'New York', age: 30,role: 'admin' },
  { id: 2, name: 'Abebe Kebede', city: 'Addis Ababa', age: 25,role: 'user' },
  { id: 3, name: 'Kim Ung', city: 'Seoul', age: 35,role: 'user' },
  { id: 4, name: 'Jane Smith', city: 'New York', age: 28,role: 'user' },
  { id: 5, name: 'Tadesse Lemma', city: 'Addis Ababa', age: 40,role: 'user' },
];


// GET /api/users/admin-only (requires 'admin' role)//Authorization Middleware (Route-specific Middleware)
router.get('/admin-only',authorizeMeadleware('admin'), (req, res) => {
  const admins = users.filter(user => user.role === 'admin');
  res.status(200).json(admins);
});


// GET /api/users

// router.use(usersMeadleware)

router.get('/',(req,res) => {
  const {maxAge,minAge,city,sort} = req.query
  let filteredUsers = [...users]
if(city){
  filteredUsers = filteredUsers.filter(user => user.city.toLowerCase() === city.toLowerCase())
}

if(minAge){
  let min = parseInt(minAge)
  if(!isNaN(min)){
    filteredUsers = filteredUsers.filter(user => user.age >= min)
  }
}
if(maxAge){
  let max = parseInt(maxAge)
  if(!isNaN(max)){
    filteredUsers = filteredUsers.filter(user => user.age <= max)
  }
}
if(sort === 'name'){
  filteredUsers = filteredUsers.sort((a,b) => a.name.localeCompare(b.name))
}else if(sort === 'age'){
  filteredUsers = filteredUsers.sort((a,b) => a.age - b.age)
}
res.status(200).json(filteredUsers)
})

// GET /api/users/:id

router.get('/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const user = users.find(user => user.id === id)
  if(user){
    res.status(200).json(user)
  }else{
    res.status(404).send(`There is no user with id: ${id}`)
  }
})

// POST /api/users/

router.post('/',(req,res) => {
  const user = req.body
  users.push(user)
  res.status(201).json(user)
})

// PUT /api/users/:id

router.put('/:id',(req,res) => {
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
// PATCH /api/users/:id

router.patch('/:id',(req,res) => {
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

// DELETE /api/users/:id

router.delete('/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const index = users.find(user => user.id === id)
  if(index !== -1){
    users.splice(index,1)
    res.status(200).send(`User with id ${id} deleted`)
  }else{
    res.status(404).send(`There is no user with id: ${id}`)
  }
})



export default router;