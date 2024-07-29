document.addEventListener('DOMContentLoaded', () => {
    const username = 'vishnnuv'; // Replace with any GitHub username

    const profilePicture = document.getElementById('profile-picture');
    const profileName = document.getElementById('profile-name');
    const profileUsername = document.getElementById('profile-username');

    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            profilePicture.src = data.avatar_url;
            profileName.textContent = data.name || 'No Name Provided';
            profileUsername.textContent = `@${data.login}`;
        })
        .catch(error => {
            console.error('Error fetching GitHub profile:', error);
            profileName.textContent = 'Error fetching profile';
        });
});

