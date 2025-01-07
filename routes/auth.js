const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = require("express").Router()

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const Jwt_Key = "Testing"
    try {
        const result = await User.findOne({ email })
        if (!result) {
            res.send("User not found").status(400)
        }

        const confirm = await bcrypt.compare(password, result.password)

        if (!confirm) {
            res.send("Enter invalid password.").status(401)
        }
        const payload = {
            email, name: result.name
        }
        const token = jwt.sign(payload, Jwt_Key, { expiresIn: "1y" })
        return res.send({ ...result.toObject(), token: `Bearer ${token}` }).status(200)
    } catch (orerr) {
        console.log("Internal Error", error)
    }

})

  // let token = authToken.split("Bearer ");
  //   token = token[1];
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // req.user = decoded; // Store the decoded user information for future use
  // next();

       // if (!user) {
       //      return res.status(401).json({
       //          responseCode: 401,
       //          success: false,
       //          message: 'Unauthorized. User log in required.'
       //      });
       //  }

// Fetch all posts for the user
    // const posts = await Post.find({ userId });

    // // Group posts by age
    // const ageCounts = {};
    // for (let post of posts) {
    //   ageCounts[post.age] = (ageCounts[post.age] || 0) + 1;
    // }

    // // Format the response
    // const formattedPosts = Object.entries(ageCounts).map(([age, count]) => ({
    //   age: Number(age),
    //   count,
    // }));

    // res.json({
    //   user: { name: user.name, email: user.email },
    //   posts: formattedPosts,
    // });


// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
//     cb(null, uniqueSuffix);
//   }
// });


// const fileFilter = function (req, file, cb) {
//   const allowedFileTypes = ["jpg", "jpeg", "png", "pdf", "docx"];
//   const fileExtension = file.originalname.split('.').pop().toLowerCase();
//   console.log('File extension:', fileExtension); // Debug log

//   if (!allowedFileTypes.includes(fileExtension)) {
//     console.error("Invalid file type:", fileExtension); // Error log
//     return cb(new Error("Invalid file type"), false);
//   }
//   cb(null, true);
// };


// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for each file
// }).single('file')

// module.exports = { upload };
module.exports = router
