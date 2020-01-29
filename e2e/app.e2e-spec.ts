import { CRCSCUSTOMSPage } from './app.po';

describe('crcs-customs App', function() {
  let page: CRCSCUSTOMSPage;

  beforeEach(() => {
    page = new CRCSCUSTOMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
