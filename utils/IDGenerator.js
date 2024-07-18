const generateCertificateID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._";

  // Length of the certificate ID
  const idLength = 10;
  let certID = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    certID += characters[randomIndex];
  }

  return certID;
};

export default generateCertificateID;
