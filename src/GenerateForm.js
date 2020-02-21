import React, { Component, Fragment } from 'react';
import { transform } from '@babel/core';

class GenerateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codeSnippet: '',
      bookmarkletLabel: 'New Issue',
      gitHubProjectUrl: 'https://github.com/kynatro/github-issue-bookmarklet'
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.state.gitHubProjectUrl !== prevState.gitHubProjectUrl) {
      this.setState({
        codeSnippet: ''
      });
    }
  }

  createCodeSnippetButton = () => {
    const { codeSnippet, bookmarkletLabel } = this.state;

    return {
      __html: `<a class="bookmarklet" href='${codeSnippet}'>${bookmarkletLabel}</a>`
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target

    this.setState({
      [id]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { gitHubProjectUrl } = this.state;

    fetch('bookmarklet.js')
      .then((response) => {
        if(!response.ok) {
          throw Error("Failed to Fetch Markdown");
        }
        return response.text()
      })
      .then((result) => {
        let inputSrc = result.replace(/process\.env\.GITHUB_REPO_URL/g, '"' + gitHubProjectUrl + '"');

        new Promise((resolve, reject) => {
          transform(inputSrc, {
            overrides: [{
              compact: true
            }],
            comments: false,
            minified: true
          }, (err, result) => {
            if (err) {
              reject(err);
            }

            resolve(`javascript:(${result.code.replace(/;$/, ')')}`);
          });
        })
        .then((result) => {
          this.setState({
            codeSnippet: result
          });
        })
        .catch((err) => {
          console.error(err);
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { bookmarkletLabel, codeSnippet, gitHubProjectUrl } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <p>
              <label htmlFor="gitHubProjectUrl">Github Project URL:</label>
              <input
                id="gitHubProjectUrl"
                value={gitHubProjectUrl}
                onChange={this.handleInputChange}
                type="url"
              />
            </p>

            <p>
              <label htmlFor="bookmarkletLabel">Bookmarklet Label:</label>
              <input
                id="bookmarkletLabel"
                value={bookmarkletLabel}
                onChange={this.handleInputChange}
                type="text"
              />
            </p>

            <input type="submit" value="Generate Bookmarklet" />
          </fieldset>
        </form>

        {codeSnippet && (
          <section>
            <p dangerouslySetInnerHTML={this.createCodeSnippetButton()}></p>
            <p>Drag this button to your bookmark bar</p>
          </section>
        )}
      </Fragment>
    );
  }
};

export default GenerateForm;
