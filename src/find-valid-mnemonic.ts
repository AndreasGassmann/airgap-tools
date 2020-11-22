import * as bip39 from 'bip39';

export function findValidMnemonicPermutations(mnemonic: string, level: number = 1): string[] {
  const validPermutations: string[] = [];

  const arr = mnemonic.split(' ');

  for (let x = 0; x < arr.length; x++) {
    const temp = arr[x];
    const remainingLength = arr.length - x;
    for (let y = 0; y < remainingLength; y++) {
      const m = [...arr];
      m[x] = m[y];
      m[y] = temp;

      const newMnemonic = m.join(' ');

      if (bip39.validateMnemonic(newMnemonic)) {
        validPermutations.push(newMnemonic);
      } else {
        if (level > 1) {
          const sub = findValidMnemonicPermutations(newMnemonic, level - 1);
          validPermutations.push(...sub);
        }
      }
    }
  }

  return validPermutations;
}
