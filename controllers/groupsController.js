const asyncHandler = require("express-async-handler");

// utils
const sendError = require("../utils/sendError");
// models
const Group = require("../models/Group");

const GroupService = require("../services/groupService");
const GroupMembership = require("../models/GroupMembership");

/*
  @route /api/groups/
  @method POST
*/
const createGroup__POST = asyncHandler(async (req, res) => {
    let userId = req.body.userId;
    let groupName = req.body.groupName;
    if (!userId || !groupName) {
        sendError(400, "Bad request", req, res);
    }
    let groupService = new GroupService();
    let group = await groupService.createGroup(groupName, userId);
    
    res.json({
        success: true,
        group: group,
    });
});

/*
  @route /api/groups
  @method GET
*/
const getUserGroups__GET = asyncHandler(async (req, res) => {
    let userId = req.query.userId;
    if (!userId) {
        sendError(400, "Bad request", req, res);
    }

    // Family and Friends groups are set by default.
    let groupService = new GroupService();
    await groupService.createDefaultGroupsForUser(userId);

    // Fetch all user memberships, no matter if the user created that group or not.
    let uniqueGroupIds = await GroupMembership.find({userId: userId}).distinct('groupId').clone();

    // Get all groups for the user.
    var groups = await Group.find({
        _id: {
            $in: uniqueGroupIds
        }
    });

    let userGroups = [];

    for (var group of groups) {
        let totalImpact = 0;
        let userGroup = {
            _id: group._id,
            name: group.name,
            invitationId: group.invitationId,
            createdBy: group.createdBy,
            hiddenMembers: true,
            users: []
        };
        let memberships = await GroupMembership.find({
            groupId: group._id
        });
        let users = await groupService.getAllMembershipUsers(memberships);
        for (user of users) {
            let isCurrentUser = user._id.toString() === userId;
            let isAdmin = userGroup.createdBy.toString() === userId;
            let u = {
                _id: user._id,
                name: isCurrentUser ? 'You' : user.name,
                isAdmin: isAdmin,
                tabsOpened: user.tabsOpened,
                impact: Math.floor(user.tabsOpened / 15)
            }
            totalImpact += u.impact;
            userGroup.users.push(u);
        }
        userGroup.impact = totalImpact;
        userGroups.push(userGroup);
    }

    // Return the list of all user groups.
    res.json({
        success: true,
        groups: userGroups,
    });
});

/*
  @route /api/groups/:groupId/users
  @method GET
*/
const getGroupUsers__GET = asyncHandler(async (req, res) => {
    let groupId = req.params.groupId;
    if (!groupId) {
        sendError(400, "Bad request", req, res);
    }

    let memberships = await GroupMembership.find({
        groupId: groupId
    });

    let groupService = new GroupService();
    let users = await groupService.getAllMembershipUsers(memberships);

    // Return the list of all group users.
    res.json({
        success: true,
        users: users,
    });
});

/*
  @route /api/groups/:groupId
  @method PUT
*/
const updateGroup__PUT = asyncHandler(async (req, res) => {
    let groupId = req.params.groupId;
    let groupName = req.body.groupName;
    if (!groupId || groupName.length === 0) {
        sendError(400, "Bad request", req, res);
    }
    let group = await Group.findOneAndUpdate(
        {
            _id: groupId
        },
        {
            name: groupName
        }
    );
    res.json({
        success: true,
        group: group,
    });
});

/*
  @route /api/groups/:groupId
  @method DELETE
*/
const deleteGroup__DELETE = asyncHandler(async (req, res) => {
    let groupId = req.params.groupId;
    if (!groupId) {
        sendError(400, "Bad request", req, res);
    }
    // Delete all memberships for this group.
    await GroupMembership.deleteMany({
        groupId: groupId
    });

    // Delete the group.
    let group = await Group.deleteOne(
        {
            _id: groupId
        }
    );
    res.json({
        success: true,
        group: group,
    });
});

module.exports = {
    createGroup__POST,
    getUserGroups__GET,
    updateGroup__PUT,
    getGroupUsers__GET,
    deleteGroup__DELETE
};
