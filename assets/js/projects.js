let projectsStarted = false;

function projectsStart()
{
    if(projectsStarted)
        return;

    let tinyMLCoreSource = document.getElementById('tinyml-core-src');
    let tinyMLCoreDest = document.getElementById('tinyml-core-dst');

    function updateTextDest(element)
    {
        let compiled = TinyMLCore.compile((element || tinyMLCoreSource).value);
        tinyMLCoreDest.value = JSON.stringify(compiled, undefined, ' ');
    }

    updateTextDest();

    // console.log(tinyMLCoreSource);
    tinyMLCoreSource.addEventListener('input', e => {
        updateTextDest(e.target);
    });

    projectsStarted = true;
}

(events.projects = events.projects || []).push(projectsStart);