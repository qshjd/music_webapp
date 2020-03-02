export default class Song{
    constructor({id,singer,name,imgUrl}){
        this.id = id
        this.singer = singer
        this.name = name
        this.imgUrl = imgUrl
    }
}

function singerName(arr){
    let name = []
    name = arr.map(item => {
        return item.name
    })

    return name.join('/')
}

export function formatPlayListSong(music){
    return new Song({
        id:music.id,
        singer:singerName(music.ar),
        name:music.name,
        imgUrl:music.al.picUrl
    })
}


export function formatSearchSong (music) {
    return new Song({
      id: music.id,
      singer: singerName(music.artists),
      name: music.name,
      imgUrl:music.album.artist.img1v1Url
      
    })
  }
  