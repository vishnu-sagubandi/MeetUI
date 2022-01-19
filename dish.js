class Dish {

    // ratios
    _ratios = ['4:3', '16:9', '1:1', '1:2']

    // default options
    _dish = false
    _conference = false
    _cameras = 10
    _margin = 10
    _aspect = 0
    _video = false;
    _ratio = this.ratio() // to perfomance call here

    // create dish
    constructor(scenary) {

        // parent space to render dish
        this._scenary = scenary

        // create the conference and dish
        this.create()

        // render cameras
        this.render()

        return this;
    }

    // create Dish
    create() {

        // create conference (dish and screen container)
        this._conference = document.createElement('div');
        this._conference.classList.add('Conference');

        // create dish (cameras container)
        this._dish = document.createElement('div');
        this._dish.classList.add('Dish');

        // append dish to conference
        this._conference.appendChild(this._dish);

    }

    // set dish in scenary
    append() {

        // append to scenary
        this._scenary.appendChild(this._conference);

    }

    // calculate dimensions
    dimensions() {
        this._width = this._dish.offsetWidth - (this._margin * 2);
        this._height = this._dish.offsetHeight - (this._margin * 2);
    }

    // render cameras of dish
    render() {

        // delete cameras (only those that are left over)
        if (this._dish.children) {
            for (let i = this._cameras; i < this._dish.children.length; i++) {
                let Camera = this._dish.children[i]
                this._dish.removeChild(Camera);
            }
        }

        // add cameras (only the necessary ones)
        for (let i = this._dish.children.length; i < this._cameras; i++) {
            let Camera = document.createElement('div')
            this._dish.appendChild(Camera);
        }

    }

    // resizer of cameras
    resizer(width) {

        for (var s = 0; s < this._dish.children.length; s++) {

            // camera fron dish (div without class)
            let element = this._dish.children[s];

            // custom margin
            element.style.margin = this._margin + "px"

            // calculate dimensions
            element.style.width = width + "px"
            element.style.height = (width * this._ratio) + "px"

            // to show the aspect ratio in demo (optional)
            element.setAttribute('data-aspect', this._ratios[this._aspect]);

        }
    }

    resize() {

        // get dimensions of dish
        this.dimensions()

        // loop (i recommend you optimize this)
        let max = 0
        let i = 1
        while (i < 5000) {
            let area = this.area(i);
            if (area === false) {
                max = i - 1;
                break;
            }
            i++;
        }

        // remove margins
        max = max - (this._margin * 2);

        // set dimensions to all cameras
        this.resizer(max);
    }

    // split aspect ratio (format n:n)
    ratio() {
        var ratio = this._ratios[this._aspect].split(":");
        return ratio[1] / ratio[0];
    }

    // calculate area of dish:
    area(increment) {

        let i = 0;
        let w = 0;
        let h = increment * this._ratio + (this._margin * 2);
        while (i < (this._dish.children.length)) {
            if ((w + increment) > this._width) {
                w = 0;
                h = h + (increment * this._ratio) + (this._margin * 2);
            }
            w = w + increment + (this._margin * 2);
            i++;
        }
        if (h > this._height || increment > this._width) return false;
        else return increment;

    }

    // add new camera
    add() {
        this._cameras++;
        this.render();
        this.resize();
    }

    // remove last camera
    delete() {
        this._cameras--;
        this.render();
        this.resize();
    }

    // return ratios
    ratios() {
        return this._ratios;
    }

    // return cameras
    cameras() {
        return this._cameras;
    }

    // set ratio
    aspect(i) {
        this._aspect = i;
        this._ratio = this.ratio()
        this.resize();
    }

    // set screen scenary
    expand() {

        // detect screen exist
        let screens = this._conference.querySelector('.Screen');
        if (screens) {

            // remove screen
            this._conference.removeChild(screens);

        } else {

            // add div to scenary
            let screen = document.createElement('div');
            screen.classList.add('Screen');
            // append first to scenary
            this._conference.prepend(screen);

        }
        this.resize();
    }

    video(camera, callback, hide = false) {

        // check have video
        if (this._dish.children[camera].video) {
            if (hide) {
                // delete video:
                this._dish.children[camera].video = false
                let videos = this._dish.children[camera].querySelectorAll('video');
                this._dish.children[camera].removeChild(videos[0]);
            }
        } else {
            // set video
            this._dish.children[camera].video = true

            // create video
            let video = document.createElement('video');
            video.classList.add('loading');

            // random number 1-5
            let filename = 'potrait.mp4';
            video.src = `./assets/videos/${filename}`;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsinline = true;
            video.controls = false;

            // event to show video
            video.addEventListener('loadedmetadata', function () {
                callback(video);
            }, false);

            // append video to camera
            this._dish.children[camera].appendChild(video);

        }

    }

}

