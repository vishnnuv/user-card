document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f5f5f5;
        }
        .profile-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
            padding: 20px;
        }
        .profile-card img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
        }
    `;
    document.head.appendChild(style);

    const createProfileCard = (user) => {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        const profilePicture = document.createElement('img');
        profilePicture.id = 'profile-picture';

        const profileName = document.createElement('h2');
        profileName.id = 'profile-name';

        const profileUsername = document.createElement('p');
        profileUsername.id = 'profile-username';

        profileCard.appendChild(profilePicture);
        profileCard.appendChild(profileName);
        profileCard.appendChild(profileUsername);

        return profileCard;
    };

    const userCards = document.querySelectorAll('.user-card');

    userCards.forEach(userCard => {
        const username = userCard.getAttribute('data-user');

        const profileCard = createProfileCard(username);
        userCard.appendChild(profileCard);

        const url = `https://api.github.com/users/${username}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                profileCard.querySelector('#profile-picture').src = data.avatar_url;
                profileCard.querySelector('#profile-name').textContent = data.name || 'No Name Provided';
                profileCard.querySelector('#profile-username').textContent = `@${data.login}`;
            })
            .catch(error => {
                console.error('Error fetching GitHub profile:', error);
                profileCard.querySelector('#profile-name').textContent = 'Error fetching profile';
            });
    });
});
