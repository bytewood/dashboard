import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should be an app-dashboard', () => {
        page.navigateTo();
        expect(page.getComponentById('dashboard').getTagName()).toEqual("app-dashboard")
    });
});
