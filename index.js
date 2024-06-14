import inquirer from 'inquirer';
import qrcode from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Type in your URL:',
      name: 'url',
    },
  ])
  .then((answers) => {
    const url = answers.url;

    // Generate QR code and save as PNG
    const qrSvg = qrcode.image(url, { type: 'png' });
    const qrStream = fs.createWriteStream('qr_img.png');
    qrSvg.pipe(qrStream);

    qrStream.on('finish', () => {
      console.log('QR code image saved as qr_img.png');
    });

    qrStream.on('error', (err) => {
      console.error('Error writing QR code image:', err);
    });

    // Save URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) {
        console.error('Error saving URL to file:', err);
      } else {
        console.log('The URL has been saved to URL.txt');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn’t be rendered in the current environment');
    } else {
      console.error('An error occurred:', error);
    }
  });
