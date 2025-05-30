import { createUploadthing } from "uploadthing";

const f = createUploadthing();

export const ourFileRouter = {
  mesaj: f(["image", "video"])
    .middleware(() => ({}))
    .onUploadComplete(async ({ file }) => {
      console.log("Fișier încărcat cu succes:", file.url);
    }),
};
