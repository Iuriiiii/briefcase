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

document.addEventListener('DOMContentLoaded', async (e) =>
{
    let h2;

    (h2 = document.querySelector('body > main > section > header > h2'))
        .applyEffect('tipying', h2.dataset.text, 100).then(() =>
        {
            document.querySelector('body > header').classList.remove(classes.hide);
            document.querySelector('body > main > section > header > p').classList.remove(classes.hide);
            document.querySelector('body > main > section > main').classList.remove(classes.hide);
        });
    document.querySelector('.backgroundr-codding').applyEffect('tipying', await '/assets/css/style.css'.readFile(), 5);
});

// window.addEventListener('load', (e) => {
//     let h2 = document.querySelector('body > main > section > header > h2');
//     // console.log(h2.constructor.name);
//     h2.applyEffect('tipying', 'Hola Mundo', 110);
// });