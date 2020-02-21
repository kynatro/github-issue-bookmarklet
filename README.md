# Github Issue Bookmarklet

Easily submit Github Issues with context to a Github repo of your choice with a simple bookmarklet overlay.

This script is entirely self-contained within a bookmarklet and loads no external files. It creates a simple form overlay on the webpage being viewed that submits to create a new issue in Github for the code repository given at build time.

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

## Generate the bookmarklet

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
