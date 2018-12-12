var adjectives = [
    "engaged", 
    "active",
    "happy",
    "fulfilled",
    "involved",
    "connected",
    "organized"
]

setInterval(function() {
    var u = document.getElementById('underlined');
    var current = u.innerHTML 
    var idx = adjectives.indexOf(current)
    if (idx == adjectives.length - 1) {
        u.innerHTML = adjectives[0]
    } else {
        u.innerHTML = adjectives[idx + 1]
    }
    }, 3000);

