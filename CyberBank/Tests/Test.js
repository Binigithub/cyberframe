describe('Word from book',function(){
    
    
    it('should get 100 words',()=>{
        browser.ignoreSynchronization=true;
        browser.get('https://www.google.com/');
        element(by.name('q')).sendKeys('words start with b end with e');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(3000);
        $$('.LC20lb').get(0).click();
        browser.sleep(3000);
        $$('#sortable-display tbody td:nth-child(1)>a').each(function(element,index){
            element.getText().then(function(result){
                console.log(index+1,result);
            })
        })

    })
})