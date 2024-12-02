const API_URL = 'http://localhost:3000'; // Update this to your backend URL if hosted
const votes = {}; // Store votes

// Fetch votes from backend
async function fetchVotes() {
    const response = await fetch(`${API_URL}/votes`);
    return await response.json();
}

// Send a vote to the backend
async function sendVote(link) {
    await fetch(`${API_URL}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
    });
}

// Update voting section dynamically
async function updateVotingSection() {
    const votes = await fetchVotes();
    const votingContainer = document.getElementById('voting-container');

    // Sort projects by votes
    const sortedProjects = Object.entries(votes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    votingContainer.innerHTML = '';
    sortedProjects.forEach(([link, voteCount]) => {
        const voteItem = document.createElement('div');
        voteItem.classList.add('vote-item');
        voteItem.innerHTML = `
            <span>${link}</span>
            <span>Votes: ${voteCount}</span>
            <button onclick="vote('${link}')">Vote</button>
        `;
        votingContainer.appendChild(voteItem);
    });
}

// Handle form submission
document.getElementById('feed-santa-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const link = document.getElementById('santa-link').value.trim();
    if (!link) return alert('Enter a valid URL.');

    await sendVote(link);
    await updateVotingSection();

    document.getElementById('santa-link').value = '';
});

// Vote button handler
async function vote(link) {
    await sendVote(link);
    await updateVotingSection();
}

// Initialize voting section on load
updateVotingSection();
