import React, { Component } from "react";

// Icons
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";

import AlbumImagesList from "./AlbumImagesList";

class Backgrounds extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            backgroundType: localStorage.getItem("backgroundType") ?? 'albums',
            album: null,
            background: localStorage.getItem('background'),
            externalLink: localStorage.getItem('externalLink') ?? '',
        }
    }

    render() {
        return (
            <div className="backgrounds-container">
                <header>
                    <h3>Backgrounds</h3>
                    <p className="description">Choose the set of images as per your mood. When you choose an album, the images will change every midnight. If you choose an image, it will be static.</p>
                </header>
                <div className="body">
                    <div className="tile-selection-list">
                        <div onClick={() => this.setState({backgroundType: 'albums', album: null})} className={"bordered-container " + (this.state.backgroundType === 'albums' ? 'active' : '')}>
                            <div><BiPhotoAlbum />
                            <p>Albums</p></div>
                        </div>
                        <div onClick={() => this.setState({backgroundType: 'external'})} className={"bordered-container " + (this.state.backgroundType === 'external' ? 'active' : '')}>
                            <div><AiOutlineLink />
                            <p>External Link</p></div>
                        </div>
                    </div>
                    <div className="albums-list-container" hidden={this.state.backgroundType !== 'albums' || this.state.album !== null}>
                        <div className="tile-selection-list">
                            <div className="bordered-container" onClick={() => this.setState({album: 'All'})}>
                                <span className="tile-list-image all-images-thumbnail"></span>
                                <span onClick={() => this.setAlbumAsBackground('All')} className={'select-album ' + (this.state.background === 'All' ? 'active' : '')}><RiCheckboxCircleFill /></span>
                                <span className="tile-list-title">All</span>
                            </div>
                            <div className="bordered-container" onClick={() => this.setState({album: 'Nature'})}>
                                <span className="tile-list-image nature-images-thumbnail"></span>
                                <span onClick={() => this.setAlbumAsBackground('Nature')} className={'select-album ' + (this.state.background === 'Nature' ? 'active' : '')}><RiCheckboxCircleFill /></span>
                                <span className="tile-list-title">Nature</span>
                            </div>
                            <div className="bordered-container" onClick={() => this.setState({album: 'Architecture'})}>
                                <span className="tile-list-image architecture-images-thumbnail"></span>
                                <span onClick={() => this.setAlbumAsBackground('Architecture')} className={'select-album ' + (this.state.background === 'Architecture' ? 'active' : '')}><RiCheckboxCircleFill /></span>
                                <span className="tile-list-title">Architecture</span>
                            </div>
                        </div>
                    </div>
                    {this.state.album !== null && this.state.backgroundType === 'albums'  && <AlbumImagesList album={this.state.album} onBack={this.closeAlbum.bind(this)} changeBackground={() => this.onBackgroundChange()} />}
                    {this.state.backgroundType === 'external' && this.getExternalUrlHtml() }
                </div>
            </div>
        );
    }

    // Set background.
    setAlbumAsBackground(albumName) {
        localStorage.setItem('background', albumName);
        localStorage.setItem('backgroundType', 'albums');
        localStorage.removeItem('externalLink');
        this.setState({
            background: albumName,
            backgroundType: 'albums',
            externalLink: ''
        });

        this.props.changeBackground();
    }

    getExternalUrlHtml() {
        return (
            <div className="external-link-container">
                <input className="external-link-input" value={this.state.externalLink} onChange={(e) => this.linkChanged(e)} type="text" placeholder="Paste your image address here" />
                <div className="help-section">
                    <p>Need Help?</p>
                    <button onClick={() => this.viewDemoImage()}>Checkout "how to" image.</button>
                </div>
                <button className="submit" onClick={() => this.changeToCustomBackground()}>Save</button>
            </div>
        );
    }

    // Open demo image for external image.
    viewDemoImage() {
        window.open(require("../../../assets/Image address.png"));
    }

    // Link changed event.
    linkChanged(e) {
        this.setState({
            externalLink: e.target.value
        });
    }

    // Change image to custom background.
    changeToCustomBackground() {
        localStorage.setItem('externalLink', this.state.externalLink);
        localStorage.setItem('backgroundType', 'external');
        localStorage.setItem('background', this.state.externalLink);
        this.setState({
            background: this.state.externalLink,
            backgroundType: 'external',
        });
        this.onBackgroundChange();
    }

    // When background changes.
    onBackgroundChange() {
        this.props.changeBackground();
    }

    // Close album
    closeAlbum() {
        this.setState({
            album: null,
            background: localStorage.getItem('background')
        });
    }
}

export default Backgrounds;
