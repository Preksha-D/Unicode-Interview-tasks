fetch('https://se-tasks.vercel.app/events')
.then (function (response){
    return response.json();
})
.then(function(data){
    appendData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function appendData(data){
    var card = document.getElementById("rest"); 
    for (var i=0;i<data.length; i++){
        var div = document.createElement("div");
        card.appendChild(div);
        div.className= "card";
        div.id= data[i]._id;
        var pic = document.createElement("div");
        pic.className = "pic";
        div.appendChild(pic);
        var img = document.createElement("img");
        if (data[i].name == "Summer Music Festival"){
            img.src="Pictures/music.jpeg";
        }
        else if (data[i].name == "Soccer Championship"){
            img.src="Pictures/soccer2.jpeg";
        }
        else{
            img.src="Pictures/theatre3.jpg";
        }
        pic.appendChild(img);
        var date = document.createElement("div");
        var date1 = new Date (data[i].date);
        date.innerHTML = date1.getDate()+ "  " + months[date1.getMonth()]+ "  " + date1.getFullYear();
        date.className = "ribbon";
        pic.appendChild(date);
        var details = document.createElement("div");
        div.appendChild(details);
        details.className= "details";
        var name = document.createElement("h3");
        name.innerHTML = data[i].name;
        details.appendChild(name);
        var time = document.createElement("h4");
        time.className= "time";
        time.innerHTML = "Time: " + data[i].time;
        details.appendChild(time);
        var location = document.createElement("h4");
        location.className= "location";
        location.innerHTML = "Venue: " + data[i].venue;
        details.appendChild(location);
        var button = document.createElement("button");
        button.className="more";
        details.appendChild(button);
        button.innerHTML = "Book Now";

        div.addEventListener("click", toggle);
    }
}

const decor = document.getElementById("decor");
const rest = document.getElementById("rest");

function toggle(){
    decor.classList.toggle("active");
    rest.classList.toggle("active");
    popup(this.getAttribute('id'));
}

async function popup(id){
    const response = await fetch(`https://se-tasks.vercel.app/events/`+ id);
    var tics = await response.json();
    var event= document.getElementById("event");
    event.style.visibility = "visible";
    var x = document.getElementById("x");
    var img = document.querySelector(".img");
    if (tics.name == "Summer Music Festival"){
        img.src="Pictures/music.jpeg";
    }
    else if (tics.name == "Soccer Championship"){
        img.src="Pictures/soccer2.jpeg";
    }
    else{
        img.src="Pictures/theatre3.jpg";
    }
    var aa = document.querySelector(".name1");
    aa.innerHTML = tics.name;
    var describe = document.querySelector(".describe");
    describe.innerHTML = tics.description;
    var date2 = document.querySelector(".date1");
    var bbb = new Date (tics.date);
    date2.innerHTML = "Date: " + bbb.getDate()+ "  " + months[bbb.getMonth()]+ "  " + bbb.getFullYear();
    var time1 = document.querySelector(".time1");
    time1.innerHTML = "Time: " + tics.time;
    var location1 = document.querySelector(".location1");
    location1.innerHTML= "Venue: " + tics.venue;
    var price = document.querySelector(".price");
    price.innerHTML= "Ticket Price: $" + tics.ticketPrice;
    var tics1 = document.querySelector(".tics");
    tics1.innerHTML= "Tickets Left: " + tics.availableTickets;

    x.addEventListener("click", toggle1);
}

function toggle1(){
    decor.classList.toggle("active");
    rest.classList.toggle("active");
    var event= document.getElementById("event");
    event.style.visibility = "hidden";
}

function ticket(id){
    fetch()
}