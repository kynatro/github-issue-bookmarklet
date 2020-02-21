# Github Issue Bookmarklet

Easily submit Github Issues with context to a Github repo of your choice with a simple bookmarklet overlay.

This script is entirely self-contained within a bookmarklet and loads no external files. It creates a simple form overlay on the webpage being viewed that submits to create a new issue in Github for the code repository given at build time.

## Accessing the web-based bookmarklet generator

Access the web-based bookmarklet generator at https://kynatro.github.io/github-issue-bookmarklet. You can type in a _GitHub Project URL_ and _Bookmarklet Label_ and drag the resulting bookmarklet to your bookmark or favorites bar.

### Supply values via query parameters

You can easily link a pre-configured bookmarklet to other users or browsers by supplying the _GitHub Project URL_ and _Bookmarklet Label_ via query parameters.

Parameter | Description
------------|-------------
`gitHubProjectUrl` | The full URL to the project on GitHub
`bookmarkletLabel` | The label you want on the bookmarklet after you have dragged it to your Bookmark bar

**Example URL:**
https://kynatro.github.io/github-issue-bookmarklet/?gitHubProjectUrl=https://kynatro.github.io/github-issue-bookmarklet&bookmarkletLabel=New%20Issue

## Developing locally

### Start local server

You can boot up the React powered client-side server to generate the bookmarklet in a browser window. This is what is available at https://github.com/pages/kynatro/github-issue-bookmarklet.

```sh
$> npm start
```

### Deploy to GitHub pages

Deploy the built site to GitHub pages by running:

```sh
$> npm run deploy
```

## CLI bookmarklet URL generation

To build the bookmarklet, you must specify the Github repo URL with the `GITHUB_REPO_URL` environment variable. You can do this by either specifying it inline or via a local `.env` file:

```sh
# Full URL to the web UI of your Github repository
GITHUB_REPO_URL=https://github.com/kynatro/github-issue-bookmarklet
```

or by prefixing the bookmarklet command:

```sh
$> GITHUB_REPO_URL=https://github.com/kynatro/github-issue-bookmarklet npm run build:bookmarklet
```

This script will generate a new bookmarklet `javascript:()` URL and copy it to your clipboard (Mac only).
