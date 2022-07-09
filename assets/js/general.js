Array.prototype.random = function()
{
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.playRandom = function()
{
    new Audio(this.random()).play().catch(() => {});
};

String.prototype.contains = function(needle, position)
{
    if(typeof needle === 'object')
        return needle.includes(this.toString());    
  
    return this.includes(needle, position);
};

Array.prototype.indexes = function(type = 'center')
{
    if(this.constructor.name !== 'Array' || this.length === 0)
        return [];

    const middles = ['center', 'middle', '<>', '|'];
    const rights = ['right', '<', 'end', 'last'];
    const lefts = ['left', '>', 'start', 'first'];

    let isMiddle = type.contains(middles);
    let isRight = isMiddle == false && type.contains(rights);
    let keys = Object.keys(this);

    if(((isMiddle && isRight) === false) && type.contains(lefts) || this.length === 1)
        return keys;
    else if(isRight || this.length === 2)
        return keys.reverse();
    else if(!isMiddle)
        return this;

    let initIndex = Math.floor(this.length / 2);
    let result = [];

    for(let i = 0; i < this.length; i++)
        if(i === 0)
            result.push(keys[initIndex]);
        else
        {
            if(initIndex-i >= 0)
                result.push(keys[initIndex-i]);
            
            if(initIndex+i < this.length)
                result.push(keys[initIndex+i]);
        }
                
    return result;
};

Array.prototype.order = function(needle)
{
    if(typeof needle === 'object')
        return needle.reduce((acc, cur) =>
        {
            acc.push(this[cur]);
            return acc;
        }, []);
    else if(typeof needle === 'string')
        return this.order(this.indexes(needle));
};

Array.prototype.eachTime = function(param1, param2, param3)
{
    let interval = 0, idx = 0, cb = param2;

    if(typeof param1 === 'number')
        interval = param1;
    else
        cb = param1;

    if(param3)
        cb(this[0], 0, this, interval), idx++;

    let intervalHandle = setInterval((element, index, array) =>
    {
        if(idx === this.length)
        {
            clearInterval(intervalHandle);
            return;
        }

        cb(this[idx], idx, array, interval); idx++;
    }, interval, this[idx], idx, this, interval);
};

Function.prototype.fromCallback = function(...args)
{
    return (...theArgs) => {this(...theArgs)};
};

HTMLElement.prototype.toggleClass = function(clazz, expr)
{
    let type = typeof expr;

    if(type === 'undefined')
        return this.classList.toggle(clazz);
    else if(type === 'function' && expr(this, clazz))
        this.toggleClass(clazz);
    else if(expr)
        this.toggleClass(clazz);
};

Array.prototype.discriminate = function(expr)
{
    if(expr === undefined)
        return [];

    if(typeof expr !== 'function')
    {
        expr = Boolean(expr);
        return {[expr]: this, [!expr]: []};
    }
    
    let trues = [], falses = [];

    this.forEach((value, index, array) => (expr(value, index, array) ? trues : falses).push(value));

    return {[true]: trues, [false]: falses};
};

Object.prototype.forEach = function(cb, ...args)
{
    if(typeof cb !== 'function')
        return;
    
    Object.entries(this).forEach(([key,value]) => cb(value, key, this, args));
};

// ['a','b','c'].eachTime(3000, (element, index, array, interval) => {
//     console.log(element, index, array, interval);
// }, true);

let clazz = 'active', proactivityLine, sections, events = [], mouseShadow;

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

Number.prototype.close = function(min, max)
{
    if(this < min)
        return min;
    else if(this > max)
        return max;
    else
        return this;
};

Number.prototype.hasDecimals = function()
{
    return this % 1 > 0;
};

window.addEventListener('load', () =>
{
    sections = [...document.querySelectorAll('section')];

    let wheelCounter = 0;

    window.addEventListener('wheel', (e) =>
    {
        wheelCounter = (wheelCounter + e.deltaY / 100 / 2).close(0, sections.length-1);

        if(!wheelCounter.hasDecimals())
            slideTo(sections[wheelCounter].id);
    });

    // mouseShadow = document.getElementById('mouse-shadow');

    // if(mouseShadow)
    //     window.addEventListener('mousemove', function(e)
    //     {   
    //         mouseShadow.style.top = e.pageY + 12 + 'px';
    //         mouseShadow.style.left = e.pageX + 12 + 'px';
    //     });
    
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

        // sections.forEach(e => {
            
        //     if(e.id === id)
        //     {
        //         if(!e.classList.contains(clazz))
        //             e.classList.add(clazz);
                
        //         if(events[id])
        //             events[id].forEach(c => c());

        //         return;
        //     }

        //     e.classList.remove(clazz);
        // });

        sections.discriminate(e => e.id === id).forEach((e, i, a) =>
        {
            let status = i === 'true';

            e.forEach(section => section.classList.toggle(clazz, status));

            if(status && events[id])
                events[id].forEach(c => c());
        });
    }

    document.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => slideTo(e.target.hash)))
});