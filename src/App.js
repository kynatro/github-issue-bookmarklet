import React, { Component } from 'react';
import GenerateForm from './GenerateForm';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    const params = window.location.search.substr(1)
      .split('&')
      .map(param => param.split('='))
      .reduce((obj, param) => ({
        ...obj,
        [param[0]]: param[1]
      }), {});

    this.state = {
      bookmarkletLabel: params.bookmarkletLabel || 'New Issue',
      gitHubProjectUrl: params.gitHubProjectUrl || 'https://github.com/kynatro/github-issue-bookmarklet'
    }
  }

  render() {
    const { bookmarkletLabel, gitHubProjectUrl } = this.state;

    return (
      <div className="App">
        <header>
          <h1>GitHub Issue Bookmarklet</h1>
          <p>Generate a bookmarklet to create formatted issues in GitHub with context. The bookmarklet will display an overlay on the page with a form to fill out details regarding the issue. Submitting the overlay form will take the information and bring you to a new issue on your Github project with added context of the user's UserAgent and URL reported from.</p>
        </header>

        <GenerateForm
          bookmarkletLabel={bookmarkletLabel}
          gitHubProjectUrl={gitHubProjectUrl}
        />
      </div>
    );
  }
}

export default App;
