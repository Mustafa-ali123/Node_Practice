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


router.get("/home", async (req, res) => {
    try {
        const data = {
            banners: [
                { id: 1, img: "/banner.jpg.png", link: "https://example.com/1" },
                { id: 2, img: "/banner2.png", link: "https://example.com/2" },
                { id: 3, img: "/banner3.png", link: "https://example.com/3" },
            ],
            mobileBanners: [
                { id: 1, img: "/mobile_banner.png", link: "https://example.com/1" },
                { id: 2, img: "/mobile_banner2.png", link: "https://example.com/2" },
                { id: 3, img: "/mobile_banner3.png", link: "https://example.com/3" },
            ],
            lawnData: {
                collections: [
                    { id: 1, img: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_grid/02_04/dhoop_kinaare_wb.jpg", title: "DHOOP KINARAY" },
                    { id: 3, img: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_grid/02_04/mother_collection_wb.jpg", title: "MOTHER COLLECTION" },
                ],
                collections2: [
                    { id: 2, img: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_grid/02_04/floral_collection_wb.jpg", title: "FLORAL WORLD" },
                    { id: 4, img: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_grid/02_04/premium_collection_wb.jpg", title: "PREMIUM COLLECTION" },
                ],

                collections3: [{ id: 5, img: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_grid/02_04/chunri_collection_wb.jpg", title: "CHUNRI COLLECTION" },]
            },
            collectionData: [
                { id: 1, text: "CHIKAN KARI", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/co-ord.jpg", link: "https://example.com/1" },
                { id: 1, text: "CO-ORD SETS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/timeless-allure.jpg", link: "https://example.com/1" },
                { id: 2, text: "NEW SEASON", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/chikan-kari.jpg", link: "https://example.com/2" },
                { id: 3, text: "TIMELESS ALLURE", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/new-season.jpg", link: "https://example.com/3" },
                { id: 3, text: "JOY OF SUMMER", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/timeless-allure.jpg", link: "https://example.com/3" },
                { id: 1, text: "CHUNRI", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/joy-of-summer.jpg", link: "https://example.com/1" },
                { id: 1, text: "FLORAL WORLD", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_05/chunri.jpg", link: "https://example.com/1" },
            ],
            support: [
                { id: 1, text: "SUPPORT 24/7", image: "https://www.gulahmedshop.com/media/wysiwyg/icon/2025/01_support_24_7.png", description: "Contact us 24 hours a day, 7 days a week" },
                { id: 2, text: "TRACK YOUR ORDER", image: "https://www.gulahmedshop.com/media/wysiwyg/icon/2025/02_track_order_icon.png", description: "Click for the quick update on your order" },
                { id: 3, text: "RETURN & EXCHANGES", image: "https://www.gulahmedshop.com/media/wysiwyg/icon/2025/03_return_and_exchange.png", description: "Please view the return and exchange policy" }
            ],
            homeIdea: [
                { id: 1, text: "CHIKAN KARI", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/01_08/dyed_duvet_sets.jpg", link: "https://example.com/1" },
                { id: 1, text: "CO-ORD SETS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/01_08/printed_sheet_sets.png", link: "https://example.com/1" },
                { id: 2, text: "THROWS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/01_08/throws.png", link: "https://example.com/2" },
                { id: 3, text: "CUSHIONS COVERS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/01_08/cushion_covers.png", link: "https://example.com/3" },
                { id: 3, text: "PRINTED DUVET COVERS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_01/printed_duvet_covers.jpg", link: "https://example.com/3" },
                { id: 1, text: "DYED SHEETS SETS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/01_08/dyed_sheet_sets.png", link: "https://example.com/1" },
                { id: 1, text: "DYED DUVET COVERS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/00_carousel/02_01/bedding-basics.jpg", link: "https://example.com/1" },
            ],
            accessorieData: [
                { id: 1, text: "BAGS", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/01_carousel/01_08/bags.png", link: "https://example.com/1" },
                { id: 1, text: "WOMEN SHOES", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/01_carousel/01_08/women_shoes.png", link: "https://example.com/1" },
                { id: 2, text: "SCENTED CANDLES", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/01_carousel/01_08/scented_candles.png", link: "https://example.com/2" },
                { id: 3, text: "fRAGANCES", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/01_carousel/01_08/fragrances.png", link: "https://example.com/3" },
                { id: 3, text: "MEN'S SHOES", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/01_carousel/01_08/men_shoes.png", link: "https://example.com/3" },
                { id: 1, text: "JEWELRY", image: "https://www.gulahmedshop.com/media/wysiwyg/2025/01_home_page/01_carousel/01_08/jewelry.png", link: "https://example.com/1" },
            ],
            newCollection: [
                { id: 1, text: "CHIKAN KARI", image: "https://www.gulahmedshop.com/media/magefan_blog/Blog_Cover_Summer_Lawn.jpg", link: "https://example.com/1" },
                { id: 1, text: "CO-ORD SETS", image: "https://www.gulahmedshop.com/media/magefan_blog/gulahmed-ideas-dolmen-clifton.jpg", link: "https://example.com/1" },
                { id: 2, text: "THROWS", image: "https://www.gulahmedshop.com/media/magefan_blog/Blog_Banner2.jpg", link: "https://example.com/2" },
                { id: 3, text: "CUSHIONS COVERS", image: "https://www.gulahmedshop.com/media/magefan_blog/Blog-Cover-2.jpg", link: "https://example.com/3" }
            ],
        }
        const responseData = {
            success: true,
            message: "Request processed successfully",
            data
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Internal Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
module.exports = router
