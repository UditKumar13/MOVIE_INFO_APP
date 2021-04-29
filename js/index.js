$(document).ready(()=>{
$('#search-form').on('submit',(e)=>{
    let MovieText = $('#search-text').val();
    //user movie that she entered console.log(MovieText);
    getMovies(MovieText);
e.preventDefault();
});
});

function getMovies(MovieText){
    
    // My first api call -_- feeling happy :) 
    axios.get('http://www.omdbapi.com/?s='+MovieText+'&apikey=bcb7b791')
    .then((response)=>{
        console.log(response);
        let movies = response.data.Search;
        let output ="";
        //for each loop on every movie 
        $.each(movies,(index,movie)=>{
            //append data to output to show  
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    </img>
                    
                    <h5>
                    <br>
                    ${movie.Title}
                    </h5>
                
                    <a onclick=" movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            
            `; 

        });

        $('#showMovies').html(output);
       
    })

    .catch((err)=>{
        console.log(err);
    });
}

function movieSelected(id){

    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    // to run it in movie.html 
    return false;
    
}

function getMovie(){
    let movieId =sessionStorage.getItem('movieId');
    // now we have to make a similar axios request to get this specific movie detail 
    // to show on the movie.html page 
    axios.get('https://www.omdbapi.com/?i='+movieId+'&apikey=bcb7b791')
    .then((response)=>{
        console.log(response);
        let movie = response.data;
        let output=`
        <div class="container">
            <div class="row">

                <div class="col-md-4">
                <img src="${movie.Poster}" class="Thumbnail">

                </div>

                <div class="col-md-8">
                <h2>Movie Title: ${movie.Title}</h2>
                
                
                <ul class="list-group" id="list-font">
                <li class="list-group-item "><strong>Genre :</strong> ${movie.Genre}</li>
                <li class="list-group-item "><strong>Actors :</strong> ${movie.Actors}</li>
                <li class="list-group-item "><strong>Imdb Rating :</strong> ${movie.imdbRating}</li>
                <li class="list-group-item "><strong>Released :</strong> ${movie.Released}</li>
                <li class="list-group-item "><strong>Rated :</strong> ${movie.Rated}</li>
                <li class="list-group-item "> <strong>Director :</strong> ${movie.Director}</li>
                <li class="list-group-item "> <strong>Writer :</strong> ${movie.Writer}</li>
                

                </ul>
                
                </div>
            </div>
            <br>
            <div class="row">
                <h2>Plot</h2>
            </div>
            <div class="row">
                 ${movie.Plot}
                 <hr>
            </div>
            <br>
            <div class="row">
            <a class="btn btn-primary " id="list-font" target="_blank" href="http://imdb.com/title/${movie.imdbID}" >View IMDB</a>
            
            <a class="btn btn-uk tab" id="list-font" href="index.html" >Back To Search</a>
            </div>

            
        `;
        $('#specific_movie').html(output);
    })
    

    .catch((err)=>{
        console.log(err);
    });
}