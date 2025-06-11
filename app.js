document.getElementById('qrForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const url = document.getElementById('url').value;
  const filename = document.getElementById('filename').value;

  // Validate input
  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  // Generate QR code using the qrcode library
  QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, function (err, qrCodeDataURL) {
    if (err) {
      console.error(err);
      alert('There was an error generating the QR code.');
      return;
    }

    // Display QR code
    const qrImage = document.getElementById('qrCode');
    qrImage.style.display = 'block';
    qrImage.src = qrCodeDataURL;

    // Create the "Download QR Code" button
    const downloadContainer = document.createElement('div');
    downloadContainer.id = 'downloadContainer';

    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'downloadBtn';
    downloadBtn.textContent = 'Download QR Code';

    // Create a click event to download the QR code
    downloadBtn.addEventListener('click', function () {
      const downloadLink = document.createElement('a');
      downloadLink.href = qrCodeDataURL;
      downloadLink.download = filename ? `${filename}.png` : 'qr_code.png';
      downloadLink.click(); // Automatically triggers the download
    });

    downloadContainer.appendChild(downloadBtn);
    document.getElementById('qrCodeContainer').appendChild(downloadContainer);
  });
});
