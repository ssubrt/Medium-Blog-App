import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@subrt_03/validation-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string;
  }
}>();

blogRouter.use("/*", async(c, next) => {


  //HACK: get the header
  //INFO: verify the headers
  //TODO: if the headers is correct then we proceed
  //FIXME: if not return the user a 403 status code

  const header = c.req.header("authorization") || "";
//   const token = header.split(" ")[1];

try{
  const user = await verify(header, c.env.JWT_SECRET);
 
  if (user) {
    
    c.set("userId",user.id as string)
     await next();
   
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
   
  }

}
catch(error){
  c.status(403);
  return c.json({ error: "You are Not Logged in" });
}
 
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const success = createBlogInput.safeParse(body);

  if(!success){
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try{
    
  const posts = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId:userId,
    },
  });

  c.status(201);
  return c.json({
    id: posts.id,
  });

  }

  catch(error){
    c.status(411);
    return c.json({ error: "Internal Server Error" });
  }

});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const success = updateBlogInput.safeParse(body);

  if(!success){
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  

  const blog = await prisma.post.update({
      where: {
          id: body.id
      }, 
      data: {
          title: body.title,
          content: body.content
      }
  })

  return c.json({
      id: blog.id
  })
});


blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
      const posts = await prisma.post.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
    
      return c.json({
        posts
      });
    }

    catch(e){
      c.status(404);
      return c.json({
        message: "Error while fetching the posts",
      });
    }
  
    
    
  });


  blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const id = c.req.param("id");
  
    try {
      const posts = await prisma.post.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });
  
      if (!posts) {
        c.status(404);
        return c.json({
          message: "Post not found",
        });
      }
  
      return c.json({
        posts,
      });
    } catch (error) {
      console.error(error);
      c.status(500);
      return c.json({
        message: "An error occurred while fetching the post",
      });
    }
  });

