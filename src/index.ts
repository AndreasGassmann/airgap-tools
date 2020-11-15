import { TezosKtProtocol, TezosProtocol } from 'airgap-coin-lib'

import { mnemonics } from '../mnemonics'

const tezosProtocol = new TezosProtocol()
const ktProtocol = new TezosKtProtocol()

const needle = ''

const checkIfNeedle = (address: string, context: string) => {
    if (address.toLocaleLowerCase() === needle.toLocaleLowerCase()) {
        console.log('---')
        console.log('---')
        console.log('---')
        console.log('MATCH', address, context)
        console.log('---')
        console.log('---')
        console.log('---')
    }
}

/**
 * Replace last occurrence of a string with another string
 * x - the initial string
 * y - string to replace
 * z - string that will replace
 */
function replaceLast(x, y, z){
    var a = x.split("");
    var length = y.length;
    if(x.lastIndexOf(y) != -1) {
        for(var i = x.lastIndexOf(y); i < x.lastIndexOf(y) + length; i++) {
            if(i == x.lastIndexOf(y)) {
                a[i] = z;
            }
            else {
                delete a[i];
            }
        }
    }

    return a.join("");
}

const getDerivationPathByIndex = (index: number): string[]  => {
    const path = "m/44h/1729h/0h/0h"

    return Array.from(new Set([path.replace('0', index.toString()), replaceLast(path, '0', index)]))
}

const getAddressAndBalance = async (mnemonic: string, index: 0) => {
    // 
    for(let i = 0; i < 10; i++) {
        const paths = getDerivationPathByIndex(i)
        paths.forEach(async path => {
            const pubKey = await tezosProtocol.getPublicKeyFromMnemonic(mnemonic, path)
            const address = await tezosProtocol.getAddressFromPublicKey(pubKey)
            const ktAddresses = await ktProtocol.getAddressesFromPublicKey(pubKey)
            console.log(ktAddresses)
            const balance = 0 // await tezosProtocol.getBalanceOfAddresses([address])
            
            console.log(address, path, mnemonic.split(' ')[0], balance)
            checkIfNeedle(address, path + mnemonic.split(' ')[0])
        })
    }
}

mnemonics.forEach(mnemonic => {
    getAddressAndBalance(mnemonic, 0)
})