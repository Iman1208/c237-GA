const express = require('express');
const app = express();
const mysql = require('mysql2');
const multer = require('multer');

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'iman1208', 
    password: 'RazzorBlade12', 
    database: 'exercises' 
});

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/images');//directory save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
})
const upload= multer({storage:storage});

// Handle MySQL connection errors
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));

// Route to render index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to render profile page
app.get('/profile', (req, res) => {
    // Fetch user profile from MySQL
    connection.query('SELECT * FROM users LIMIT 1', (err, results) => {
        if (err) {
            console.error('Error fetching user profile:', err);
            return res.status(500).send('Error fetching user profile');
        }
        const user = results[0]; 
        res.render('profile', { user });
    });
});

// Route to update profile information
app.post('/profile', upload.single('image'),(req, res) => {
    const { name, email } = req.body;
    let image = req.body.currentImage;
    if (req.file){
        image = req.file.filename;
    }
    // Update user profile in MySQL
    connection.query('UPDATE users SET name = ?, email = ?,image=?  WHERE id = 1', [name, email,image], (err, results) => {
        if (err) {
            console.error('Error updating user profile:', err);
            return res.status(500).send('Error updating user profile');
        }
        // Redirect to the homepage after update
        res.redirect('/');
    });
});

// Route to render learnmore page
app.get('/learnmore', (req, res) => {
    res.render('learnmore');
});

// Route to render workouts page
app.get('/workouts', (req, res) => {
    // Fetch workouts from MySQL
    connection.query('SELECT * FROM workouts', (err, results) => {
        if (err) {
            console.error('Error fetching workouts:', err);
            return res.status(500).send('Error fetching workouts');
        }
        const workouts = results; 
        res.render('workouts', { workouts });
    });
});

// Route to render shop page
app.get('/shop', (req, res) => {
    res.render('shop');
});

// Route to render readnow page
app.get('/readnow', (req, res) => {
    res.render('readnow');
});

// Route to render activity page
app.get('/activity', (req, res) => {
    // Fetch exercises from MySQL
    connection.query('SELECT * FROM exercises', (err, results) => {
        if (err) {
            console.error('Error fetching exercises:', err);
            return res.status(500).send('Error fetching exercises');
        }
        const exercises = results; 
        res.render('activity', { exercises });
    });
});

// Route to render add_exercise page
app.get('/add_exercise', (req, res) => {
    res.render('add_exercise');
});

// Route to handle add_exercise form submission
app.post('/add_exercise', (req, res) => {
    const { name, age, height } = req.body;
    // Insert new exercise into MySQL
    connection.query('INSERT INTO exercises (name, age, height) VALUES (?, ?, ?)', [name, age, height], (err, results) => {
        if (err) {
            console.error('Error adding exercise:', err);
            return res.status(500).send('Error adding exercise');
        }
        res.redirect('/activity');
    });
});

// Route to render edit_exercise page
app.get('/edit_exercise/:id', (req, res) => {
    const { id } = req.params;
    // Fetch exercise by ID from MySQL
    connection.query('SELECT * FROM exercises WHERE exercise_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching exercise:', err);
            return res.status(500).send('Error fetching exercise');
        }
        const exercise = results[0]; // Assuming 'results' contains one exercise object
        if (!exercise) {
            return res.status(404).send('Exercise not found');
        }
        res.render('edit_exercise', { exercise });
    });
});

// Route to handle update exercise
app.post('/update_exercise/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, height } = req.body;
    // Update exercise in MySQL
    connection.query('UPDATE exercises SET name = ?, age = ?, height = ? WHERE exercise_id = ?', [name, age, height, id], (err, results) => {
        if (err) {
            console.error('Error updating exercise:', err);
            return res.status(500).send('Error updating exercise');
        }
        res.redirect('/activity');
    });
});

// Route to handle delete exercise
app.post('/delete_exercise/:id', (req, res) => {
    const { id } = req.params;
    // Delete exercise from MySQL
    connection.query('DELETE FROM exercises WHERE exercise_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting exercise:', err);
            return res.status(500).send('Error deleting exercise');
        }
        res.redirect('/activity');
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
