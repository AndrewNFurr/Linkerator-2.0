//const {delete} = require("../api");
const client = require("./client");
const sync = require("./sync");

async function createLink({link, comment, clickCount, tags=[]}) {
  try {
    const { rows: [ link_ ] } = await client.query(`
      INSERT INTO links(link, comment, clickCount)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [link, comment, clickCount]);

    const tagList = await createTags(tags);
  
    const _link = await addTagsToLink(link_.id, tagList);
    
    return _link
  } catch (error) {
    throw error;
  }
}

// async function createInitialLink() {
//     try {
//       console.log("starting to create links!");
     
  
//       await createLink({
//         newLink: "c",
//         comment: "Love memes? This is meme heaven.",
//         clickCount: 1,
//         tags: ["thang", "Oh, more words eh?"]
//       })
  
//       console.log("Finished creating links!");
//     } catch(error) {
//       throw error;
//     }
//   }
// createInitialLink();

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map(
    (_, index) => `$${index + 1}`).join('), (');

  const selectValues = tagList.map(
    (_, index) => `$${index + 1}`).join(', ');

  try {
    await client.query(`
      INSERT INTO tags(tag)
      VALUES(${insertValues})
      ON CONFLICT (tag) DO NOTHING;
    `, tagList);

    const { rows } = await client.query(`
      SELECT * FROM tags
      WHERE tag
      IN (${selectValues});
    `, tagList)
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(`
      INSERT INTO link_tags(link_id, tag_id)
      VALUES ($1, $2)
      ON CONFLICT (link_id, tag_id) DO NOTHING;
    `, [linkId, tagId]);
  } catch (error) {
    throw error;
  }
}

async function addTagsToLink(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map(
       tag => createLinkTag(linkId, tag.id)
    );
    
    await Promise.all(createLinkTagPromises);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
 try {
   const { rows: linkIds } = await client.query(`
    SELECT id
    FROM links;
   `)

   const links = await Promise.all(linkIds.map(
    link => getLinkById( link.id )
  ));

   return links;
 } catch (error) {
  throw error;
}
}

async function getLinkById(linkId) {
  console.log("Inside the getLinkByID function")

  try {
    const {rows: [link] } = await client.query(`
      SELECT *
      FROM links
      WHERE id=$1;
    `, [linkId]);

    if(!link) {
      throw {
        message: "Could not find a link with that name"
      }
    }

    const { rows: tags } = await client.query(`
        SELECT tags.*
        FROM tags
        JOIN link_tags ON tags.id=link_tags.tag_id
        WHERE link_tags.link_id=$1;
      `, [linkId])

    link.tags = tags;
    link.dateCreated = new Date();
    
    return link;

  } catch(error) {
    throw error
  }
}

async function getAllTags() {
  try {
      const { rows } = await client.query(`
        SELECT *
        FROM tags;
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function getLinksByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(`
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags.link_id
      JOIN tags ON tags.id=link_tags.tag_id
      WHERE tags.tag=$1
    `, [tagName]);

    return await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));
  } catch (error) {
    throw error;
  }
}

async function updateLink(linkId, fields = {}) {
  console.log("Beginning updateLink")

  const { tags } = fields; //might be undefined
  delete fields.tags;

  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  
  const lastIndex = Object.keys(fields).length + 1;

  console.log("The setString is:", setString);

  try {
    if(setString.length > 0) {
      console.log("Inside the try for updateLink")
      await client.query(`
      UPDATE links
      SET ${ setString }
      WHERE id=$${ lastIndex }
      RETURNING *;
      `, [...Object.values(fields), linkId]);
    }

    console.log("Made it through the setString")

    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    const tagList = await createTags(tags);
    const tagListIdString = tagList.map(
      tag => `${ tag }`
    ).join(', ');

    await client.query(`
      DELETE FROM link_tags
      WHERE tag_id
      NOT IN (${ tagListIdString })
      AND link.id=$1;
      `, [linkId]);

    await addTagsToLink(linkId, tagList);

    console.log("got through update, if crashing - look at getLinkById")
    return await getLinkById(linkId);

  } catch(error) {
    throw error
  }
}

module.exports = {
  sync,
  getAllLinks,
  createLink,
  updateLink,
  getLinkById,
  getAllTags,
  createTags,
  createLinkTag,
  getLinksByTagName
};
