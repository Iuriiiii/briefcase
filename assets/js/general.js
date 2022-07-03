let clazz = 'active', proactivityLine, sections, events = [];

function callAt(time, callback)
{
    if(typeof time !== 'object' || typeof callback !== 'function')
        return;
        
    Object.entries(time).forEach(([key, value]) => {
        let time = Number(key);

        if(time === NaN)
            return;
        
        if(typeof value === 'object')
            value.forEach(v => setTimeout(callback, time, v));
        else
            setTimeout(callback, time, value);
    });
}

(() =>{
    console.log('Plz dont put paste & run code here...\nyou could vulnerate your personal information');
})();


window.addEventListener('load', () => {
    sections = [...document.querySelectorAll('section')];

    // console.log(location.hash);
    
    if(['', '#start'].includes(location.hash))
        startStart();
    else
        slideTo(location.hash);

    proactivityLine = document.querySelector('#proactivity-line');

    setInterval(() => {
        proactivityLine.style.width = 98.0 + (Math.random() * 4) + '%';
    }, 50)

    function slideTo(id)
    {
        if(id.startsWith('#'))
            id = id.slice(1);

        // if(id === 'start')
        //     startStart();

        sections.forEach(e => {
            
            if(e.id === id)
            {
                if(!e.classList.contains(clazz))
                    e.classList.add(clazz);
                
                if(events[id])
                    events[id].forEach(c => c());

                return;
            }

            // e.style.display = 'none';
            e.classList.remove(clazz);
        });
    }

    document.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => slideTo(e.target.hash)))
});