document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    const playerList = document.getElementById('playerList');
    let players = [];

    renderPlayers();

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerId = document.getElementById('playerId').value;
        const playerName = document.getElementById('playerName').value;
        const playerMatches = document.getElementById('playerMatches').value;

        if (playerId) {
            updatePlayer(playerId, playerName, playerMatches);
        } else {
            addPlayer(playerName, playerMatches);
        }

        playerForm.reset();
    });

    function addPlayer(name, matches) {
        axios.post('http://127.0.0.1:8000/players/', {name, matches}).then(
            (response) => {renderPlayers()}
        );
    }

    function updatePlayer(id, name, matches) {
        players = players.map(player => player.id === id ? { id, name, matches } : player);
        renderPlayers();
    }

    function deletePlayer(id) {
        axios.delete(`http://127.0.0.1:8000/players/${id}/`).then(
            (response) => {renderPlayers()}
        );
    }

    function editPlayer(id) {
        const player = players.find(player => player.id === id);
        document.getElementById('playerId').value = player.id;
        document.getElementById('playerName').value = player.name;
        document.getElementById('playerMatches').value = player.matches;
    }

    function renderPlayers() {
        playerList.innerHTML = '';
        axios.get('http://127.0.0.1:8000/players/').then(
            (response) => {
                players = response.data;
                players.forEach(player => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${player.name}</td>
                        <td>${player.matches}</td>
                        <td>
                            ...
                        </td>
                    `;
                    playerList.appendChild(row);
                    //<button onclick="deletePlayer('${player.id}')">Delete</button>
                    //<button onclick="editPlayer('${player.id}')">Edit</button>
                });
            }
        );
    }

    window.editPlayer = editPlayer;
    window.deletePlayer = deletePlayer;
});
