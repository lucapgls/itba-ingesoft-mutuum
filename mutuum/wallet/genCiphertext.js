import Config from 'react-native-config';
import forge from 'node-forge';
import { ENTITY_SECRET, PUBLIC_KEY } from '@env';

function generateCiphertext() {
  const entitySecretHex = ENTITY_SECRET;
  const publicKeyPem = PUBLIC_KEY;

  const entitySecret = forge.util.hexToBytes(entitySecretHex);
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', { 
    md: forge.md.sha256.create(), 
    mgf1: { md: forge.md.sha256.create() } 
  });

  return forge.util.encode64(encryptedData);
}

export { generateCiphertext };