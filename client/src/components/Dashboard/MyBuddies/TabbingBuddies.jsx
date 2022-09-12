import React, { Component } from "react";

// Icons
import { ImArrowUp } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";

// Api actions
import { buddiesImpact } from "../../../actions/groupService";

import AddEditGroup from "./AddEditGroup";
import GroupsList from "./GroupsList";
import InviteBuddies from "./InviteBuddies";

class TabbingBuddies extends Component {

    constructor(props) {
        super(props);

        // References to specific tags.
        this.wrapperRef = React.createRef();

        // This binding is necessary to make `this` work in the callback
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleBuddiesModal = this.toggleBuddiesModal.bind(this);
        this.toggleCreateGroupModal = this.toggleCreateGroupModal.bind(this);
        this.closeOtherModals = this.closeOtherModals.bind(this);
        this.groupsListUpdated = this.groupsListUpdated.bind(this);
        
        this.state = {
            isBuddiesModalOpen: false,
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            isCreateGroupModalOpen: false,
            inviting: false,
            totalImpact: '',
            updateGroupsList: false // Change it to true when we wannt to update the Groups list.
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        this.getBuddiesImpact();
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // Groups list has been updated.
    groupsListUpdated() {
        this.setState({
            updateGroupsList: false
        });
    }

    render() {
        return (
            <div className="header-button-container">
                <button className="header-button tabbing-buddies-button rounded-full bg-white" onClick={this.toggleBuddiesModal}>
                    My Buddies &nbsp;&nbsp;{this.state.totalImpact}
                </button>
                {this.state.isBuddiesModalOpen && this.tabbingBuddiesModal()}
            </div>
        );
    }

    // Get overall buddies impact.
    async getBuddiesImpact() {
        let response = await buddiesImpact(this.state.currentUser?._id);
        this.setState({
            totalImpact: response.totalImpact
        });
    }

    // Tabbing buddies modal.
    tabbingBuddiesModal() {
        return (
            <div
                ref={this.wrapperRef}
                className="modal-container z-50 p-3 drop-shadow-lg rounded-md relative left-5 mt-2 table w-[250px] md:w-[250px]"
            >
                <ImArrowUp className="top-arrow-left" />
                <div className="modal-header buddies-modal-header flex">
                    <h2 className="left text-l">Your Leaderboard</h2>
                    <div className="new-group-button">
                        <AiOutlinePlusCircle onClick={this.toggleCreateGroupModal} />
                    </div>
                </div>
                <GroupsList updateList={this.state.updateGroupsList} listUpdated={this.groupsListUpdated} closeOtherModals={this.closeOtherModals} />
                {/* <div className="modal-footer">
                    <button onClick={() => this.setState(old => ({ inviting: !old.inviting, isCreateGroupModalOpen: false }))} className="success-button">Invite Buddies</button>
                </div> */}
                {this.state.isCreateGroupModalOpen && <AddEditGroup closeModal={this.toggleCreateGroupModal} />}
                {this.state.inviting && <InviteBuddies inviteUrl={"https://tab.pledgeasmile.com/login?referralId=" + this.state.currentUser.referralId} />}
            </div>
        );
    };

    // Toggle buddies modal.
    toggleBuddiesModal() {
        this.setState(prevState => ({ isBuddiesModalOpen: !prevState.isBuddiesModalOpen, isCreateGroupModalOpen: false }));
    };

    // Show create group modal.
    toggleCreateGroupModal() {
        this.setState(prevState => ({ isCreateGroupModalOpen: !prevState.isCreateGroupModalOpen, updateGroupsList: true, inviting: false }));
    }

    // Close all other modals when sub modals need to open.
    closeOtherModals() {
        if (this.state.isCreateGroupModalOpen || this.state.inviting) {
            this.setState({ isCreateGroupModalOpen: false, inviting: false });
        }
    }

    // On outside click, close the modal.
    handleClickOutside(event) {
        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target) && !event.target.className.includes("tabbing-buddies-button")) {
            this.setState({ isBuddiesModalOpen: false });
        }
    }
}

export default TabbingBuddies;
