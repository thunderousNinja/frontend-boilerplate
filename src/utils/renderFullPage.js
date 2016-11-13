export default function renderFullPage(html, initialState, css, javascriptAssets, styles) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>godric</title>
        ${Object.keys(styles).map((style, key) => {
          return `<link href="${styles[style]}" key="${key}" media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>`;
        })}
        <style>${css.join('')}</style>
      </head>
      <body>
        <div id='appMount'>${html}</div>
        ${Object.keys(javascriptAssets).reverse().map((asset) => {
          return `<script src='${javascriptAssets[asset]}'></script>`;
        }).join('\n')}
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
      </body>
    </html>
  `
}
