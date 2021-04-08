let profile;
describe('form rendering', () => {
    let header;
    let footer;
    let main;

    beforeAll(() => {
        document.documentElement.innerHTML = '<body><nav class="nav-bar"></nav><header id="top"></header><footer id="footer"><div class="bottom-nav" id="bottom-nav-bar"><!-- <a id="more" href="#more" class="active">More <i class="fas fa-arrow-circle-right"></i></a> --><a id="add-habit" href="#addhabits"><i class="fas fa-plus"></i></a><a id="show-habits" href="#profile"><i class="fas fa-list"></i></a><a id="profile" class="icon"><i class="fas fa-user-circle"></i></a><a id="about" href="https://github.com/natbibi/co-habiters.git" target="_blank"><i class="fab fa-github"></i></a><a id="logout" href="#logout"><i class="fas fa-sign-out-alt"></i></a><!-- <a id="back" href="#top">Back to top</a> --></div></footer><main class="container"></main></body>'
        header = document.querySelector('header');
        footer = document.querySelector('footer');
        main = document.querySelector('main');
        profile = require('../js/profile');
    });

    beforeEach(() => {
        header.innerHTML = '';
        main.innerHTML = '';
        profile.streaksHelper();
        profile.habitsHelper();
    });

    describe('footer', () => {
        it('should be visible', () => {

        });
    });
});