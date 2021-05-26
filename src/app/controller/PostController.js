const postModel = require('../model/Post')
const tagModel = require('../model/Tag')
const categoryModel = require('../model/Category')
const postTagModel = require('../model/Post_Tag')
const postCategoryModel = require('../model/Post_Category')
const postRelateModel = require('../model/Post_Relate')
const client = require('../../database/dbconnect')

class PostController {

    async index(req,res) {
        
    }

    async create(req,res) {
        let tags = await tagModel.findAll();
        let categories = await categoryModel.findAll();
        let posts = await postModel.findAll();

        res.render('post/create', {tags:tags, categories:categories, posts:posts})
    }   

    async createOne(req,res) {
        let title = req.body.title;
        let content = req.body.content
        let sapo = req.body.sapo;
        let tags = req.body.tag;
        let categories = req.body.category;

        try {
            await client.beginTransaction();
            var post_id = await postModel.create(title,sapo,content);
            await postTagModel.createMany(post_id,tags);
            await postCategoryModel.createMany(post_id,categories);
            await client.commit();
        } catch (err) {
            console.log(err)
            await client.rollback();
        }
    }

    async update(req,res) {
        let post_id = req.params.post_id;
        let tags = await tagModel.findAll();
        let categories = await categoryModel.findAll();
        let posts = await postModel.findAll();
        let relate_id = await postRelateModel
        
    }

    async updateOne(req,res) {

    }

    async delete(req,res) {
        let id = req.params.post_id;
        try {
            await client.beginTransaction();
            await postModel.delete(id);
            await postTagModel.delete(id);
            await postCategoryModel.deleteAll(id);
            await client.commit();
        } catch (err) {
            console.log(err)
            await client.rollback();
        }
    }

}

module.exports = new PostController;