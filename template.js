export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
          
          <script type="text/javascript" src="/dist/bundle.js"></script>
          <script src="https://checkout.flutterwave.com/v3.js"></script>
          <script type="text/javascript" src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
          
        
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
  
