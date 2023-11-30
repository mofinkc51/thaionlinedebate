import express from "express"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import downloadRoutes from "./routes/downloads.js"
import reportRoutes from "./routes/reports.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';


const app = express();


//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json())
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());

//path for downloads folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, './uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // อนุญาตไฟล์รูปภาพและ PDF เท่านั้น
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    console.log("File type is allowed");
    cb(null, true);
  } else {
    console.log("File type is not allowed");
    cb(null, false);
    return cb(new Error('Only .jpeg, .png, .jpg, and .pdf format allowed!'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post("/api/upload", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), (req, res) => {
  const files = req.files;
  if (!files || !files.image || !files.pdf) {
    return res.status(400).json("ไฟล์ไม่ถูกต้อง");
  }
  console.log("Files uploaded successfully:", files);
  res.status(200).json({
    image: files.image[0].filename,
    pdf: files.pdf[0].filename
  });
})
const uploadProfile = multer({ storage: storage});
app.post("/api/upload/profile", uploadProfile.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// สมมติว่าคุณมี route ใหม่ที่ '/api/downloads'
app.get('/api/downloads/cert/:filename', (req, res) => {
  // ดึงชื่อไฟล์จากพารามิเตอร์ URL
  console.log(req.params.filename);
  const filename = req.params.filename;

  // กำหนด path สำหรับไฟล์ที่ต้องการดาวน์โหลด
  const filePath = path.join(uploadsDir, filename);

  // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
  if (existsSync(filePath)) {
    // กำหนด headers และส่งไฟล์
    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
    res.sendFile(filePath);
  } else {
    // ถ้าไม่พบไฟล์, ส่งข้อความ error
    res.status(404).send('ไม่พบไฟล์ที่คุณต้องการดาวน์โหลด');
  }
});

app.use('/uploads', express.static(uploadsDir));
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/reports", reportRoutes)
app.use("/api/downloads", downloadRoutes)

app.listen(8800, ()=>{
    console.log("Connected")
})

