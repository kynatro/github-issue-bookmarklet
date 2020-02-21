import React from 'react';
import GenerateForm from './GenerateForm';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <h1>GitHub Issue Bookmarklet</h1>
        <p>Generate a bookmarklet to create formatted issues in GitHub with context. The bookmarklet will display an overlay on the page with a form to fill out details regarding the issue. Submitting the overlay form will take the information and bring you to a new issue on your Github project with added context of the user's UserAgent and URL reported from.</p>
      </header>

      <GenerateForm />
    </div>
  );
}

export default App;
