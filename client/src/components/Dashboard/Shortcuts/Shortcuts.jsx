import React, { Component } from "react";

import { createShortcut, getShortcuts, deleteShortcut, updateShortcut } from "../../../actions/shortcutsService";

// Icons
import { BsPlusLg } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

class Shortcuts extends Component {

    constructor(props) {
        super(props);

        // References to specific tags.
        this.wrapperRef = React.createRef();

        // This binding is necessary to make `this` work in the callback
        this.submitShortcut = this.submitShortcut.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        var shortcuts = JSON.parse(localStorage.getItem('shortcuts'));

        this.state = {
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            isOpen: false,
            activeClass: 'Backgrounds',
            openShortcutAddEditModal: false,
            shortcutName: '',
            shortcutUrl: '',
            shortcutId: null,
            shortcuts: shortcuts,
            openActionsModal: false,
            actionModalLeft: 0,
            actionModalTop: 0,
            activeShortcut: null
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        this.getShortcutsList();
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    async getShortcutsList() {
        let response = await getShortcuts(this.state.currentUser?._id);
        this.setState({
            shortcuts: response.data
        });
        localStorage.setItem("shortcuts", JSON.stringify(this.state.shortcuts));
    }

    async submitShortcut() {
        if (this.state.shortcutUrl.trim().length === 0 || this.state.shortcutName.trim().length === 0) {
            return;
        }

        var shortcutUrl = this.state.shortcutUrl.replace("https://", "").replace("http://", "");
        shortcutUrl = `https://${shortcutUrl}`;

        if (this.state.shortcutId != null) {
            await updateShortcut(this.state.shortcutName, shortcutUrl, this.state.shortcutId);
        }
        else {
            await createShortcut(this.state.shortcutName, shortcutUrl, this.state.currentUser?._id);
        }
        
        this.getShortcutsList();
        this.setState({
            openShortcutAddEditModal: false,
            shortcutName: '',
            shortcutUrl: '',
            shortcutId: null
        });
    }

    cancel() {
        this.setState({
            openShortcutAddEditModal: false
        });
    }

    // On shortcut name change, update the state.
    updateShortcutNameValue(evt) {
        this.setState({
            shortcutName: evt.target.value
        });
    }

    // On shortcut url change, update the state.
    updateShortcutUrlValue(evt) {
        this.setState({
            shortcutUrl: evt.target.value
        });
    }

    addEditModal() {
        return (
            <div
                className="modal-container shortcut-modal z-50 p-3 drop-shadow-lg rounded-md relative m-auto table w-[450px] md:w-[450px]"
            >
                <div className="modal-header">
                    {this.state.shortcutId && <h2 className="left text-l">Edit shortcut</h2> }
                    {!this.state.shortcutId && <h2 className="left text-l">Add shortcut</h2> }
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input value={this.state.shortcutName} onChange={evt => this.updateShortcutNameValue(evt)} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="My Website" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                            <input value={this.state.shortcutUrl} onChange={evt => this.updateShortcutUrlValue(evt)} type="text" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mywebsite.com" required />
                        </div>
                    </form>
                </div>
                <div className="modal-footer flex">
                    <button onClick={this.cancel} className="failure-button">Cancel</button>
                    <button onClick={this.submitShortcut} className="success-button">Save</button>
                </div>
            </div>
        );
    };

    // Show edit modal.
    editShortcut() {
        this.setState({
            openShortcutAddEditModal: true,
            openActionsModal: false,
            shortcutName: this.state.activeShortcut.name,
            shortcutUrl: this.state.activeShortcut.url,
            shortcutId: this.state.activeShortcut._id,
        });
    }

    // Remove shortcut
    async removeShortcut() {
        await deleteShortcut(this.state.activeShortcut._id);
        this.setState({
            openActionsModal: false,
            activeShortcut: null
        });
        this.getShortcutsList();
    }

    actionsModal() {
        return (
            <div
                ref={this.wrapperRef}
                className="modal-container shortcut-actions-modal z-50 drop-shadow-lg rounded-md relative table w-[120px] md:w-[120px]"
                style={{left: this.state.actionModalLeft, top: this.state.actionModalTop}}
            >
                <div className="modal-body">
                    <button onClick={() => this.editShortcut()}>Edit shortcut</button>
                    <button onClick={() => this.removeShortcut()}>Remove</button>
                </div>
            </div>
        );
    };

    // Add shortcut.
    addShortcut(e) {
        e.preventDefault();
        this.setState({ openShortcutAddEditModal: true, shortcutId: null, shortcutName: '', shortcutUrl: '' });
    }

    // Open actions modal.
    openActionsModal(e, shortcut) {
        e.preventDefault();
        this.setState({
            openActionsModal: true,
            activeShortcut: shortcut,
            actionModalLeft: e.clientX - 100,
            actionModalTop: e.clientY - 20
        });
    }

    render() {
        return (
            <div className="shortcuts-container">
                <div className="shortcuts">
                    <a key="amazonKey" className="shortcut-item" href="https://amzn.to/3YlDYtL">
                        <div className="shortcut-icon">
                            <img src={"https://www.google.com/s2/favicons?domain=amazon.in"} alt="Shortcut favicon" />
                        </div>
                        <div className="shortcut-title">
                            <small>Amazon</small>
                        </div>
                    </a>
                    {this.state.shortcuts?.map((shortcut, index) =>
                        <a key={index} className="shortcut-item" href={shortcut.url}>
                            <div className="more-actions" onClick={(e) => this.openActionsModal(e, shortcut)}>
                                <HiDotsVertical />
                            </div>
                            <div className="shortcut-icon">
                                <img src={"https://www.google.com/s2/favicons?domain=" + shortcut.url.replace("https://", "").replace("www.", "") + "&sz=24"} alt="Shortcut favicon" />
                            </div>
                            <div className="shortcut-title">
                                <small>{shortcut.name}</small>
                            </div>
                        </a>
                    )}
                    <button hidden={this.state.shortcuts?.length >= 9} href="#" className="shortcut-item add-shortcut-item" onClick={(e) => this.addShortcut(e)}>
                        <div className="shortcut-icon">
                            <BsPlusLg />
                        </div>
                        <div className="shortcut-title">
                            <small>Add shortcut</small>
                        </div>
                    </button>
                </div>
                {this.state.openActionsModal && this.actionsModal()}
                {this.state.openShortcutAddEditModal && this.addEditModal()}
            </div>
        );
    }

    // On outside click, close the modal.
    handleClickOutside(event) {
        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target) && !event.target.className.includes("more-actions")) {
            this.setState({ openActionsModal: false });
        }
    }
}

export default Shortcuts;
