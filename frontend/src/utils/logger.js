import axios from 'axios'


const createAccount = async () => {
    try{
        const result = await axios.post(import.meta.env.VITE_LOGGER_ADDR+'/CreateAccount.frontend', {"status": "Begin Account Creation"})    
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}

const accountCreated = async () => {
    try{
        const result = await axios.post(import.meta.env.VITE_LOGGER_ADDR+'/CreateAccount.frontend', {"status": "Account Created"})    
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}


const qrGeneration = async () => {
    try{
        const result = await axios.post(import.meta.env.VITE_LOGGER_ADDR+'/qrGen.frontend', {"status": "Start qr generation"})    
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}

const qrGenerated = async () => {
    try{
        const result = await axios.post(import.meta.env.VITE_LOGGER_ADDR+'/qrGen.frontend', {"status": "qr code generated"})    
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}

export { createAccount, accountCreated, qrGeneration, qrGenerated}