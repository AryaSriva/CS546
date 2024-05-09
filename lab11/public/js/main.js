/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page. You can use a client-side fetch or axios request instead of AJAX)
*/
(function ($) {
  const validateInput = (input) => {
    if (!input || typeof input != "string" || input.trim() == "") {
      return false;
    } else {
      return true;
    }
  };
  let form = $("#searchMovieForm");
  let movieDetails = $("#movieDetails");
  let searchResults = $("#searchResults");
  let searchTerm = $("#movie_search_term");
  let root = $("#rootLink");
  let errorMsg = $("#errorMsg");
  movieDetails.hide();
  searchResults.hide();
  root.hide();
  function bindClickEvent(link) {
    link.on("click", function (event) {
      event.preventDefault();
      let currentLink = $(this);
      let id = currentLink[0].attributes[1].value;
      let requestConfig = {
        method: "GET",
        url: "https://www.omdbapi.com/?apikey=CS546&i=" + id,
      };
      $.ajax(requestConfig).then(function (response) {
        let responseData = $(response)[0];
        let article = $("<article/>");
        let h1 = $("<h1/>");
        h1.attr("id", "movieTitle");
        h1.text(responseData.Title);
        article.append(h1);
        let img = $("<img/>");
        img.attr("src", responseData.Poster);
        img.attr(
          "onError",
          "this.onerror=null;this.src='/public/no_image.jpeg'"
        );
        img.attr("alt", "N/A");
        article.append(img);
        let h2 = $("<h2/>");
        h2.text("Plot");
        article.append(h2);
        let p = $("<p/>");
        p.text(responseData.Plot);
        article.append(p);
        let section1 = $("<section/>");
        let h3 = $("<h3/>").text("Info");
        section1.append(h3);
        let dl1 = $("<dl/>")
          .append($("<dt/>").text("Year Released: "))
          .append($("<dd/>").text(responseData.Released));
        dl1
          .append($("<dt/>").text("Rated: "))
          .append($("<dd/>").text(responseData.Rated));
        dl1
          .append($("<dt/>").text("Runtime: "))
          .append($("<dd/>").text(responseData.RunTime));
        dl1
          .append($("<dt/>").text("Genre(s): "))
          .append($("<dd/>").text(responseData.Genre));
        dl1
          .append($("<dt/>").text("Box Office Earnings: "))
          .append($("<dd/>").text(responseData.BoxOffice));
        dl1
          .append($("<dt/>").text("DVD Release Data: "))
          .append($("<dd/>").text(responseData.DVD));
        section1.append(dl1);
        article.append(section1);
        let section2 = $("<section/>");
        let h4_sec2 = $("<h4/>").text("Cast and Crew");
        section2.append(h4_sec2);
        section2.append(
          $("<p/>")
            .text(responseData.Director)
            .prepend($("<strong/>").text("Director: "))
        );
        section2.append(
          $("<p/>")
            .text(responseData.Writer)
            .prepend($("<strong/>").text("Writer: "))
        );
        section2.append(
          $("<p/>")
            .text(responseData.Actors)
            .prepend($("<strong/>").text("Cast: "))
        );
        article.append(section2);
        let section3 = $("<section/>");
        let h4_sec3 = $("<h4/>").text("Ratings");
        section3.append(h4_sec3);
        let table = $("<table/>").attr("class", "my_coolratings_table");
        table.append(
          $("<tr/>")
            .append($("<th/>").text("Source"))
            .append($("<th/>").text("Rating"))
        );
        responseData.Ratings.forEach((element) => {
          table.append(
            $("<tr/>")
              .append($("<td/>").text(element.Source))
              .append($("<td/>").text(element.Value))
          );
        });
        section3.append(table);
        article.append(section3);
        movieDetails.append(article);
      });
      searchResults.hide();
      movieDetails.show();
      root.show();
    });
  }
  form.submit(function (event) {
    event.preventDefault();
    let movieName = searchTerm.val();
    form.hide();
    if (!validateInput(movieName)) {
      searchTerm.val("");
      errorMsg.text("Please enter a valid input");
      errorMsg.show();
      root.show();
    } else {
      errorMsg.hide();
      searchResults.empty();
      movieDetails.empty();
      let requestConfig = {
        method: "GET",
        url: " http://www.omdbapi.com/?apikey=CS546&s=" + movieName,
      };
      $.ajax(requestConfig).then(function (response) {
        let movies = $(response)[0].Search;
        movies.forEach((movie) => {
          let li = $("<li/>");
          let link = $("<a/>");
          link.text(movie.Title);
          link.attr("href", "javascript:void(0)");
          link.attr("data-id", movie.imdbID);
          bindClickEvent(link);
          li.append(link);
          searchResults.append(li);
        });
      });
      let page2Config = {
        method: "GET",
        url: " http://www.omdbapi.com/?apikey=CS546&s=" + movieName + "&page=2",
      };
      $.ajax(page2Config).then(function (response) {
        let movies = $(response)[0].Search;
        movies.forEach((movie) => {
          let li = $("<li/>");
          let link = $("<a/>");
          link.text(movie.Title);
          link.attr("href", "javascript:void(0)");
          link.attr("data-id", movie.imdbID);
          bindClickEvent(link);
          li.append(link);
          searchResults.append(li);
        });
      });
      searchResults.show();
      root.show();
    }
  });
})(window.jQuery);
