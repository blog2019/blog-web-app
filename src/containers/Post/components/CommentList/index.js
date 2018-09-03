import React, { Component } from "react";
import CommentsView from "../CommentsView";
import "./style.css";

class CommentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  }

  handleClick = e => {
    const content  = this.state.value;
    if (content.length > 0) {
      this.props.onSubmit(this.state.value);
      this.setState({
        value: ''
      });
    } else {
      alert('Content is blank!');
    }
  }

  render() {
    const { comments, editable } = this.props;
    return (
      <div className="commentList">
        <div className="title">Comment</div>
        {editable ? (
          <div className="editor">
            <textarea
              name="content"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>提交</button>
          </div>
        ) : null}
        <CommentsView comments={comments} />
      </div>
    );
  }
};

export default CommentList;