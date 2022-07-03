let tecsStarted = false;

function tecsStart()
{
    
    if(tecsStarted)
        return;
        console.log('tecsStart');
    // console.log(document.querySelectorAll('#tecs-images img'));
    [...document.querySelectorAll('#tecs-images img')].forEach(img => {
        console.log(img);
        img.classList.remove('hide');
    });



    tecsStarted = true;
}

(events.tecs = events.tecs || []).push(tecsStart);