// top arrow script
document.getElementById("scrollUp").classList.add("hide");
getYPosition = () => {
    var top = window.pageYOffset || document.documentElement.scrollTop
    return top;
};

document.addEventListener('scroll', () => {
    var scroll = getYPosition();
    var arrow = document.getElementById('scrollUp');
    scrolled = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    // navigation bar sticky
    if (scroll < 50) {
        document.getElementById("header-sticky").classList.remove("sticky-bar");
    } else {
        document.getElementById("header-sticky").classList.add("sticky-bar");
    }
    if (scroll > 1200) {
        arrow.classList.remove("hide");
        arrow.classList.add("show");
        arrow.addEventListener('click', scrolled);
    } else {
        document.getElementById('scrollUp').classList.remove("show");
        document.getElementById('scrollUp').classList.add("hide");
        document.getElementById("scrollUp").removeEventListener("click", scrolled);
    }
})

// get eventts data
let eventtsListUrl = 'https://my-json-server.typicode.com/rafatmunshi/FrontEnd-Sample/Upcoming';
let eventtsListUrl1 = 'https://my-json-server.typicode.com/rafatmunshi/FrontEnd-Sample/Previous';
var eventtsList;
async function loadeventts(eventtsListUrl) {
    fetch(eventtsListUrl)
        .then(response => response.json())
        .then(json => {
            eventtsList = json;
            let htmlToReturn = "",
                isPremium = '';
            eventtsList.forEach((eventt) => {
                htmlToReturn = '<div class="col-xl-4 col-lg-4 col-md-6">' +
                    '<div class="single-eventt card text-white'
                if (eventt.type == "Recruiting Mission") {
                    htmlToReturn += ' bg-success white-title '
                } else
                if (eventt.type == "Leap Event") {
                    htmlToReturn += ' bg-warning white-title '
                } else
                if (eventt.type == "VanHackathon") {
                    htmlToReturn += ' bg-dark white-title '
                }
                htmlToReturn += 'mb-3" id="eventt' + eventt.id + '">' +
                    '<div class="eventt-img ">' +
                    '       <img class="card-img-top" src="https://github.com/rafatmunshi/FrontEnd-Sample/raw/master/' + eventt.type + '.jpg" alt="">';
                isPremium = '       <div class="new-eventt card-body">' +
                    '           <span>Premium Members Only</span>' +
                    '       </div>'
                if (eventt.isPremium == 'TRUE')
                    htmlToReturn += isPremium;
                isPremium = "";
                htmlToReturn += '       <div class="eventt-hover">' +
                    '            <div class="container">' +
                    '                <div class="row">' +
                    '                    <div class="col-3">' +
                    '                        <a href="" data-toggle="modal" data-target="#basicModal" ><i class="fa far fa-eye fa-3x" data-toggle="tooltip" data-placement="top" title="View Details" onclick="viewDetails(\'' + eventt.info + '\')"></i></a>' +
                    '                    </div>' +
                    '                    <div class="col-6">' +
                    '                        <button class="btn1" data-toggle="modal" data-target="#basicModal" onclick="submitApplication(\'' + eventt.type + '\')">Apply</button>' +
                    '                    </div>' +
                    '                    <div class="col-3">' +
                    '                        <a href="" data-toggle="modal" data-target="#basicModal"><i class="fa fas fa-share fa-3x" data-toggle="tooltip" data-placement="top" title="Share with others" onclick="shareEvent(' + eventt.id + ')"></i></a>' +
                    '                    </div>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '<div class="eventDetails">' +
                    '        <h4 class="card-text"><strong>' + eventt.name + '</strong></h4><p class="card-text">' + eventt.type + '</p>' +
                    '        <span class="card-text">' + eventt.dates + '</span>. ' +
                    '        <span class="card-text">' + eventt.timings + '</span>' +
                    '        <div class="price">' +
                    '            <ul>' +
                    '                <li>' + eventt.venue + '</li>' +
                    '            </ul>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>' +
                    '</div>';
                document.querySelector('#eventtsListArea').innerHTML += htmlToReturn;
                document.querySelectorAll('.single-eventt').forEach(eventt => {
                    eventt.addEventListener('mouseover', event => {
                        eventt.querySelector('.eventt-img').classList.add('blur');
                        eventt.querySelector('.eventt-img').querySelector('.eventt-hover').classList.remove('hide');
                        eventt.querySelector('.eventt-img').querySelector('.eventt-hover').classList.add('show');
                    })
                    eventt.addEventListener('mouseout', event => {
                        eventt.querySelector('.eventt-img').classList.remove('blur');
                        eventt.querySelector('.eventt-img').querySelector('.eventt-hover').classList.add('hide');
                        eventt.querySelector('.eventt-img').querySelector('.eventt-hover').classList.remove('show');
                    })
                });
                //on hover of any eventt code
                document.querySelectorAll('.eventt-hover').forEach(eventt1 => {
                    eventt1.classList.add('hide');
                })
            });
        })
}
loadeventts(eventtsListUrl);

function submitApplication(eventtType) {
    if (eventtType == "Premium Only Webinar") {
        document.querySelector('#myModalLabel').style.color = 'red';
        document.querySelector('#myModalLabel').innerHTML = '<i class="fa fas fa-times-circle"></i>Sorry!';
        document.querySelector('#myModalBody').innerHTML = '<p>This Webinar is only for Premium Members.</p><p>Please read more about our Premium Membership plans</p>';
        document.querySelector('#myModalButtons').innerHTML = '<button type="button" class="btn btn-primary">Check Premium</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
    } else {
        document.querySelector('#myModalLabel').style.color = 'green';
        document.querySelector('#myModalLabel').innerHTML = '<i class="fa fas fa-check-circle"></i>Success!';
        document.querySelector('#myModalBody').innerHTML = '<p>Congratulations! You have successfully applied to this Event. Please check your email for further details. </p><p>And remember, We Hack Together!</p>';
        document.querySelector('#myModalButtons').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';

    }
}

function viewDetails(eventtInfo) {
    document.querySelector('#myModalLabel').style.color = 'black';
    document.querySelector('#myModalLabel').innerHTML = 'Event Details';
    document.querySelector('#myModalBody').innerHTML = '<p>' + eventtInfo + '</p>';
    document.querySelector('#myModalButtons').innerHTML = '<button type="button" class="btn btn-primary">Apply Now</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
}

function shareEvent(id) {
    document.querySelector('#myModalLabel').style.color = 'black';
    document.querySelector('#myModalLabel').innerHTML = 'Share on';
    document.querySelector('#myModalBody').innerHTML = '<a href="https://www.linkedin.com/sharing/share-offsite/?url=https://rafatmunshi.github.io/FrontEnd-Sample/event' + id + '.html"><img src="https://github.com/rafatmunshi/FrontEnd-Sample/raw/master/LinkedIn.png" height="40px" width="150px" style="margin-left:160px;"></a>';
    document.querySelector('#myModalButtons').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
}
