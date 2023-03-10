const asyncHandler = require("express-async-handler");

// utils
const sendError = require("../utils/sendError");
const GroupService = require("../services/groupService");

// models
const Group = require("../models/Group");
const GroupMembership = require("../models/GroupMembership");
const User = require("../models/User");

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

    // Loop through all user groups (Membership in the group)
    for (var group of groups) {
        let totalImpact = 0;

        // Group obejct to be returned.
        let userGroup = {
            _id: group._id,
            name: group.name,
            invitationId: group.invitationId,
            createdBy: group.createdBy,
            hiddenMembers: true,
            users: []
        };

        // Fetch all group members.
        let memberships = await GroupMembership.find({
            groupId: group._id
        });

        // Get all users of the group.
        let users = await groupService.getAllMembershipUsers(memberships);

        // Loop through group members.
        for (user of users) {
            let isCurrentUser = user._id.toString() === userId;
            let isAdmin = userGroup.createdBy.toString() === user._id.toString();
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

        // Group impact.
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
  @route /api/groups/invitations/:invitationId
  @method GET
*/
const getInvitationGroup_GET = asyncHandler(async (req, res) => {
    let invitationId = req.params.invitationId;
    if (!invitationId || invitationId.length === 0) {
        sendError(400, "Bad request", req, res);
    }
    let group = await Group.findOne(
        {
            invitationId: invitationId
        }
    );
    let user = await User.findOne({
        _id: group.createdBy
    });
    let groupUser = {
        groupName: group.name,
        userName: user.name,
        invitationId: invitationId,
        userImpact: Math.floor(user.tabsOpened / 15)
    };
    res.json({
        success: true,
        group: groupUser,
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

/*
  @route /api/groups/invitations/:invitationId/accept
  @method POST
*/
const acceptGroupInvite_POST = asyncHandler(async (req, res) => {
    let invitationId = req.params.invitationId;
    let userId = req.body.userId;

    if (!invitationId || !userId) {
        sendError(400, "Bad request", req, res);
    }
    
    let group = await Group.findOne({
        invitationId: invitationId
    });

    let msg = {};

    if (group !== null) {

        // Check user membership in the group.
        let membership = await GroupMembership.findOne({
            groupId: group._id,
            userId: userId
        })

        // If the user is not a member of the group.
        if (membership === null) {
            success = await GroupMembership.create({
                groupId: group._id,
                userId: userId
            })
        }
    }

    res.json({
        success: true,
        message: msg,
    });
});

/*
  @route /api/groups/:groupId/leave
  @method PUT
*/
const leaveGroup_PUT = asyncHandler(async (req, res) => {
    let groupId = req.params.groupId;
    let userId = req.body.userId;
    if (!groupId || !userId) {
        sendError(400, "Bad request", req, res);
    }

    // Delete group membership for the user
    let response = await GroupMembership.deleteOne({
        groupId: groupId,
        userId: userId
    });

    res.json({
        success: true,
        message: response,
    });
});

/*
  @route /api/groups/buddies/impact
  @method GET
*/
const buddiesImpact_GET = asyncHandler(async (req, res) => {
    let userId = req.query.userId;
    if (!userId) {
        sendError(400, "Bad request", req, res);
    }

    let totalImpact = 0;
    let groupService = new GroupService();

    // Fetch all user memberships, no matter if the user created that group or not.
    let uniqueGroupIds = await GroupMembership.find({userId: userId}).distinct('groupId').clone();

    // Get all groups for the user.
    var groups = await Group.find({
        _id: {
            $in: uniqueGroupIds
        }
    });

    let allBuddies = [];

    // Loop through all user groups (Membership in the group)
    for (var group of groups) {
        
        // Fetch all group members.
        let memberships = await GroupMembership.find({
            groupId: group._id
        });

        // Get all users of the group.
        let users = await groupService.getAllMembershipUsers(memberships);

        for(var user of users) {
            allBuddies.push(user);
        }
    }

    let visited = [];

    // Add unique buddies impact.
    for(var buddy of allBuddies) {
        if (!visited.includes(buddy._id.toString())) {
            totalImpact += Math.floor(buddy.tabsOpened / 15);
            visited.push(buddy._id.toString());
        }
    }

    res.json({
        success: true,
        totalImpact: totalImpact,
    });
});

module.exports = {
    createGroup__POST,
    getUserGroups__GET,
    updateGroup__PUT,
    getGroupUsers__GET,
    deleteGroup__DELETE,
    getInvitationGroup_GET,
    acceptGroupInvite_POST,
    leaveGroup_PUT,
    buddiesImpact_GET,
};
