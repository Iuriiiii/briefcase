// Element.prototype.value = function(v)
// {
//     if(typeof v !== 'undefined')
//         if(this.innerText)
//             this.textContent = v;
//         else
//             this.innerHTML = v;

//     return (this.textContent || this.innerHTML);
// };

Element.prototype.value = function(v)
{
    if(typeof v !== 'undefined')
        this.innerHTML = v;

    return this.innerHTML;
};

Array.prototype.asyncEachTime = function(cb, interval = 20, run)
{
    return new Promise((resolve) => {
        if(typeof cb === 'number' && typeof interval === 'function')
            [cb, interval] = [interval, cb];

        let idx = 0;

        if(run)
            cb(this[0], 0, this, interval), idx++;

        function end(handle)
        {
            clearInterval(handle);
            resolve(this, this[idx], idx, interval);
        }

        let handle = setInterval((element, index, array) =>
        {
            if(idx >= this.length)
                return end(handle);

            if(cb(this[idx], idx, array, interval) === false)
                return end(handle);
                
            idx++;
        }, interval, this[idx], idx, this, interval);
    });
};

let chars = {['&amp;']: '&', ['|']: '<br>'}

function effectTipying(element, time = 20, content)
{
    if(typeof time === 'string')
        if(typeof content === 'number')
            [time, content] = [content, time];
        else
            content = time, time = 20;

    content = (content ? content : element.value()).replace('&amp;', '&').split('');
    element.value('');

    return content.asyncEachTime((char, index, array) => {
        element.value(element.value() + (chars[char] || char));
    }, time, true);
}

let effects = {tipying: effectTipying};

Element.prototype.applyEffect = function(effect, ...args)
{
    if(typeof effects[effect] === 'undefined')
        return new Promise((resolve, reject) => reject(this));

    return effects[effect](this, ...args);
};

String.prototype.readFile = async function()
{
    return fetch(this.toString()).then(r => r.text());
};

let classes = {hide: 'hide'};
let elements = {tecs: {}, home: {}, projects: {}};
let sectionsCallbacks = {['#home']: home, ['']: home, ['#tecs']: tecs, ['#projects']: projects};
let sections = [];
let section;
let sources = ['/assets/css/style.css', '/assets/js/main.js', 'index.html'];

async function startRandomBackgroundTyping()
{
    elements.background.applyEffect('tipying', await sources.random().readFile(), 5);
}

function show(id)
{
    if((id = id.replace('#', '')) === '')
        id = 'home';

    sections.forEach(s => {
        // console.log(id, s.id);
        if(s.id == id)
            s.classList.remove(classes.hide);
        else
            s.classList.add(classes.hide);
    })
}

let proactivityBarTimer;

async function home(e)
{
    let h2;
    let proactivityBar = document.querySelector('.proactivity-bar');
    
    if(!proactivityBarTimer)
        (h2 = document.querySelector('body > main > section > header > h2'))
            .applyEffect('tipying', h2.dataset.text, 100).then(() =>
            {
                elements.header.classList.remove(classes.hide);
                document.querySelector('#home > header > p').classList.remove(classes.hide);
                document.querySelector('#home > main').classList.remove(classes.hide);
                
                if(!proactivityBarTimer)
                    proactivityBarTimer = setInterval(() => proactivityBar.style.width = (97 + Math.random() * 8) + '%', 50);
            });
}

function tecs(e)
{
    elements.header.classList.remove(classes.hide);
    // section.classList.remove(classes.hide);

    Array.from(elements.tecs.images).order('center').asyncEachTime((img) =>
    {
        img.style.display = 'block';
    }, 50);
}

function projects(e)
{
    elements.header.classList.remove(classes.hide);
}

document.addEventListener('DOMContentLoaded', async (e) => {
    elements.header = document.querySelector('body > header');

    elements.header.addEventListener('click', (e) =>
    {
        if(e.target.localName !== 'a')
            return;

        let hash = e.target.hash || '';

        show(hash);
        sectionsCallbacks[hash](e);
    });

    elements.background = document.querySelector('.background-codding-effect');
    elements.tecs.images = document.querySelectorAll('section:nth-child(2) > main > div > img');
    section = document.getElementById(location.hash.replace('#','') || 'home');
    sections = Array.from(document.querySelectorAll('body > main > section'));
    startRandomBackgroundTyping();
    show(location.hash);
    sectionsCallbacks[location.hash](e);
});

// window.addEventListener('load', (e) => {
//     let h2 = document.querySelector('body > main > section > header > h2');
//     // console.log(h2.constructor.name);
//     h2.applyEffect('tipying', 'Hola Mundo', 110);
// });