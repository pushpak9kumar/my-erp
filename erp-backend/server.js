const express = require('express');
const cors = require('cors');
const app = express();

//Middle-rus on every request before ypur routes
app.use(cors());// allow React app to connect
app.use(express.json());//understand JSON in request body

//Your first route-test it works
app.get('/api/hello', (req,res) => {
    res.json({message: 'ERP backend is running!'});
});

//Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

//Middleware
function requiredLogin(req, res, next) {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).json({ error: 'Not logged in'});
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded; // attached user info to the request
        next();
    } catch (err) {
        return res.status(401).json({error: 'Invalid token'});
    }
}

//using middleware on aprotected route
app.get('/api/grades', requiredLogin, (req,res) => {
    // only reached here if token is valid
    res.json({grades: [...] });
});


//Login route
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'erp-secret-key-change-in-production';

//LOGIN ROUTE
app.post('/api/login', async (req,res) => {
    //1. get what user sent
    const { rollNo, password } = req.body;

    //2.Find the student in database
    const student = await db.query(
        'SELECT * FROM students WHERE roll_no = $1',
        [rollNo]
    );

    //3.Student not found
    if(student.rows.length === 0) {
        return res.status(401).json({error: 'Invalid credentials'});
    }

    //4. Check if password matches the stored hash
    const passwordMatch = await bcrypt.compare(
        password,
        student.rows[0].password_hash
    );

    if(!passwordMatch) {
     return res.status(401).json({error: 'Inalid credentials'});
    };

    //5.Create a JWT token-expires in 24 hours
    const token = jwt.sign(
        {rollNo: rollNo, role: 'student', name: student.rows[0].name },
        SECRET,
        { expiresIn: '24h'}
    );

    //6.Send token back to browser
    res.json({ token, name: student.rows[0].name});

});
