import { Component } from "react";

// Api actions
import { fetchGroups } from "../../../actions/groupService";

import { BiChevronDown, BiDotsHorizontalRounded } from "react-icons/bi";
import GroupOptions from "./GroupOptions";

class GroupsList extends Component {

    constructor(props) {
        super(props);
        
        // This binding is necessary to make `this` work in the callback
        this.closeOtherModals = this.closeOtherModals.bind(this, props);
        let lastGroupsList = JSON.parse(localStorage.getItem('groupsList'));

        this.state = {
            groupsList: lastGroupsList,
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            groupOptionsOpen: false,
            group: null
        }
    }

    // API call to fetch groups.
    getMyGroups() {
        fetchGroups(this.state.currentUser._id).then(async (res) => {
            let groups = res.groups;
            this.setState({
                groupsList: groups,
            });
            localStorage.setItem('groupsList', JSON.stringify(groups));
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {});
    }

    // Get all groups when the component loads.
    componentDidMount() {
        this.getMyGroups();
    }

    // It will help reload Groups list when new group is created as we update State in its parent.
    componentDidUpdate(params) {
        if (params.updateList === true) {
            this.getMyGroups();
            params.listUpdated();
        }
    }

    render() {
        return (
            <div className="groups-container">
                <div className="groups-list">
                    {this.state.groupsList?.map((group, index) =>
                        <div key={group?.name + index.toString()} className="group">
                            <div className="header-row flex">
                                <div onClick={this.toggleGroupMembers.bind(this, group)} className="group-heading">
                                    <div className="group-icon">
                                        <BiChevronDown />
                                    </div>
                                    <div className="group-name">
                                        <span>{group?.name}</span>
                                        {/* <span id="group-name-edit" hidden={!group?.editGroupName}>
                                            <input type="text" value={group?.name} />
                                        </span> */}
                                    </div>
                                </div>
                                <div className="group-impact">
                                    <span onClick={this.toggleGroupOptions.bind(this, group)} className="group-options"><BiDotsHorizontalRounded /></span>
                                    <span>{group?.impact}</span>
                                </div>
                            </div>
                            <div hidden={group?.hiddenMembers}>
                                {group?.users?.map((child, index) =>
                                    <div key={child.name + index.toString()} className="group-list-row flex">
                                        <div className="member-name">
                                            {child.name}&nbsp;&nbsp;<span className="admin-tag" hidden={!child.isAdmin}>admin</span>
                                        </div>
                                        <div className="member-impact">
                                            {child.impact}
                                        </div>
                                    </div>
                                )}</div>
                            <hr className="group-horizontal-line" />
                        </div>
                    )}
                </div>
                {this.state.groupOptionsOpen && <GroupOptions close={(g) => this.toggleGroupOptions(g)} group={this.state.group} />}
            </div>
        );
    }

    // Open group options.
    toggleGroupOptions(group) {
        this.setState(prevState => ({
            groupOptionsOpen: !prevState.groupOptionsOpen,
            group: group
        }));
        this.closeOtherModals();
        this.getMyGroups();
    }

    // Toggle group members list.
    toggleGroupMembers(g) {
        let groups = this.state.groupsList;
        for (var group of groups) {
            if (group._id === g._id) {
                group.hiddenMembers = !group.hiddenMembers;
            }
        }
        this.setState({
            groupsList: groups
        });
    }

    closeOtherModals(props) {
        props.closeOtherModals();
    }
}

export default GroupsList;