import * as dotenv from 'dotenv'

dotenv.config({path:'.env'})

export class ENV_VAR{
    static USERNAME = process.env.USERNAME;
    static PASSWORD = process.env.PASSWORD;
    static BASEURL = process.env.BASEURL;

}