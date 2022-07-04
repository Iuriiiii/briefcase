let tecsStarted = false;

function tecsStart()
{
    
    if(tecsStarted)
        return;
        // console.log('tecsStart');
    // console.log(document.querySelectorAll('#tecs-images img'));
    [...document.querySelectorAll('.logos-center img')].order('left').eachTime(370, img => {
        img.classList.remove('hide');
    }, true);



    tecsStarted = true;
}

(events.tecs = events.tecs || []).push(tecsStart);