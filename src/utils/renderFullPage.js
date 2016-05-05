export default function renderFullPage(html, initialState, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>frontend-boilerplate</title>
        <style>${css.join('')}</style>
      </head>
      <body>
        <div id='appMount'>${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src='/build/bundle.js''></script>
      </body>
    </html>
    `
}
