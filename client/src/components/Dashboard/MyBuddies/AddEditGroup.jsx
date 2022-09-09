import { Component } from "react";

// Api actions
import { createGroup, updateGroup } from "../../../actions/groupService";

class AddEditGroup extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.submitGroup = this.submitGroup.bind(this, props);
        this.cancel = this.cancel.bind(this, props);
        this.updateGroupNameValue = this.updateGroupNameValue.bind(this);

        this.state = {
            group: props.group,
            newGroupName: props.group === null || props.group === undefined ? '' : props.group.name,
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            isEdit: props.isEdit === 'true' ? true : false
        }
    }

    render() {
        return (
            <div className="modal-container create-group-modal z-50 p-3 drop-shadow-lg rounded-md absolute left-25 top-5 mt-2 table w-[150px] md:w-[150px]">
                <div className="create-group-container">
                    <div className="modal-header">
                        <h2 hidden={this.state.isEdit} className="left">Create a new group</h2>
                        <h2 hidden={!this.state.isEdit} className="left">Edit group</h2>
                    </div>
                    <div className="modal-body">
                        <input value={this.state.newGroupName} onChange={evt => this.updateGroupNameValue(evt)} type="text" placeholder="Group name" />
                    </div>
                    <div className="modal-footer flex">
                        <button onClick={this.cancel} className="failure-button">Cancel</button>
                        <button onClick={this.submitGroup} className="success-button">Save</button>
                    </div>
                </div>
            </div>
        );
    }

    // On group name change, update the state.
    updateGroupNameValue(evt) {
        this.setState({
            newGroupName: evt.target.value
        });
    }

    // Submit Add/edit group.
    async submitGroup(props) {
        if (this.state.newGroupName.length === 0) {
            return;
        }
        if (props.isEdit) {
            await updateGroup(this.state.group?._id, this.state.newGroupName);
        } else {
            await createGroup(this.state.currentUser._id, this.state.newGroupName);
        }
        this.setState({
            newGroupName: ''
        });
        props.closeModal();
    }

    // Cancel Add/edit group.
    cancel(props) {
        this.setState({
            newGroupName: ''
        });
        props.closeModal();
    }
}

export default AddEditGroup;