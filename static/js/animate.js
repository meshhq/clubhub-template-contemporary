var adjectives = [
    "engaged", 
    "active",
    "happy",
    "fulfilled",
    "involved",
    "connected",
    "organized"
]

var vowels = ["a", "e", "i", "o", "u"]

setInterval(function() {
    var u = document.getElementById('underlined');
    var pre = document.getElementById('pre-underlined');
    var current = u.innerHTML 
    var idx = adjectives.indexOf(current)
    if (idx == adjectives.length - 1) {
        u.innerHTML = adjectives[0]
    } else {
        u.innerHTML = adjectives[idx + 1]
    }
    const letter = u.innerHTML.charAt(0)
    if (vowels.includes(letter)) {
        pre.innerHTML = "an"
    } else {
        pre.innerHTML = "a"
    }
    }, 3000);

