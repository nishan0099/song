// Function to handle search button click and Enter key press
function searchSongs(event) {
    if (event.key === "Enter" || event.type === "click") {
        var input, filter, songs, songTitles, i, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        songs = document.getElementsByClassName('song-item');
        var noResultsMessage = document.getElementById('noResultsMessage');

        var found = false;

        for (i = 0; i < songs.length; i++) {
            songTitles = songs[i].getElementsByClassName('song-title')[0];
            txtValue = songTitles.textContent || songTitles.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                songs[i].style.display = '';
                found = true;
            } else {
                songs[i].style.display = 'none';
            }
        }

        // Display message if no results found
        if (!found) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
}

// Event listener for Enter key press on search input
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        searchSongs(event);
    }
});

// Function to play selected song
function playSong(songUrl) {
    var audio = document.getElementById('audio');
    audio.src = songUrl;
    audio.play();

    // Show the audio player
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.style.display = 'block';
}
