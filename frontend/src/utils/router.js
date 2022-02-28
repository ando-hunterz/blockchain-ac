import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from '../routes/route'
import { useCrypto } from '../stores/crypto'
import { getCookie } from './cookies'
import {  isRouteFromBase } from './router-helper'
import { checkForProvider, connectToBlockchain} from './web3'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to) => {
    const crypto = useCrypto();
    if(crypto.provider == null || crypto.signer == null || crypto.contract == null ) {
        const provider = checkForProvider()
        if(!provider && !isRouteFromBase(router)) router.push('/');
        console.log(getCookie('crypto') === 'true')
        if(getCookie('crypto') === 'true') await connectToBlockchain(crypto)
    }
    if(to.name == "login") return
})

export default router;
