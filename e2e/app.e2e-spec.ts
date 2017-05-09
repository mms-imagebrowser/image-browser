import {ImageBrowserPage} from './app.po';

describe('image-browser App', () => {
  let page: ImageBrowserPage;

  beforeEach(() => {
    page = new ImageBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
