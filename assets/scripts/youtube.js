//Initiate Youtube Video API 

$(document).ready(function(){
  
    var key = 'AIzaSyAxnhYiYDjPXFbKgal4GDQDukGzqJV81PI';    
    var playlistId = childSnapshot.val().selValue;
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  
      var options = {
          part: 'snippet',
          key: key,
          maxResults: 5,
          playlistId: playlistId
      }
  
      loadVids(options);
  
      function loadVids(videoOptions) {
          $.getJSON(URL, videoOptions, function (data) {
              console.log(options);
              var id = data.items[0].snippet.resourceId.videoId;
              mainVid(id);
              resultsLoop(data);
          });
      }
  
      function mainVid(id) {
          $('#video').html(`
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                  `);
      }
  
          
      function resultsLoop(data) {
          $('main').empty();
          $.each(data.items, function (i, item) {
  
              var thumb = item.snippet.thumbnails.medium.url;
              var title = item.snippet.title;
              var desc = item.snippet.description.substring(0, 100);
              var vid = item.snippet.resourceId.videoId;
  
              
              $('main').prepend(`
                              <article class="item" data-key="${vid}">
  
                                  <img src="${thumb}" alt="" class="thumb">
                                  <div class="details">
                                      <h4>${title}</h4>
                                      <p>${desc}</p>
                                  </div>
  
                              </article>
                          `);
          });
      }
  
          // CLICK EVENT
      $('main').on('click', 'article', function () {
          var id = $(this).attr('data-key');
          mainVid(id);
      });
  
      $('.womanWorkout').on('click', function () {
          console.log("hello")
          var options = {
              part: 'snippet',
              key: key,
              maxResults: 5,
              playlistId: 'PLChOO_ZAB22WuyDODJ3kjJiU0oQzWOTyb'
          }
          loadVids(options);
      });
      
      $('.OutdoorWorkout').on('click', function () {
          console.log("hello")
          var options = {
              part: 'snippet',
              key: key,
              maxResults: 5,
              playlistId: 'PLA_I2ay5YcUUr8_rE-DlVknObkJ6-Rn3q'
          }
          loadVids(options);
      });
      
      $('.gymWorkout').on('click', function () {
          console.log("hello")
          var options = {
              part: 'snippet',
              key: key,
              maxResults: 5,
              playlistId: 'PLDULdzOzi3Sprr_e2Op69eoPNUaq5Z7Ev'
          }
          loadVids(options);
      });
  });