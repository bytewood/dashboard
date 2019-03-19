import { browser, by, element } from 'protractor';
import { ElementFinder } from "protractor";

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getComponentById(id): ElementFinder {
        return element(by.id(id));
    }
}
