import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/calculate-bmi", (req, res) => {
    const { height, weight } = req.body;

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

    res.json({ bmi });
});

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
