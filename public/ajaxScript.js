$(function() {
    $('#post-suprafata').on('submit', function(event) {
        event.preventDefault();
        
        $.ajax({
            url: '/suprafete',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                anCumparare: $("#anCumparare").val(),
                op: $("#op").val(),
                oa: $("#oa").val(),
                suprafataHA: $("#suprafataHA").val()
            }),
            success: function(response) {
                console.log(response);
                getSuprafete()
            }
        })
    });

});

getSuprafete()

function getSuprafete() {
    $.ajax({
        url: '/suprafete',
        contentType: 'application/json',
        success: function(response) {
            var display = document.getElementById("display");
            var child = display.lastElementChild;  
            while (child) { 
            display.removeChild(child); 
                child = display.lastElementChild; 
            }
            response.suprafete.forEach(function(suprafata){
                console.log(suprafata.anCumparare);
                var section = document.createElement("div");
                section.className += "suprafata-info";
                var heading = document.createElement("h5");
                var opnr = "OP" + suprafata.op;
                var oanr = "OA" + suprafata.oa; 
                heading.innerHTML = opnr+oanr;
                var d1 = "Anul Cumparari: " + suprafata.anCumparare;
                var d2 = "Suprafata (ha): " + suprafata.suprafataHA;
                var p1 = document.createElement("p");
                var p2 = document.createElement("p");
                p1.innerHTML = d1;
                p2.innerHTML = d2;
                section.appendChild(heading);
                section.appendChild(p1);
                section.appendChild(p2);
                display.appendChild(section);
            });
        }
    });
}