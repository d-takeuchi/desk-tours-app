import Resizer from "react-image-file-resizer";

export const useResizeFile = () => {
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const processImage = async (imageFile: File | undefined): Promise<string> => {
    if (imageFile !== undefined) {
      if (/image.*/.exec(imageFile.type)) {
        return (await resizeFile(imageFile)) as string;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return { processImage };
};
