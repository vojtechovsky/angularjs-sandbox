describe('Finance: ', function(){
    beforeEach(function(){
        browser.get('http://localhost:63493/index.html');

      browser.waitForAngular();
    });

      it('Is on the finance page', function() {
          var firstGauge = element(by.id('returnOnSales'));

          var firstGaugeCss = firstGauge.getAttribute('class');
          expect(firstGaugeCss.toMatch('dx-visibility-change-handler'));
      });

      it('Should be on url', function() {
          expect(browser.getCurrentUrl()).toMatch('http://localhost:63493/index.html#/finance');
      });

      //it('Should navigate to the details page', function(){
      //  var header = element(by.binding('name'));

      //  expect(header.getText()).toMatch('Jazz On The Green');
      //});

      //it('Should update the url', function(){
      //  expect(browser.getCurrentUrl()).toMatch('EventRatings/');
      //});
});
