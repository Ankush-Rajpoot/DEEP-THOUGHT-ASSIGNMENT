import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes.js';
import { connectDB } from './db/index.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v3/app', eventRoutes);

connectDB().then(() => console.log("Database connected")).catch(console.error);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
