import React, { Component } from "react";
import { getFormatDate } from "../../../../utils/date";
import "./style.css";

class CommentsView extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="commentsView">
        {comments.map(item => {
          return (
            <li key={item.id}>
              <div>{item.content}</div>
              <div className="sub">
                <span>{item.author.username}</span>
                <span>.</span>
                <span>{getFormatDate(item.updatedAt)}</span>
              </div>
            </li>
          );
        })}
      </div>
    );
  };
}

export default CommentsView;