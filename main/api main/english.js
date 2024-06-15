// Function to play the selected song
function playSong(songUrl) {
    if (!songUrl) {
        alert("No preview available for this song.");
        return;
    }
    var audio = document.getElementById('audio');
    audio.src = songUrl;
    audio.play();
}

// Function to fetch and display songs from the Deezer API
function fetchSongs(query) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log("API Response: ", this.responseText);
            try {
                const response = JSON.parse(this.responseText);
                displaySongs(response.data);
            } catch (error) {
                console.error("Failed to parse API response", error);
                displaySongs([]);
            }
        }
    });

    xhr.open('GET', `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`);
    xhr.setRequestHeader('x-rapidapi-key', 'ca9fafef67mshba6939ea657d413p10d1b2jsn0f7cacafb2f4');
    xhr.setRequestHeader('x-rapidapi-host', 'deezerdevs-deezer.p.rapidapi.com');

    xhr.send();
}

// Function to display songs
function displaySongs(songs) {
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';

    if (!songs || songs.length === 0) {
        document.getElementById('noResultsMessage').style.display = 'block';
        return;
    }

    document.getElementById('noResultsMessage').style.display = 'none';

    songs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');

        const songDetailsDiv = document.createElement('div');
        songDetailsDiv.classList.add('song-details');

        const songTitle = document.createElement('p');
        songTitle.classList.add('song-title');
        songTitle.textContent = song.title;

        const songArtist = document.createElement('p');
        songArtist.classList.add('song-artist');
        songArtist.textContent = song.artist.name;

        songDetailsDiv.appendChild(songTitle);
        songDetailsDiv.appendChild(songArtist);
        songItem.appendChild(songDetailsDiv);

        if (song.preview) {
            const playButton = document.createElement('button');
            playButton.classList.add('play-button');
            playButton.textContent = 'Play';
            playButton.onclick = () => playSong(song.preview);

            songItem.appendChild(playButton);
        } else {
            const noPreviewText = document.createElement('p');
            noPreviewText.classList.add('no-preview');
            noPreviewText.textContent = 'No preview available';
            songItem.appendChild(noPreviewText);
        }

        songList.appendChild(songItem);
    });
}

// Function to handle live search
function liveSearch(event) {
    const query = event.target.value;
    if (query.length >= 3) { // Start searching after 3 characters
        fetchSongs(query);
    } else {
        document.getElementById('song-list').innerHTML = '';
        document.getElementById('noResultsMessage').style.display = 'none';
    }
}

// Add event listener to the search input for live search
document.getElementById('searchInput').addEventListener('input', liveSearch);
