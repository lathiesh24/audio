const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const FormData = require("form-data");

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Use multer to handle file uploads
const upload = multer();

app.post("/api/transcribe", upload.single("audio_file"), async (req, res) => {
  const { file } = req;
  const formData = new FormData();

  formData.append("transaction_id", "21b5875c-7d57-4b92-a407-7c33c8f17d14");
  formData.append("model", "ta-general-v2-8khz");
  formData.append("aux", "TRUE");
  formData.append("audio_file", file.buffer, file.originalname);

  try {
    const response = await axios.post(
      "https://bodhi.navana.ai/api/transcribe",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-customer-id": "7e6d3755-311f-4837-9b81-8bc5c958d4a3",
          "x-api-key": "oDGkpKWrIa7oXoT628ooYfSBUzPEeGXcelMcB1OQ",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
