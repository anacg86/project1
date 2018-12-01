var config = {
    apiKey: "AIzaSyBTUty_2eQIF51UpzBShEe0XvRUwsdtEzc",
    authDomain: "weightloss-c69df.firebaseapp.com",
    databaseURL: "https://weightloss-c69df.firebaseio.com",
    projectId: "weightloss-c69df",
    storageBucket: "weightloss-c69df.appspot.com",
    messagingSenderId: "360811521364"
};
firebase.initializeApp(config);
var database = firebase.database();

database.ref().on("child_added", function (childSnapshot) {
    $(document).ready(function () {
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: "GET",
            data: {
                part: 'snippet',
                maxResults: 7,
                q: childSnapshot.val().selGender + " " + childSnapshot.val().selValue + " exercise",
                type: 'video',
                key: 'AIzaSyC_54O2ZQp7CNs5wDhwMKlqG5oOSmj7MK4'
            }
        })
            .then((response) => {
                console.log(response);

                //show first video
                $('#video').append(`
                      <iframe width="600" height="350" src="https://www.youtube.com/embed/${response.items[0].id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                  `);
                //show the next 6 videos
                $.each(response.items, function (i, item) {
                    if (i === 0)
                        return;

                    var thumb = item.snippet.thumbnails.medium.url;
                    var title = item.snippet.title;
                    var desc = item.snippet.description.substring(0, 100);
                    var vid = item.snippet.id;


                    $('main').append(`
                        <article class="item" data-key="${item.id.videoId}">
                            <img src="${thumb}" alt="" class="thumb">
                            <div class="details">
                                <h4>${title}</h4>
                                <p>${desc}</p>
                            </div>
                        </article>
                    `);
                });

                $('main').on('click', 'article', function () {
                    var id = $(this).attr('data-key');
                    mainVid(id);
                    function mainVid(id) {
                        $('#video').html(`
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                  `);
                    }
                });


            });


    });
})
