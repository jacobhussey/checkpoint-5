

export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl || ''
        this.createdAt = new Date(data.createdAt).toLocaleTimeString()
        this.creatorName = data.creator.name
        this.creatorPicture = data.creator.picture
        this.coverImg = data.creator.coverImg || ''
        this.creatorId = data.creatorId
        // this.graduated - data.creator.graduated
        // this.github = data.creator.github || ''
        // this.linkedin = data.creator.linkedin || ''
        // this.resume = data.resume || ''
        // this.class = data.creator.class || ''
        this.likeIds = data.likeIds
        this.likeCount = data.likes || 0
        this.bio = data.creator.bio || ''
        this.id = data._id
        this.picture = data.picture
    }
}