class Controls {

    // items to append
    _dish = false
    _scenary = false
    _controls = []
    _videos = true

    // contruct the controls
    constructor(dish, scenary) {

        // space of cameras
        this._dish = dish;

        // place to add controls
        this._scenary = scenary;

        // create controllers
        this.controllers();

        // run videos (demo)
        this.videos(100);

    }

    controllers() {
        // create add button
        this.button(false, 'plus', () => {
            this._dish.add();
            if (this._videos) {
                this.videos();
            }

        })

        // create remove button
        this.button(false, 'trash', () => {
            this._dish.delete();
        })

        // create video button
        this.button(false, 'tv', (element) => {

            // add active class
            element.classList.toggle('active');

            // set status of videos (totally for demo)
            this._videos = !this._videos;
            // generate videos
            this.videos(0, !this._videos);

        }, true)

        this.button(false, 'expand', () => {
            this._dish.expand();
        })
        this.button(false, 'tachometer-alt', () => {
            this.performance()
        })

        this.ratios()

        // github link
        this.link()
    }

    // create a button
    button(title = false, icon = false, callback, active) {

        // create div element
        let element = document.createElement('div');
        element.className = 'Button';

        // active class (by default creation)
        if (active) {
            element.classList.add('active');
        }

        // create icon with font line awesome
        if (icon) {

            let iconElement = document.createElement('i');
            iconElement.className = 'las la-' + icon;
            element.appendChild(iconElement);

        }

        // create title:
        if (title) {

            element.appendChild(document.createTextNode(title))

        }

        // event of button
        element.addEventListener("click", () => {
            callback(element);
        });

        // return to append later
        this.add(element)
        return element;
    }

    // function to create the link to github
    link() {

        // create link
        let element = document.createElement('a')
        element.href = 'https://github.com/Alicunde/Videoconference-Dish-CSS-JS'
        element.className = 'Link';
        element.innerHTML = 'Github'

        // add icon github
        let icon = document.createElement('i');
        icon.className = 'lab la-github';
        element.appendChild(icon);

        this.add(element)
    }

    // add controller to the array of controllers
    add(element) {
        if (element)
            this._controls.push(element)
        else
            console.log('element not found')
    }

    // render controllers in scenary
    append() {

        // create div of controllers
        let Controls = document.createElement('div');
        Controls.className = 'Controls';

        // render all buttons at the same time
        for (let i = 0; i < this._controls.length; i++) {
            Controls.appendChild(this._controls[i]);
        }

        // append into scenary
        this._scenary.appendChild(Controls);
    }

    // execute random videos (demo)
    videos(delay = 0, hide = false) {
        // get number of cameras
        let cameras = this._dish.cameras();

        // add or delete video per n camera
        let i = 0;
        while (i < cameras) {

            // timeout to make nice animation
            setTimeout((that, camera) => {

                // add or remove video
                that._dish.video(camera, (element) => {

                    // random current time of video (to make nice demo)
                    element.currentTime = Math.floor(Math.random() * 30);

                    // remove class loading (animation by CSS)
                    setTimeout(() => {
                        element.classList.remove('loading');
                    }, 100);

                }, hide);

            }, delay * i, this, i);

            i++;
        }
    }

    // execute 10 videos at the same time to check performance
    performance() {

        // number of videos to create
        var videos = 10;

        // interval (demo animation)
        var interval = 100;

        for (var i = 0; i < videos; i++) {
            setTimeout(function (that) {

                // add new camera
                that._dish.add();
                if (that._videos) {
                    that.videos();
                }

            }, i * interval, this)
        }


    }

    // aspect ratio buttons
    ratios() {

        // save the buttons to remove "active" class
        let buttons = [];

        // get ratios from Dish class
        let ratios = this._dish.ratios();

        // create 1 button per ratio
        for (let i = 0; i < ratios.length; i++) {

            let button = this.button(ratios[i], 'ratio', (element) => {

                // remove all actives on ratio
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('active');
                }
                element.classList.add('active');

                // edit aspect ratio
                this._dish.aspect(i);

            }, i === 0 ? true : false)

            // save in buttons
            buttons.push(button);
        }

    }
}