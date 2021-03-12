"use strict";

function getCities() {
  var state = $("#state option:selected").val();

  var settings = {
    url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + state + "/municipios",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    mountCities(response);
  });
}

function mountCities(response) {
  var allResponse = response;
  console.log(response);

  $("#city").on("focus", function () {
    var cities = allResponse.map(function (item) {
      return item.nome;
    });

    console.log("cities", cities);

    if ($("#city option").length > 0) {
      $("#city option").remove();
    }

    $.each(cities, function (idx, value) {
      var valueCity = value.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      });
      $("#city").append('<option value="'.concat(valueCity, '">').concat(valueCity, "</option>"));
    });
  });
}

function selectState(){
  $("#state").on("change", function(){
    getCities();
  })
}

$(document).ready(function () {
  selectState();
});
