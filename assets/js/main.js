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

Element.prototype.text = function(v)
{
    if(typeof v !== 'undefined')
        this.innerText = v;

    return this.innerText;
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

let chars = {['&amp;']: '&', ['|']: '\r\n'}

function effectTipying(element, time = 20, content)
{
    if(typeof time === 'string')
        if(typeof content === 'number')
            [time, content] = [content, time];
        else
            content = time, time = 20;

    content = (content ? content : element.text()).replace('&amp;', '&').split('');
    element.text('');

    return content.asyncEachTime((char, index, array) => {
        element.text(element.text() + (chars[char] || char));
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
    return fetch(this.toString(), {headers: {'Content-Type': 'text/plain'}}).then(r => r.text());
};

let classes = {hide: 'hide'};
let elements = {tecs: {}, a: [], home: {}, projects: {}};
let sectionsCallbacks = {['#home']: home, ['']: home, ['#tecs']: tecs, ['#projects']: projects};
let sections = [];
let section;
let sources = ['/assets/css/style.css', '/assets/js/main.js', 'index.html'];
let hashStack = [];

async function startRandomBackgroundTyping()
{
    elements.background.applyEffect('tipying', (await sources.random().readFile()).replaceAll('\r\n',' '), 5);
}

function highlightA(hash)
{
    
}

function show(hash)
{
    if(!hash)
        hash = '#home';

    sections.forEach(s => {
        if(hash.endsWith(s.id))
            s.classList.remove(classes.hide);
        else
            s.classList.add(classes.hide);
    });

    elements.a.forEach((e) => e.style.textDecoration = e.getAttribute('href') === hash ? 'underline' : 'none');
}

let proactivityBarTimer;

async function home(e)
{
    console.log('home');
    let h2;
    let proactivityBar = document.querySelector('.proactivity-bar');
    
    if(!proactivityBarTimer)
    {
        (h2 = document.querySelector('body > main > section > header > h2'))
            .applyEffect('tipying', h2.dataset.text, 100).then(() =>
            {
                elements.header.classList.remove(classes.hide);
                elements.footer.classList.remove(classes.hide);
                document.querySelector('#home > header > p').classList.remove(classes.hide);
                document.querySelector('#home > main').classList.remove(classes.hide);
                
                if(!proactivityBarTimer)
                    proactivityBarTimer = setInterval(() => proactivityBar.style.width = (97 + Math.random() * 8) + '%', 50);
            });
    }
}

function tecs(e)
{
    elements.header.classList.remove(classes.hide);
    elements.footer.classList.remove(classes.hide);
    // section.classList.remove(classes.hide);

    Array.from(elements.tecs.images).order('center').asyncEachTime((img) =>
    {
        img.style.display = 'block';
    }, 80);
}

function projects(e)
{
    elements.header.classList.remove(classes.hide);
    elements.footer.classList.remove(classes.hide);
}

document.addEventListener('DOMContentLoaded', async (e) => {
    elements.header = document.querySelector('body > header');
    elements.footer = document.querySelector('footer');

    // elements.header.addEventListener('click', (e) =>
    // {
    //     if(e.target.localName !== 'a')
    //         return;

    //     let hash = e.target.hash || '';

    //     show(hash);
    //     sectionsCallbacks[hash](e);
    //     e.stopPropagation();
    // });

    elements.a = Array.from(document.querySelectorAll('nav > a'));

    function getId()
    {
        return location.hash.replace('#','') || 'home';
    }

    elements.background = document.querySelector('.background-codding-effect');
    startRandomBackgroundTyping();
    elements.tecs.images = document.querySelectorAll('section:nth-child(2) > main > div > img');
    hashStack.push(getId());
    section = document.getElementById(hashStack.at(-1));
    sections = Array.from(document.querySelectorAll('body > main > section'));
    show(location.hash);
    sectionsCallbacks[location.hash](e);
});

window.addEventListener('hashchange', (e) =>
{
    if(e.oldURL.endsWith(location.hash))
        return;

    show(location.hash);
    // console.log(location.hash);
    sectionsCallbacks[location.hash](e);
});

// window.addEventListener('load', (e) => {
//     let h2 = document.querySelector('body > main > section > header > h2');
//     // console.log(h2.constructor.name);
//     h2.applyEffect('tipying', 'Hola Mundo', 110);
// });