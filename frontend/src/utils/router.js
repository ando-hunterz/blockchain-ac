import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from '../routes/route'
import { useCrypto } from '../stores/crypto'
import { hasAdminRole, isRouteFromBase } from './router-helper'
import { checkForProvider, connectProvider, isAccountConnected } from './web3'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to) => {
    const crypto = useCrypto();
    if(crypto.provider == null || crypto.signer == null || crypto.contract == null ) {
        const provider = checkForProvider()
        if(!provider && !isRouteFromBase(router)) router.push('/');
        if(crypto.signer == null && isAccountConnected()) await connectProvider(crypto)
    }
    if(to.name == "login") return
})

export default router;
