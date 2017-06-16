import { ShmccOperatePage } from './app.po';

describe('shmcc-operate App', () => {
  let page: ShmccOperatePage;

  beforeEach(() => {
    page = new ShmccOperatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
