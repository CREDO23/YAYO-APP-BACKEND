const genhtmlDoc = (user, header, body, img, link, footer) => {
  return new Promise((resolve) => {
    resolve(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body>
                    <div>
                        <h4>Hey ${user ? user : ''}!</h4>
                        <h2>${header ? header : ''}</h2>
                        <p>${body ? body : ''}</p>
                        <a href=${link ? link : ''}>${link ? link : ''}</a>
                        <img src=${img ? img : ''} alt="" />
                        <em>${footer ? footer : ''}</em>
                    </div>    
                </body>
                </html>`);
  });
};

module.exports = {
  genhtmlDoc,
};
