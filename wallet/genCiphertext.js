require('dotenv').config();
const forge = require('node-forge');

function generateCiphertext() {
    const entitySecretHex = process.env.ENTITY_SECRET;
    const publicKeyPem = process.env.PUBLIC_KEY;

  const entitySecret = forge.util.hexToBytes(entitySecretHex);
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', { 
    md: forge.md.sha256.create(), 
    mgf1: { md: forge.md.sha256.create() } 
  });

  return forge.util.encode64(encryptedData);
}

module.exports = { generateCiphertext };