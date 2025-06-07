'use strict';

import { changeModule } from "./module.js";
import { checkingAvailabilitySession } from "./requests.js";
import { applyBrowserColorTheme } from "./colorTheme.js";

async function launch() {
    applyBrowserColorTheme();

    if (await checkingAvailabilitySession()) {
        setTimeout(() => changeModule('account'), 1000);
    } else {
        setTimeout(() => changeModule('authorization'), 1000);
    }
}

launch();