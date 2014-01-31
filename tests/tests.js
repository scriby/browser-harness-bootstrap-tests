var asyncblock = require('asyncblock');
if( asyncblock.enableTransform(module)) { return; }

var assert = require("assert");
var harness = require('browser-harness');

var _it = function(name, exec){
    it(name, function(done){
        asyncblock(exec, done);
    });
};

describe('', function(){
    var driver, testBrowser;

    before(function(done){
        harness.listen(4500, function(){
            harness.events.once('ready', function(_driver){
                driver = _driver;
                done();
            });

            testBrowser = new harness.Browser({ type: 'chrome' });
            testBrowser.open('http://localhost:8000/harness.html');
        });
    });

    it('Loads index.html', function(done){
        driver.setUrl('http://localhost:8000/index.html', done);
    });

    _it('Finds the h1 element', function(done){
        var h1 = driver.findVisible('.masthead h1');

        assert.equal(h1.length, 1);
        assert.equal(h1.html(), 'Bootstrap');
    });

    _it('Clicks Get Started', function(done){
        //Instead of this type of selector, you should generally prefer to select by class or id.
        driver.findVisible('a[href="./getting-started.html"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('/getting-started.html') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Finds the getting started heading', function(){
        var h1 = driver.findVisible('.subhead h1');
        assert.equal(h1.length, 1);
        assert.equal(h1.html(), 'Getting started');
    });

    _it('Clicks examples', function(){
        driver.findVisible('a[href="#examples"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('#examples') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Clicks on the basic marketing site example', function(){
        driver.findVisible('a.thumbnail[href="examples/hero.html"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('/hero.html') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Finds the Learn more button', function(){
        var button = driver.findVisible('a.btn-primary');
        assert(button.html().indexOf('Learn more') === 0);
    });

    _it('Goes back', function(){
        driver.exec(function(){ history.back(); });

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('#examples') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Clicks on base css', function(){
        driver.findVisible('a[href="./base-css.html"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('/base-css.html') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Fills in some form fields', function(){
        driver.findVisible('a[href="#forms"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('#forms') >= 0;
            },
            inBrowser: true
        });

        var bs = driver.findVisible('#forms .bs-docs-example:first');
        var text = bs.findVisible('input[type=text]');
        text.val('sample text');

        assert.equal(text.val(), 'sample text');

        var check = bs.findVisible('input[type=checkbox]');
        check.attr('checked', true);

        assert(check.attr('checked'));
    });

    _it('Clicks on javascript', function(){
        driver.findVisible('a[href="./javascript.html"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('/javascript.html') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Clicks on Modal', function(){
        driver.findVisible('a[href="#modals"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('#modals') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Launches the demo modal', function(){
        driver.findVisible('a[href="#myModal"]').click();

        var modal = driver.findVisible('#myModal');
        modal.findVisible('.modal-footer .btn[data-dismiss=modal]').click();

        //The close is animated, so need to wait for it
        driver.waitFor(function(){
            return driver.findElement('#myModal').css('display') === 'none';
        });
    });

    _it('Clicks on Collapse', function(){
        driver.findVisible('a[href="#collapse"]').click();

        driver.waitFor({
            condition: function(){
                return location.href.indexOf('#collapse') >= 0;
            },
            inBrowser: true
        });
    });

    _it('Expands an accordion', function(){
        assert.equal(driver.findElement('#collapseThree').height(), 0);

        driver.findVisible('#collapse .accordion-toggle:last').click();

        driver.waitFor(function(){
            return driver.findElement('#collapseOne').height() === 0;
        });

        assert(driver.findElement('#collapseThree').height() > 0);
    });

    after(function(){
        testBrowser.close();
    });
});
