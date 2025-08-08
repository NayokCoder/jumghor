require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysqlPool = require("./Config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors());

// Static routes
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/uploads-video", express.static(path.join(__dirname, "public/uploads/videos")));

// Ensure upload folders exist
const uploadPath = path.join(__dirname, "public/uploads");
const videoUploadPath = path.join(__dirname, "public/uploads/videos");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
if (!fs.existsSync(videoUploadPath)) {
  fs.mkdirSync(videoUploadPath, { recursive: true });
}

// ======= Multer for individual use (image, video) ========
// For image uploads (used in /upload-images)
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: imageStorage });

// For video uploads (used in /upload-video)
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const videoUpload = multer({ storage: videoStorage });

// ======= Mixed Multer Storage (for /add-786-products) ========
const mixedStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "video_file") {
      cb(null, videoUploadPath); // video uploads
    } else if (file.fieldname === "images") {
      cb(null, uploadPath); // image uploads
    } else {
      cb(new Error("Unknown field: " + file.fieldname), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});
const mixedUpload = multer({ storage: mixedStorage });

// ============================= Image Upload API =============================
app.post("/api/upload-images", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, url: fileUrl });
});

// ============================= Video Upload API =============================
app.post("/api/upload-video", videoUpload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No video file uploaded" });
  }
  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${req.file.filename}`;
  res.status(200).json({ success: true, url: videoUrl });
});

// ============================= Product API ==========================
// ============================== Post API Start Here =================
app.post("/api/add-786-products", (req, res) => {
  const { title, description, price, discount_price, rating, stock, product_id, categories, status, video_url, images, video_file, ages } = req.body;

  // Truncate status to prevent data truncation error (assuming VARCHAR(50) or similar)
  const truncatedStatus = status ? status.substring(0, 50) : status;

  // Convert images array to JSON string
  const imagesJSON = Array.isArray(images) ? JSON.stringify(images) : images;

  const sql = `
    INSERT INTO products 
    (title, description, price, discount_price, rating,  stock, product_id, categories, status, video_url,images, video_file,  ages)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)
  `;

  const values = [title, description, price, discount_price, rating, stock, product_id, categories, truncatedStatus, video_url, imagesJSON, video_file, ages];

  mysqlPool
    .query(sql, values)
    .then((result) => {
      return res.json({ success: true, message: "Product added successfully" });
    })
    .catch((err) => {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    });
});
// ============================== Post API End Here ===================
// ============================== Get API Start Here ==================
app.get("/api/get-786-products", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY created_at DESC";

  mysqlPool
    .query(sql)
    .then((result) => {
      return res.json({ success: true, data: result });
    })
    .catch((err) => {
      console.error("DB Fetch Error:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    });
});
// ============================== Get API End Here ====================
// ============================== Delete API ==========================

// ============================= Default Route =============================
app.get("/", (req, res) => {
  res.send("✅ Project API running!");
});

// ============================= Start Server =============================
mysqlPool.query("SELECT 1").then(() => {
  console.log("✅ MySQL connected");
  app.listen(port, () => console.log(`🚀 Server started on port ${port}`));
});
