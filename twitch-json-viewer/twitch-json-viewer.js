"use strict";
var info = [];

function handleLink(id) {
  if (info[id].state === "deleted") {
    $('#' + id + '-a').removeAttr("href");
  } else {
    $('#' + id + '-a').attr("href", "https://www.twitch.tv/" + info[id]['channel']['display_name']);
  }
}

function addImage(id) {
  $('#' + id + '-img').html('<img src="' + info[id]['channel']['logo'] + '"</img>');
}

function sortRows() {
  var content = $("content").find("a").sort(function(a, b) {
    let aClass = $(a).find(".row").attr('class'),
        bClass = $(b).find(".row").attr('class');
    if (aClass === "row online") {
      return false;
    } else if (bClass === "row online"){
      return true;
    } else if (aClass === "row deleted"){
      return true;
    } else {return false;};
  });
  $("content").append(content);
}

function createRow(id) {
  let status = info[id]['state'],
    toAppend = '<a href="#" for="navigation" id="' + id + '-a" target="_blank"><div class="row ' + status + '" id="' + id + '"><div class="col-md-1" id="' + id + '-img"></div><div class="col-md-3">' + info[id]['channel']['display_name'] + '</div><div class="col-md-8">';

  switch (status) {
    case "online":
      // This stream exists and is streaming!
      toAppend += 'Playing ' + info[id]['game'] + ' for ' + info[id]['viewers'] + ' viewers';
      break;
    case "offline":
      // This stream exists but is presently offline!
      toAppend += 'Offline';
      break;
    default:
      toAppend += 'Does not exist';
  }
  toAppend += '</div></div></a>';
  $("content").append(toAppend);
}

function insertRow(id) {
  createRow(id);
  addImage(id);
  handleLink(id);
}

function getTwitchInfo() {
  let channelList = ["freecodecamp", "storbeck", "numotthenummy", "ESL_SC2", "OgamingSC2", "comster404", "brunofin"];
  info = [];
  $("content").html("");
  for (let i = 0; i < channelList.length; i++) {
    (function(channel) {
      let url = "https://api.twitch.tv/kraken/streams/" + channelList[channel] + "/";
      info.push({});
      $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        success: function(received, status) {
          if (received['stream'] == null) {
            info[channel].state = "offline";
            info[channel].channel = {
              "display_name": channelList[channel],
              "url": "https://www.twitch.tv/" + channelList[channel],
              "logo": "http://dummyimage.com/30x30/FFF8DC/112233&text=<>"
            };
          } else {
            info[channel] = received['stream'];
            info[channel].state = "online";
          }
          insertRow(channel)
        },
        error: function(xhr, status, errMsg) {
          // deleted or never existed; can't be reached with this name
          info[channel].state = "deleted";
          info[channel].channel = {
            "display_name": channelList[channel],
            "logo": "http://dummyimage.com/30x30/eeeeee/333333&text=X"
          };
          insertRow(channel)
        }
      })
    })(i);
  }
}

$(document).ready(function() {
  getTwitchInfo();
  $(document).ajaxStop(function() {
    sortRows();
  });
});