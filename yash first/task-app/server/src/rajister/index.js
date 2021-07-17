import {sign} from "jsonwebtoken";
import {pick} from "lodash";
import {SECRET} from  "../config";


const issueToken = async(user) => {
    const { _id } = user
    let token = sign({ _id},SECRET,{expiresIn:'30d'})
    return `Bearer ${token}`

}

export { issueToken }
