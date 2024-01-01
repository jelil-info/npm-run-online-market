export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <meta name="Keywords" content="suok, The online market for all products"/>
          <meta name="author" content="Oyekanmi Oyetunji"/>
          <meta name="refresh" content="30"/>
          <title>Online Market</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none
              }
          </style>
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
          <script type="text/javascript" src="/dist/bundle.js"></script>
          <script src="https://kit.fontawesome.com/40c559f4dd.js"></script>
        </body>
      </html>`
}

/*export default () => {
  return `<!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <title>MERN Skeleton</title>
  </head>
  <body>
  <div id="root">Hello World</div>
  </body>
  </html>`
  }*/
  
