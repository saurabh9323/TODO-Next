const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const userRoutes = require('./src/routes/userRoutes');
const pool = require("./src/db/db");
const app = express();

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', categoryRoutes);
app.use('/api/users', userRoutes);
pool.query("SELECT NOW()")
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection failed:", error));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
