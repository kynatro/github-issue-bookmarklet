(function() {
  var ns = `gib-${Math.random().toString(36).substr(2, 9)}`
  var githubRepoUrl = process.env.GITHUB_REPO_URL
  var dialogId = `${ns}-issue-report-dialog`
  var formId = `${ns}-issue-form`
  var stylesId = `${ns}-styles`
  var dialog = document.getElementById(dialogId)
  var form = document.getElementById(formId)
  var styles = document.getElementById(stylesId)

  var svgs = {
    close: `<svg role="img" aria-label="Close" viewBox="0 0 12 16" version="1.1" width="12" height="16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>`,
    github: `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>`
  }

  function createDialog() {
    var dialog = document.createElement('div')
    dialog.id = dialogId

    dialog.innerHTML = `
<div class="${ns}-header">
  <div class="${ns}-title">${svgs.github} Submit a new issue</div>
  <a href="#close" class="${ns}-close">${svgs.close}</a>
</div>
<form action="${githubRepoUrl}/issues/new" method="get" class="${ns}-form" id="${formId}" target="_blank">
  <div class="${ns}-form-row">
    <label for="${ns}-title">Title</label>
    <input type="text" id="${ns}-title" name="title" />
  </div>
  <div class="${ns}-form-row">
    <label for="${ns}-happened">What happened?</label>
    <textarea id="${ns}-happened" rows="4"></textarea>
  </div>
  <div class="${ns}-form-row">
    <label for="${ns}-expected">What did you expect to happen?</label>
    <textarea id="${ns}-expected" rows="4"></textarea>
  </div>
  <div class="${ns}-form-row">
    <label for="${ns}-reproduce">How do you reproduce this?</label>
    <textarea id="${ns}-reproduce" rows="4"></textarea>
  </div>
  <p><em>Paste in screenshots on the next screen...</em></p>
  <div class="${ns}-form-row">
    <button type="submit">Submit new issue</button>
    <input type="hidden" name="body" id="${ns}-body" />
  </div>
</form>`

    dialog.querySelector(`.${ns}-close`).addEventListener('click', function(event) {
      event.preventDefault()
      hideDialog()
    }, false)

    dialog.querySelectorAll(`.${ns}-form textarea`).forEach(function(textarea){
      textarea.addEventListener('keyup', function (event) {
        updateBody()
      }, false)
    })

    form = dialog.querySelector(`#${formId}`)
    form.addEventListener('submit', function(event) {
      // Add some delay to make sure the form isn't reset before submitting
      setTimeout(() => hideDialog(), 0)
    })

    return dialog
  }

  function createStyles() {
    var styles = document.createElement('style')
    styles.id = stylesId
    styles.type = 'text/css'
    styles.media = 'screen'

    styles.innerHTML = `
#${dialogId} {
  background-color: #ffffff;
  border: 1px solid #d1d5da;
  box-shadow: 0 3px 12px rgba(27,31,35,0.15);
  color: #586069;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 12px;
  min-width: 300px;
  opacity: 0;
  position: fixed;
  right: 15px;
  top: 15px;
  transform: translateY(-8px);
  transition: transform 350ms ease-in-out, opacity 350ms linear;
  z-index: 31337;
}

#${dialogId}.visible {
  opacity: 1;
  transform: translateY(0);
}

#${dialogId} * {
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 12px;
}

#${dialogId} .${ns}-header {
  align-items: center;
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  color: #586069;
  display: flex;
  flex-direction: row;
  height: 32px;
  justify-content: space-between;
  padding: 8px 10px;
}
#${dialogId} .${ns}-header svg {
  margin-right: 8px;
}

#${dialogId} .${ns}-header .${ns}-title {
  align-items: center;
  display: flex;
  flex-direction: row;
  font-weight: bold;
}

#${dialogId} form.${ns}-form {
  padding: 8px;
}

#${dialogId} form.${ns}-form .${ns}-form-row {
  margin-bottom: 8px;
}

#${dialogId} form.${ns}-form .${ns}-form-row label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

#${dialogId} form.${ns}-form .${ns}-form-row input[type="text"],
#${dialogId} form.${ns}-form .${ns}-form-row textarea {
  background-color: #fafbfc;
  border-radius: 3px;
  border: 1px solid #d1d5da;
  box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
  color: #24292e;
  padding: 6px 8px;
  vertical-align: middle;
  width: 100%;
}

#${dialogId} form.${ns}-form .${ns}-form-row input[type="text"]:focus,
#${dialogId} form.${ns}-form .${ns}-form-row textarea:focus {
  background-color: #ffffff;
}

#${dialogId} form.${ns}-form button[type="submit"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #28a745;
  border-radius: 3px;
  border: 1px solid rgba(21,31,35,0.2);
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 20px;
  padding: 6px 12px;
  text-transform: none;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
}
#${dialogId} form.${ns}-form button[type="submit"]:hover {
  background-color: #269f42;
  border-color: rgba(27,31,35,0.5);
}
#${dialogId} form.${ns}-form button[type="submit"]:active {
  background-color: #279f43;
  border-color: rgba(27,31,35,0.5);
}`

    return styles
  }

  function hideDialog() {
    dialog.classList.remove('visible')
    form.reset()
  }

  function showDialog() {
    dialog.classList.add('visible')
  }

  function updateBody() {
    var body = `**URL:** [${window.location.href}](${window.location.href})\n**User Agent:** ${navigator.userAgent}`;
    var form = dialog.querySelector(`form.${ns}-form`);

    for(var elIndex in form.elements) {
      var el = form.elements[elIndex]

      if (el.nodeName === 'TEXTAREA') {
        var label = form.querySelector(`label[for="${el.id}"]`)
        body = `${body}\n\n### ${label.textContent}\n\n${el.value || '_No information provided_'}`
      }
    }

    body = `${body}\n\n### Supporting Screenshots`

    dialog.querySelector(`#${ns}-body`).value = body
  }

  if (!styles) {
    styles = createStyles()
    document.head.append(styles)
  }

  if (!dialog) {
    dialog = createDialog()
    document.body.appendChild(dialog)
  }

  window.setTimeout(function() {
    showDialog()
  }, 0)
})()
