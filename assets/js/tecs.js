let tecsStarted = false;

function tecsStart()
{
    if(tecsStarted)
        return;
    
    setTimeout(() => {
        [...document.querySelectorAll('.logos img')].order('<>').eachTime(370, (img, idx) => {
            img.classList.add('fade');
            img.classList.remove('hide');
        }, true);
    }, 500);
    

    tecsStarted = true;
}

(events.tecs = events.tecs || []).push(tecsStart);