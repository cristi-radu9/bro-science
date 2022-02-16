const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password1234',
        database: 'broscience'
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    db.select('*').from('users')
    .then(response=>res.status(200).json(response))
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users').where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    }).catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(404).json('wrong credentials');
            }
        }).catch(err => res.status(404).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const { username, email, password, height, weight, gender } = req.body;

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        username: username,
                        email: loginEmail[0],
                        height: height,
                        weight: weight,
                        gender: gender
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.status(400).json('unable to register'))

})

app.post('/AddWorkouts', (req, res) => {
    const { exercises, date, userId } = req.body
    exercises.map(ex => {
        db('workouts').insert({
            userid: userId,
            workdate: date,
            name: ex.name,
            reps: ex.reps,
            sets: ex.sets
        }).then(response => {
            res.status(200).json('ok')
        }).catch(err => res.status(400).json('something went wrong'))
    })
})

app.get('/SearchWorkout/:id/:date', (req, res) => {
    const { id, date } = req.params;
    db('workouts').select('name', 'reps', 'sets').where('userid', '=', id).andWhere('workdate', '=', date)
        .then(response => {
            res.status(200).json(response);
        }).catch(err => res.status(400).json('something went wrong'))
})

app.get('/WorkoutIdeas/:category', (req, res) => {
    const { category } = req.params;
    db('ideas').select('name', 'link').where('category', '=', category.toLowerCase())
        .then(response => {
            res.status(200).json(response);
        }).catch(err => res.status(400).json('something went wrong'))
})

app.post('/AddGoal', (req, res) => {
    const { goal, date, userId } = req.body
    db('goals').insert({
        goal:goal,
        date: date,
        userId: userId
    }).then(response => {
        res.status(200).json('ok')
    }).catch(err => res.status(400).json('something went wrong'))
})

app.post('/SaveCalories', (req, res) => {
    const { calories, date, userId } = req.body
    db('calories').insert({
        calories:calories,
        date: date,
        userId: userId
    }).then(response => {
        res.status(200).json('ok')
    }).catch(err => res.status(400).json('something went wrong'))
})

app.get('/ViewProgress/:userId/:date', (req, res) => {
    const { userId,date } = req.params;
    console.log(userId,date);

    db('goals').select('goal').where('userId', '=', userId).andWhere('date', '=', date)
        .then(response => {
            if(response.length>=1){
                let goal=response[response.length-1];
                db('calories').sum('calories').where('userId','=',userId).andWhere('date', '=', date)
                .then(response=>{
                    if(response[0].sum!==null){
                        var resp={
                            goal:goal.goal,
                            totalCalories:response[0].sum
                        }
                        res.status(200).json(resp);
                    }else{
                        res.status(404).json('no calories');
                    }
                }).catch(err => res.status(400).json('something went wrong'))
            }else{
                res.status(404).json('no goal')
            }
        }).catch(err => res.status(400).json('something went wrong'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    databse.users.forEach(user => {
        if (user.id === id) {
            res.json(user);
            found = true;
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {

})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3000, () => {
    console.log('app is running on port 3000')
})
