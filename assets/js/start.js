

let keySounds = [
    ('/assets/sounds/keyboard-key-i.mp3'),
    ('/assets/sounds/keyboard-key-ii.mp3'),
    ('/assets/sounds/keyboard-key-iii.mp3')
];
let started = false;

let titleContent = [
    'Hi! i\'m Alexander<br>Programmer, Designer &amp; Web Developer'
].random();

function startStart()
{
    if(started)
        return;

    let h1Title = document.getElementById('start-title');
    let titleToEdit = document.querySelector('.edit-effect');
    let attributes = document.getElementById('attributes');
    let divAttributes = document.querySelectorAll('#attributes > div');

    attributes.addEventListener('click', (e) => {
        if(e.target.localName === 'button')
        {
            divAttributes.forEach(div => div.classList.toggle('hide', div.dataset.id !== e.target.dataset.id));
            if(e.target.matches('.dance'))
                e.target.classList.remove('dance');
        }
    });

    let h1TitleInterval = setInterval(() => {
        h1Title.innerHTML = titleContent.slice(0, h1Title.innerHTML.length+1);
        
        if(h1Title.innerHTML.length >= titleContent.length)
        {
            let expandAnimationClass = 'expand-animation';

            attributes.classList.add(expandAnimationClass);
            clearInterval(h1TitleInterval);
        }
    }, 70);

    started = true;
}

(events.start = events.start || []).push(startStart);

