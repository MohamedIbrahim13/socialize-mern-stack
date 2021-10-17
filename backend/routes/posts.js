const express = require("express");
const router = express.Router();
const postsRouter = require("../controllers/posts");

router.get("/", postsRouter.getAll);
router.get("/search", postsRouter.getBySearch);
router.post("/", postsRouter.createOne);
router.get("/:id", postsRouter.getOne);
router.patch("/:id", postsRouter.updateOne);
router.delete("/:id", postsRouter.deleteOne);
router.patch("/:id/likePost", postsRouter.likeOne);
router.post("/:id/commentPost", postsRouter.commentOne);

module.exports = router;
