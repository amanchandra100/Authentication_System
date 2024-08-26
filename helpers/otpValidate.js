export const oneMinExpiry = async(otpTime) => {
    try { 
        const cDateTime = new Date();
        var differValue = (otpTime - cDateTime.getTime())/1000;
        differValue/=60;
        
        if ( Math.abs(differValue) > 1 ) {
            return true;
        }
        return false;

    } catch (error) {
        console.log(error)
    }
}
export const fiveMinExpiry = async(otpTime) => {
    try { 
        const cDateTime = new Date();
        var differValue = (otpTime - cDateTime.getTime())/1000;
        differValue/=60;
        
        if ( Math.abs(differValue) > 5 ) {
            return true;
        }
        return false;

    } catch (error) {
        console.log(error)
    }
}

