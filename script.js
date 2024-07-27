class UI {
    constructor() {
        this.profile = document.getElementById('show-data');
    }

    showProfile(data) {
        this.clearAlert();
        this.profile.innerHTML = `
         <div class="card card-body mb-3">
        <div class="row">
            <div class="col-md-3">
                <img src="${data.avatar_url}" class="img-fluid mb-3" alt=""><br>
                <a href="${data.html_url}" class="btn btn-primary" target="_blank">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="btn btn-primary">Public Gists: ${data.public_gists}</span>
                <span class="btn btn-secondary">Public Repos: ${data.public_repos}</span>
                <span class="btn btn-success">Followers: ${data.followers}</span>
                <span class="btn btn-info">Following: ${data.following}</span>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item">Id: ${data.id}</li>
                    <li class="list-group-item">Name: ${data.name}</li>
                    <li class="list-group-item">Company: ${data.company}</li>
                    <li class="list-group-item">Website/Blog: ${data.blog}</li>
                    <li class="list-group-item">Location: ${data.location}</li>
                </ul>
            </div>
        </div>
    </div> `
    }

    showAlert(message, className) {
        this.clearAlert();
        this.profile.innerHTML = '';
        let div = document.createElement('div');
        div.className = `container mt-4 ${className}`;
        div.innerText = message;
        let first = document.getElementById('first');
        let second = document.getElementById('second');
        first.insertBefore(div, second);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearAlert() {
        let alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }

}

let userInput = document.getElementById('user-name');
const submitBtn = document.getElementById('submit-btn');
let ui = new UI();


submitBtn.addEventListener('click', (e) => {
    let userName = userInput.value;
    if (userInput.value != "") {
        fetch(`https://api.github.com/users/${userName}`)
            .then(res => res.json())
            .then(data => {
                ui.showProfile(data);
            })
    }
    else {
        // showAlert
        ui.showAlert('Please Input a Username..', 'alert alert-danger')
    }
    e.preventDefault();
})