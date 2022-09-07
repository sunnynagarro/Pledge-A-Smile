import { Component } from "react";

// Api actions
import { deleteGroup } from "../../../actions/groupService";

import AddEditGroup from "./AddEditGroup";
import InviteBuddies from "./InviteBuddies";

class GroupOptions extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.toggleEditGroupModal = this.toggleEditGroupModal.bind(this, props);
        this.delete = this.delete.bind(this, props);

        this.state = {
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            group: props.group,
            renaming: false,
            inviting: false,
            newGroupName: props.group.name
        }
    }
    
    render() {
        console.log("It loaded me again too");
        return (
            <div className="container">
                <div hidden={this.state.renaming || this.state.inviting} className="modal-container group-options-modal z-50 p-3 drop-shadow-lg rounded-md absolute left-25 top-5 mt-2 table w-[150px] md:w-[150px]">
                    <div className="modal-title">{this.state.group.name}</div>
                    <ul>
                        <li onClick={() => this.setState(old => ({ renaming: !old.renaming }))} >Rename</li>
                        <li onClick={() => this.setState(old => ({ inviting: !old.inviting }))}>Add Members</li>
                        <li onClick={() => this.delete()}>Delete</li>
                    </ul>
                </div>
                {this.state.renaming && <AddEditGroup group={this.state.group} isEdit="true" closeModal={this.toggleEditGroupModal} />}
                {this.state.inviting && <InviteBuddies group={this.state.group} isGroupInvitation="true" inviteUrl={"https://tab.pledgeasmile.com/g/" + this.state.group?.invitationId} />}
            </div>
        );
    }

    // Close group options on Group Edit.
    toggleEditGroupModal(props) {
        props.close(props.group);
    }

    

    // Delete current group.
    async delete(props) {
        await deleteGroup(this.state.group._id);
        props.close(props.group);
    }
}

export default GroupOptions;