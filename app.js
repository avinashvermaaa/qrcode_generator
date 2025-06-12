document.getElementById('qrForm').addEventListener('submit', function (event) {
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

    // Show the download button
    const downloadContainer = document.getElementById('qrCodeContainer');
    downloadContainer.style.display = 'block';

    // Create the "Download QR Code" button click event
    document.getElementById('downloadBtn').addEventListener('click', function () {
      const downloadLink = document.createElement('a');
      downloadLink.href = qrCodeDataURL;
      downloadLink.download = filename ? `${filename}.png` : 'qr_code.png';
      downloadLink.click(); // Automatically triggers the download
    });
  });
});
