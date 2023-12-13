import React from "react";
import "./CommentTag.css";

function CommentTag(props) {
  const tagName = props.tagName;
  return (
    <>
      {/* <div className="tag-component">
        <a href={`/tag/${tagName}`} className="tag-component-name">
          {tagName}
        </a>
      </div> */}
      <div className="comment-tag-component">
        <p className="comment-tag-component-name">{tagName}</p>
      </div>
    </>
  );
}

export default CommentTag;
