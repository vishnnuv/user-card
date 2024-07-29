document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .pfp {
            position: relative;
            display: flex;
            align-items: center;
            color:black
        }
        .pfp-txt h2 {
            line-height: 0;
        }
       .pfp-txt p{
            line-height:0;
       }
        .git-link {
            text-decoration: none;
        }
        .git-img{
            border-radius: 100%;
            width: 54px;
            height: 54px;
            margin-right: 12px;
        }
    `;
    document.head.appendChild(style);

    const createProfileCard = (user, linkUrl) => {
        const link = document.createElement('a');
        link.href = linkUrl;
        link.target = '_blank';
        link.classList.add('git-link');

        const profileCard = document.createElement('div');
        profileCard.classList.add('pfp');

        const profilePicture = document.createElement('img');
        profilePicture.classList.add('git-img');

        const profileText = document.createElement('div');
        profileText.classList.add('pfp-txt');

        const profileName = document.createElement('h2');

        const profileUsername = document.createElement('p');

        profileText.appendChild(profileName);
        profileText.appendChild(profileUsername);
        profileCard.appendChild(profilePicture);
        profileCard.appendChild(profileText);
        link.appendChild(profileCard);

        return { link, profilePicture, profileName, profileUsername };
    };

    const userCards = document.querySelectorAll('.user-card');

    userCards.forEach(userCard => {
        const username = userCard.getAttribute('data-user');
        const linkUrl = `https://github.com/${username}`;

        const { link, profilePicture, profileName, profileUsername } = createProfileCard(username, linkUrl);
        userCard.appendChild(link);

        const url = `https://api.github.com/users/${username}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                profilePicture.src = data.avatar_url;
                profileName.textContent = data.name || 'No Name Provided';
                profileUsername.textContent = data.login;
            })
            .catch(error => {
                console.error('Error fetching GitHub profile:', error);
                profileName.textContent = 'Error fetching profile';
            });
    });
});
