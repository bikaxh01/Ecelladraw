import express, { NextFunction, Request, Response } from "express";
import { jwtSecret, validateToken } from "@repo/backend-common/index.ts";
import { signInSchema, signUpSchema } from "@repo/common/types.ts";
import { prismaClient } from "@repo/db/db.ts";
import cors from "cors";


const app = express();

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

 app.use(cors());


app.get("/", (req: Request, res: Response) => {

  res.json("All good");
});

app.post("/sign-up", async (req: Request, res: Response) => {
  const parseData = signUpSchema.safeParse(req.body);

  if (parseData.success == false) {
    res.json("Invalid data");
    return;
  }

  const { email, password } = req.body;

  //TODO: hash password

  const createUser = await prismaClient.user.create({
    data: {
      email,
      password,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

  res.json({
    message: "user created",
    data: { ...createUser },
  });
});
app.post("/sign-in", async (req: Request, res: Response) => {
  const parseData = signInSchema.safeParse(req.body);

  // TODO: complete sign-In send jwt

  if (parseData.success == false) {
    res.json("Invalid data");
    return;
  }
});

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const getToken = req.cookies.authToken;

    if (!getToken) {
      res.json("Unauthorized");
      return;
    }

    const userId = await validateToken(getToken);

    if (typeof userId !== "string") {
      throw new Error("s Invalid user ");
    }

    //@ts-ignore
    req.userId = userId;

    next();
  } catch (error) {
    res.json("unauthorized");
  }
}

app.post(
  "/create-room",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { slug } = req.body;
    //@ts-ignore
    const userId = req.userId;

    try {
      if (!slug || !userId) {
        res.json("Invalid data");
        return;
      }

      const findExistingSlug = await prismaClient.room.findUnique({
        where: {
          slug,
        },
      });

      if (findExistingSlug) {
        res.json("Slug already taken");
        return;
      }

      const createRoom = await prismaClient.room.create({
        data: {
          adminId: userId,
          slug,
        },
      });

      res.json({
        message: "Room created",
        data: { ...createRoom },
      });
    } catch (error) {
      res.json({
        message: "error",
        data: {},
      });
    }
  }
);

app.get("/get-chats", async (req: Request, res: Response) => {
  try {
    const roomId = req.query.roomId;

    if (!roomId) {
      res.json("Invalid room id");
      return;
    }

    const getChats = await prismaClient.chat.findMany({
      where: {
        roomId: roomId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    res.json({
      message: "Fetched",
      data: getChats,
    });
  } catch (error) {
    res.json({
      message: "Error",
      data: [],
    });
  }
});

const PORT = 3004;


app.listen(PORT, () => console.log(`HTTP server running at ${PORT}`));
