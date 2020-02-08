import { environment } from "../../environments/environment";

export function dbg(data: any) {
    if (!environment.production) {
        console.debug(data);
    }
}
