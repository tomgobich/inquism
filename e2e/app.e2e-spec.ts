import { InquismPage } from './app.po';

describe('inquism App', function() {
  let page: InquismPage;

  beforeEach(() => {
    page = new InquismPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
