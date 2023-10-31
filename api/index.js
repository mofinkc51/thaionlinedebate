import express from "express"
const app = express();

import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";
import path from "path";


//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json())
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../thai-online-debate/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });
  
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.listen(8800, ()=>{
    console.log("Connected")
})

