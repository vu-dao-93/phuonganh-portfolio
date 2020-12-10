import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";
import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import video from "netlify-cms-editor-component-video";
import "./webfonts.css";

CMS.registerEditorComponent(video);
CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerEditorComponent({
  // Internal id of the component
  id: "youtube",
  // Visible label
  label: "Youtube",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "id", label: "Youtube Video ID", widget: "string" },
    { name: "width", label: "Width", widget: "string" },
    { name: "height", label: "Height", widget: "string" },
    { name: "fullScreen", label: "Allow Full Screen", widget: "boolean" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<iframe width="(\d+(?:%|rem|em|vh|vw)?)" height="(\d+(?:%|rem|em|vh|vw)?)" src="https:\/\/www.youtube.com\/embed\/(\S+)" frameborder="0" (allowfullscreen)?><\/iframe>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      width: match[1],
      height: match[2],
      id: match[3],
      fullScreen: match[4],
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return `<iframe width="${obj.width}" height="${
      obj.height
    }" src="https://www.youtube.com/embed/${obj.id}" frameborder="0" ${
      obj.fullScreen ? "allowfullscreen" : ""
    }></iframe>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return (
      '<img src="http://img.youtube.com/vi/' +
      obj.id +
      '/maxresdefault.jpg" alt="Youtube Video"/>'
    );
  },
});
CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
