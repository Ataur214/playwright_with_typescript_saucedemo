export async function GetRandomNumber():Promise<number> {
    return Math.floor(Math.random()*1000);
}