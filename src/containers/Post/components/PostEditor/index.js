import React, { Component } from "react";
import "./style.css";

class PostEditor extends Component {

  constructor(props) {
    super(props);
    const { post } = this.props;
    this.state = {
      title: (post && post.title) || '',
      content: (post && post.content) || ''
    }
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'title') {
      this.setState({
        title: value
      });
    } else if (name === 'content') {
      this.setState({
        content: value
      });
    } else {
    }
  }

  handleSubmit = (e) => {
    this.props.onSave({
      title: this.state.title,
      content: this.state.content
    });
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  render() {
    return (
      <div className='postEditor'>
        <input
          name="title"
          type="text"
          onChange={this.handleChange}
          value={this.state.title}
        />
        <textarea
          name="content"
          type="text"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <input
          type="button"
          value="Submit"
          onClick={this.handleSubmit}
        />
        <input
          type="button"
          value="Cancel"
          onClick={this.handleCancelClick}
        />
      </div>
    );
  };
};

export default PostEditor;