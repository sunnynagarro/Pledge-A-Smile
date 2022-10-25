import React, { Component } from "react";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { RiCheckboxCircleFill } from "react-icons/ri";

// Constants
import {
  natureBgImages,
  architectureBgImages,
  allBgImages,
  petsBgImages,
} from "../../../constants/bgImages.js";

class AlbumImagesList extends Component {
  constructor(props) {
    super(props);

    let images = null;
    if (props.album.toLowerCase() === "all") {
      // All images.
      images = allBgImages;
    } else if (props.album.toLowerCase() === "nature") {
      // Nature images.
      images = natureBgImages;
    } else if (props.album.toLowerCase() === "architecture") {
      // Architecture images.
      images = architectureBgImages;
    } else if (props.album.toLowerCase() === "pets") {
      // Pets images.
      images = petsBgImages;
    }

    this.state = {
      currentUser: JSON.parse(localStorage.getItem("user")) || {},
      album: props.album,
      images: images,
      background: localStorage.getItem("background"),
    };
  }

  render() {
    return (
      <div className="background-images-container">
        <div className="album-header">
          <div className="album-back-button" onClick={() => this.goBack()}>
            <IoIosArrowBack /> <span>Back</span>
          </div>
          <div className="album-name">{this.state.album}</div>
          <div className="empty-right"></div>
        </div>
        <div className="tile-selection-list album-images-list">
          {this.state.images.map((image, i) => {
            return (
              <div key={i} className="bordered-container">
                <span
                  style={{ backgroundImage: "url(" + image.url + ")" }}
                  className="tile-list-image"
                ></span>
                <span
                  onClick={() => this.setImageAsBackground(image)}
                  className={
                    "select-album " +
                    (this.state.background === image.url ? "active" : "")
                  }
                >
                  <RiCheckboxCircleFill />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Set selected background image.
  setImageAsBackground(image) {
    localStorage.setItem("background", image.url);
    localStorage.removeItem("externalLink");

    // So that when the user opens up backgrounds propup again, the default opened view is albums.
    localStorage.setItem("backgroundType", "albums");

    // Set image in the state.
    this.setState({
      background: image.url,
    });

    this.props.changeBackground();
  }

  // Back to albums.
  goBack() {
    this.props.onBack();
  }
}

export default AlbumImagesList;
