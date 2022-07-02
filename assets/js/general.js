let clazz = 'active';
let proactivityLine;
let sections;

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

    console.log(location.hash);
    
    if(location.hash !== '')
        if(location.hash !== '#start')
            slideTo(location.hash);
        else
            startStart();

    proactivityLine = document.querySelector('#proactivity-line');

    setInterval(() => {
        proactivityLine.style.width = 98.0 + (Math.random() * 4) + '%';
    }, 50)

    function slideTo(id)
    {
        if(id.startsWith('#'))
            id = id.slice(1);

        if(id === 'start')
            startStart();

        sections.forEach(e => {
            
            if(e.id === id)
            {
                e.style.display = 'block';

                if(!e.classList.contains(clazz))
                    e.classList.add(clazz);
                
                return;
            }

            e.style.display = 'none';
            e.classList.remove(clazz);
        });
    }

    document.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => slideTo(e.target.hash)))
});