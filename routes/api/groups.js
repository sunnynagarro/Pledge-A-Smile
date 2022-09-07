const router = require("express").Router();

const {
  createGroup__POST,
  getUserGroups__GET,
  updateGroup__PUT,
  getGroupUsers__GET,
  deleteGroup__DELETE,
} = require("../../controllers/groupsController");

/*
  @route api/groups/
  @method POST
*/
router.post("/", createGroup__POST);

/*
 @route /api/groups/
 @method GET
*/
router.get("/", getUserGroups__GET);

/*
 @route /api/groups/:groupId
 @method PUT
*/
router.put("/:groupId", updateGroup__PUT);

/*
 @route /api/groups/:groupId
 @method DELETE
*/
router.delete("/:groupId", deleteGroup__DELETE);

/*
  @route /api/groups/:groupId/users
  @method GET
*/
router.get("/:groupId/users", getGroupUsers__GET);

module.exports = router;
