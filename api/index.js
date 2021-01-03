const {
    client, 
    getAllLinks, 
    createLink, 
    updateLink, 
    getLinkById, 
    createTags, 
    createLinkTag, 
    getAllTags, 
    getLinksByTagName
} = require('../data_layer');

const apiRouter = require("express").Router();

apiRouter.get("/", async (req, res, next) => {
  res.send("Welcome to The Great Linkerator!")
})

apiRouter.get("/links", async (req, res, next) => {
    try {
      console.log("Requesting all links")
      const allLinks = await getAllLinks();
  
      res.send(allLinks)
      next();
  
      console.log("Finished requesting all links");
    } catch(error) {
      console.log("Error requesting links");
      next(error);
    }
  });

apiRouter.get('/tags', async (req, res, next) => {
  try {
    const tags = await getAllTags();
  
    res.send({
      "tags": tags
    });
    next();
  } catch(error) {
    console.log("Error requesting tags");
    next(error);
  }
});

  apiRouter.get('/tags/:tagName/links', async (req, res, next) => {
    const { tagName } = req.params
    try {
      console.log("Requesting link by tag name");
      const links = getLinksByTagName(tagName);

      res.send({ links });
    } catch(error) {
      console.log("Error requesting link by tag name");
      next(error);
    }
  })

  apiRouter.post("/links", async (req, res, next) => {
    console.log("The req is", req.body)
    const { link, comment, clickcount, tags=getAllTags } = req.body
    try {
      console.log(link, comment, clickcount, tags);
      const newLink = await createLink(req.body);
      res.send(newLink);
    } catch(error) {
      next(error);
    }
  })
  

  apiRouter.patch("/links/:id", async (req, res, next) => {
    const { linkId, link, comment, clickCount, tags} = req.body;
    console.log("The req.body is", req.body)

    const updateFields = {};

    if(link) {
        updateFields.link = link;
    }

    if(comment) {
        updateFields.comment = comment;
    }

    if(clickCount) {
        updateFields.clickcount = clickCount;
    }

    if(tags) {
      updateFields.tags = tags;
  }

    try {
      const originalLink = await getLinkById(linkId);
      console.log("the original link is", originalLink);
      
      console.log("The update fields are", updateFields);
      
      if(originalLink.id === linkId) {
          const updatedLink = await updateLink(linkId, updateFields);
          res.send({link: updatedLink })
      } else {
          next({
            message: "Error updating link"
          })
        }
    } catch(error) {
        throw error;
    }
  })

  module.exports = apiRouter;
