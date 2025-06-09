'use strict';

import { applyBrowserColorTheme } from "./colorTheme.js";
import { applyModule } from "./module.js";
import { checkingForUserSession } from "./requests.js";

function main() {
    applyBrowserColorTheme(); 
    setTimeout(async () => {
        if (await checkingForUserSession()) {
            applyModule('account');
        } else {
            applyModule('authorization');
        }
    }, 1000);
}

main();