

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
    let divAttributes = document.getElementById('attributes');

    // if(location.hash !== '#start' && !exception)
    //     return;

    let h1TitleInterval = setInterval(() => {
        // console.log(h1TitleInterval, h1Title.innerHTML.length);
        h1Title.innerHTML = titleContent.slice(0, h1Title.innerHTML.length+1);
        // keySounds.playRandom();
        
        if(h1Title.innerHTML.length >= titleContent.length)
        {
            let expandAnimationClass = 'expand-animation';

            divAttributes.classList.add(expandAnimationClass);
            // setTimeout(() => {divAttributes.classList.remove(expandAnimationClass)}, 6000);
            clearInterval(h1TitleInterval);
            // setInterval(() => {
            //     titleToEdit.innerHTML = titleToEdit.innerHTML === '|' ? titleToEdit.innerHTML = '&nbsp;' : titleToEdit.innerHTML = '|';
            // }, 700);
        }
    }, 70);

    started = true;
}

(events.start = events.start || []).push(startStart);

// window.addEventListener('load', startStart);

/* WTF no sabía que esto existia! */
// document.addEventListener('animationend', (a) => {
//     console.log(a);
// });