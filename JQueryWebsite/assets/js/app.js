 // main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {

    var listItemString = $('#listItem').html();
    $('.loader_profile').hide();
    $('.loader_feed').hide();
    $('.profile_details').hide();
    $('.post_list').hide();

    var myFacebookToken = 'EAACEdEose0cBABaTntm9j91Ev7UldZCTvZCSWNbmaXQsxIl921yjDtSH1kjGMA8fZBK1A138CGZAy0URGiXdsRwy1G0POffwb6dalGx7c7ZBjrQOJZAh6k8R7BX7QAh0ZCsMk56Pi2719TUqEqGsOOzyB9ylzNnSQCFUQGcPknXauzTQlz3QXiR8oFRKLjkxcJdB5FjyGSrRAZDZD';

    function getFacebookProfileInfo(){ // Start get facebook profile info

        $.ajax('https://graph.facebook.com/me?access_token='+myFacebookToken+'&fields=about,email,birthday,hometown,name',{

                success : function(response){
                    console.log(response);
                    $("#myImage").attr("src","https://graph.facebook.com/"+response.id+"/picture?type=normal");
                    $("#myName").text(response.name);
                    $("#myEmail").text(response.email);
                    $("#myDob").text(response.birthday);
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
                    $("#myHometown").text(response.hometown.name);
                },

                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    alert('Error validating access token: Session has expired on Monday, 22-Jan-18 08:00:00 PST. The current time is Monday, 22-Jan-18 08:03:00 PST.');
                },

                // timeout:1000, // in ms

                beforeSend : function(){
                    $('.loader_profile').show(); 
                    $('.profile_details').hide();
                },

                complete : function(){
                   $('.loader_profile').hide();
                   $('.profile_details').show();
                }

            }//end argument list 

        );// end ajax call 

    };  // end get facebook profile info

    function getFacebookFeedList(){ // Start get facebook feed list

        $.ajax('https://graph.facebook.com/me?access_token='+myFacebookToken+'&fields=posts.limit(100)',{

                success : function(response){
                    console.log(response);
                    var dataJSON = response.posts.data;
                    dataJSON.forEach(buildNewList);
                },

                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    alert('Error validating access token: Session has expired on Monday, 22-Jan-18 08:00:00 PST. The current time is Monday, 22-Jan-18 08:03:00 PST.');
                },

                // timeout:1000, // in ms

                beforeSend : function(){
                    $('.loader_feed').show(); 
                    $('.post_list').hide();
                },

                complete : function(){
                   $('.loader_feed').hide();
                   $('.post_list').show();
                }

            }//end argument list 

        );// end ajax call 

    };  // end get facebook feed list

    function buildNewList(item, index) {
      var listItem = $('<li>' + listItemString + '</li>');
      var listItemTitle = $('.story', listItem);
      if(typeof item.story == 'undefined') {
        listItemTitle.html(item.message);
      } else {
        listItemTitle.html(item.story);
      }
      var listItemDesc = $('.created_time', listItem);
      listItemDesc.html(item.created_time);
      $('#dataList').append(listItem);
    }

    getFacebookProfileInfo();

    $("#nav_profile").on('click',getFacebookProfileInfo);
    $("#nav_feed").on('click',getFacebookFeedList);

  });