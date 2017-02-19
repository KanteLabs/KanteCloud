export const client_id = "0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2";
export const client_secret = "pTE5IADHjTRMwCnKsv7NQFdsPqDd7qJc";
export const search = "https://api.soundcloud.com/tracks?&client_id="+ client_id +"&limit=100&offset=0&q=";
export const newTracks = "https://api.soundcloud.com/tracks?format=json&client_id=" + client_id;
export const genreTag = "https://api.soundcloud.com/tracks?&client_id=" + client_id + "&limit=50&offset=0&tags=";

export const genreName = [
	"Pop",
	"Hip-Hop",
	"Reggae",
	"R&B",
	"EDM",
	"Dubstep",
]

export const IMAGE_SIZES = {
  LARGE: 't300x300',
  XLARGE: 't500x500',
}

export function getImageUrl(s, size = null) {
  let str = s;
  if (!str) {
    return '';
  }

  str = str.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return str.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return str.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return str;
  }
}

export const handleGenreClick = function(event){
  let name = (event.target.name);

  fetch(genreTag + name, { method:"GET" })
  .then(response => response.json())
  .catch(error => console.log(error))
  .then(trackInfo => {   
      this.setState({ trackInfo: trackInfo })   
  })
  .catch(error => console.log(error))
}

export const handleLatestTracksClick = function(){
  event.preventDefault();

  fetch(newTracks, { method:"GET" })
  .then(response => response.json())
  .catch(error => console.log(error))
  .then(trackInfo => {   
      //json.map(entity => tracks.push(entity.title))
      this.setState({ trackInfo: trackInfo })
  })
.catch(error => console.log(error))
};