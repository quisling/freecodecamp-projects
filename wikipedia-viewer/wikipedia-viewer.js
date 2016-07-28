var returnObj = [];

function displayResults(arr) {
  // First clear any existing search results
  $(".results-col").html("");
  // Then iterate over results array and display results
  if (arr.length > 0) {
    var title,
      snippet,
      link;
    for (var i = 0; i < arr.length; i++) {
      title = arr[i].title;
      snippet = arr[i].snippet;
      link = "https://en.wikipedia.org/wiki/" + arr[i].title;
      $(".results-col").append('<div class="row">' + '<div class="col-md-2"></div>' + '<div class="col-md-8 text-center result-row">' + '<a href="' + link + '" target="_blank">' + '<h3>' + title + '</h3><BR/>[...] ' + snippet + '[...]' + '</a>' + '</div>' + '<div class="col-md-2"></div>' + '</div>');
    }
  } else {
    $(".results-col").append('<div class="row">' + '<div class="col-md-2"></div>' +
      '<div class="col-md-8 text-center result-row">No Results!</div>' + '<div class="col-md-2"></div>' + '</div>');
  }
};

function wikiSearch(value) {
  $.ajax({
    type: "GET",
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + value + "&format=json&callback=?",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(results, textStatus, jqXHR) {
      console.log(results);
      returnObj = results['query']['search'];
      // Then display the results on-screen
      displayResults(returnObj);
      return true;
    },
    error: function(errorMessage) {
      alert("Wikipedia returned an error!");
      return false;
    }
  });

};

$(document).ready(function() {
  // When search icon is clicked:
  $("#search-icon").click(function() {
    // animate a zoomOut
    $("#search-icon").removeClass("animated zoomIn");
    $("#search-icon").addClass("animated zoomOut");
    
    // Clear the search box
    $("input").val(function(idx, str){return "";});

    // When zoomOut is finished animating:
    $('#search-icon').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

      //zoomIn the text box and make icon invisible
      $('#search-icon').css('display', 'none');
      $('#search').css('display', 'block');
      $("#search").removeClass("animated zoomOut");
      $("#search").addClass("animated zoomIn");
      $('#search').css('opacity', 1);
    });
  });

  // When Search form is submitted:
  $("#search-form").on("submit", function(e) {
    // Prevent the form from submitting and refreshing the page:
    e.preventDefault();
    userEntry = $("input").val();
    // $("input").val() is the text typed by user, if any
    if (userEntry) {
      // Instead of default, make a call to the wikipedia API:
      wikiSearch(userEntry);
    }
  });

  // When Cancel button is clicked:
  $(".cancel").on("click", function(){
    // Clear the results
    $(".results-col").html("");
    
    // Clear the search box
    $("input").val(function(idx, str){return "";});
    
    // animate a zoomOut
    $("#search").removeClass("animated zoomIn");
    $("#search").addClass("animated zoomOut");

    // When zoomOut is finished animating:
    $('#search').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

      //zoomIn the icon and make the text box invisible
      $('#search').css('display', 'none');
      $('#search-icon').css('display', 'block');
      $("#search-icon").removeClass("animated zoomOut");
      $("#search-icon").addClass("animated zoomIn");
      $('#search-icon').css('opacity', 1);
    });
  });
});