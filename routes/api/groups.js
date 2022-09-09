const router = require("express").Router();

const {
  createGroup__POST,
  getUserGroups__GET,
  updateGroup__PUT,
  getGroupUsers__GET,
  deleteGroup__DELETE,
  getInvitationGroup_GET,
  acceptGroupInvite_POST,
  leaveGroup_PUT,
  buddiesImpact_GET,
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

/*
  @route /api/groups/invitations/:invitationId
  @method GET
*/
router.get("/invitations/:invitationId", getInvitationGroup_GET);

/*
  @route /api/groups/invitations/:invitationId/accept
  @method POST
*/
router.post("/invitations/:invitationId/accept", acceptGroupInvite_POST);

/*
  @route /api/groups/:groupId/leave
  @method PUT
*/
router.put("/:groupId/leave", leaveGroup_PUT);

/*
  @route /api/groups/buddies/impact
  @method GET
*/
router.get("/buddies/impact", buddiesImpact_GET);

module.exports = router;
