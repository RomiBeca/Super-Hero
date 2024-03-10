console.log("vinculado")

$(function () {

    $.ajax({

        url: "https://www.superheroapi.com/api.php/7246518678795864/1",
        method: "GET",

        success(data) {
            console.log(data)
        },
        error(e) {
            console.log(data)
        }



    })



})
