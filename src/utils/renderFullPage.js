export default function renderFullPage(html, initialState, css, javascriptPath, styles) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>frontend-boilerplate</title>
        ${Object.keys(styles).map((style, key) => {
          return `<link href="${styles[style]}" key="${key}" media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>`;
        })}
        <style>${css.join('')}</style>
      </head>
      <body>
        <div id='appMount'>${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src='${javascriptPath}'></script>
      </body>
    </html>
    `
}
