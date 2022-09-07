// models
const Group = require("../models/Group");
const GroupMembership = require("../models/GroupMembership");
const User = require("../models/User");
const shortid = require("shortid");

class GroupService {
    constructor() {}
    async createGroup(groupName, userId) {
        let group = await Group.create({
            name: groupName,
            createdBy: userId,
            invitationId: shortid.generate(),
        });
        await GroupMembership.create({
            groupId: group._id,
            userId: userId
        });
        return group;
    }
    
    async createDefaultGroupsForUser(userId) {
        // Get all groups of the user.
        let groups = await Group.find({
            createdBy: userId
        });
        // The user is always assigned with Friends and Family groups.
        if (groups.length < 2) {
            var hasFriends = false;
            var hasFamily = false;
            groups.map((group) => {
                if (group.name.toLowerCase() === 'friends') {
                    hasFriends = true;
                }
                if (group.name.toLowerCase() === 'family') {
                    hasFamily = true;
                }
            });
            if (!hasFriends) {
                await this.createGroup('Friends', userId);
            }
            if (!hasFamily) {
                await this.createGroup('Family', userId);
            }
        }
    }

    async getAllMembershipUsers(memberships) {
        var users = [];
        for(var membership of memberships) {
            users.push(await User.findById(membership.userId));
        }
        return users;
    }

    async getGroupChildrenList(groupId) {
        let memberships = await GroupMembership.find({
            groupId: groupId
        });

        let children = [];
        await this.getAllMembershipUsers(memberships).then((c) => {
            children = c;
        });
        return children;
    }

    async mapUsersInGroups(groups) {
        let newGroups = [];

        let req = await groups.map(async (group) => {
            let myGroup = group;
            newGroups.push(myGroup);
        });

        return Promise.all(req);
    }
}

module.exports = GroupService;